import { describe, it, expect, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useFfmpeg } from './useFfmpeg'

// Mock FFmpeg
vi.mock('@ffmpeg/ffmpeg', () => {
  return {
    FFmpeg: vi.fn().mockImplementation(() => ({
      on: vi.fn(),
      load: vi.fn().mockResolvedValue(undefined),
      exec: vi.fn().mockResolvedValue(undefined),
      writeFile: vi.fn().mockResolvedValue(undefined),
      readFile: vi.fn().mockResolvedValue(new Uint8Array()),
      deleteFile: vi.fn().mockResolvedValue(undefined),
    })),
  }
})

vi.mock('@ffmpeg/util', () => ({
  fetchFile: vi.fn().mockResolvedValue(new Uint8Array()),
  toBlobURL: vi.fn().mockResolvedValue('blob:mock-url'),
}))

describe('useFfmpeg', () => {
  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useFfmpeg())
    
    expect(result.current.isLoaded).toBe(false)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.progress.ratio).toBe(0)
    expect(result.current.error).toBeNull()
  })

  it('should load FFmpeg successfully', async () => {
    const { result } = renderHook(() => useFfmpeg())
    
    await act(async () => {
      await result.current.load()
    })
    
    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true)
      expect(result.current.isLoading).toBe(false)
    })
  })

  it('should handle loading errors gracefully', async () => {
    const { result } = renderHook(() => useFfmpeg())
    
    // Mock a loading error
    const { FFmpeg } = await import('@ffmpeg/ffmpeg')
    vi.mocked(FFmpeg).mockImplementationOnce(() => {
      throw new Error('Mock FFmpeg error')
    })
    
    await act(async () => {
      try {
        await result.current.load()
      } catch (error) {
        expect(error).toBeDefined()
      }
    })
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeDefined()
    })
  })
})
