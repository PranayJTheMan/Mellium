import { useState, useEffect, useRef, useCallback } from 'react'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'

export interface FfmpegProgress {
  ratio: number
  time: number
  speed: number
  message?: string
}

export interface FfmpegState {
  isLoaded: boolean
  isLoading: boolean
  progress: FfmpegProgress
  error: string | null
  output: string | null
}

export interface UseFfmpegReturn extends FfmpegState {
  load: () => Promise<void>
  execute: (args: string[]) => Promise<void>
  resetProgress: () => void
  extractThumbnail: (inputFile: File, time?: number) => Promise<string>
  trimVideo: (inputFile: File, startTime: number, duration: number) => Promise<Uint8Array>
  convertToMp4: (inputFile: File) => Promise<Uint8Array>
  mergeVideos: (videoFiles: File[]) => Promise<Uint8Array>
  addAudioToVideo: (videoFile: File, audioFile: File) => Promise<Uint8Array>
  getVideoInfo: (inputFile: File) => Promise<any>
}

let ffmpegInstance: FFmpeg | null = null

export const useFfmpeg = (): UseFfmpegReturn => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState<FfmpegProgress>({
    ratio: 0,
    time: 0,
    speed: 0,
  })
  const [error, setError] = useState<string | null>(null)
  const [output, setOutput] = useState<string | null>(null)
  const progressRef = useRef<FFmpeg | null>(null)

  // Initialize FFmpeg singleton
  const initFfmpeg = useCallback(async (): Promise<FFmpeg> => {
    if (ffmpegInstance) {
      return ffmpegInstance
    }

    const ffmpeg = new FFmpeg()
    
    // Set up progress tracking
    ffmpeg.on('progress', ({ progress, time }) => {
      setProgress({
        ratio: progress,
        time,
        speed: 0, // Speed calculation would need additional implementation
        message: `Processing: ${Math.round(progress * 100)}%`,
      })
    })

    ffmpeg.on('log', ({ message }) => {
      console.log('FFmpeg:', message)
    })

    ffmpegInstance = ffmpeg
    progressRef.current = ffmpeg
    
    return ffmpeg
  }, [])

  // Load FFmpeg with WASM files
  const load = useCallback(async () => {
    if (isLoaded || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      const ffmpeg = await initFfmpeg()

      // Load WASM files from CDN with proper CORS headers
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
      
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript'),
      })

      setIsLoaded(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load FFmpeg'
      setError(errorMessage)
      console.error('FFmpeg loading error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [isLoaded, isLoading, initFfmpeg])

  // Execute FFmpeg command
  const execute = useCallback(async (args: string[]) => {
    if (!isLoaded) {
      throw new Error('FFmpeg is not loaded. Call load() first.')
    }

    setError(null)
    setOutput(null)

    try {
      const ffmpeg = await initFfmpeg()
      
      // Reset progress
      setProgress({ ratio: 0, time: 0, speed: 0 })

      // Execute the command
      await ffmpeg.exec(args)

      // Set completion progress
      setProgress(prev => ({ ...prev, ratio: 1, message: 'Completed' }))
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'FFmpeg execution failed'
      setError(errorMessage)
      console.error('FFmpeg execution error:', err)
      throw err
    }
  }, [isLoaded, initFfmpeg])

  // Extract thumbnail from video
  const extractThumbnail = useCallback(async (inputFile: File, time = 1): Promise<string> => {
    if (!isLoaded) throw new Error('FFmpeg not loaded')

    try {
      const ffmpeg = await initFfmpeg()
      const inputName = `input_${Date.now()}.${inputFile.name.split('.').pop()}`
      const outputName = `thumbnail_${Date.now()}.jpg`

      // Write input file to FFmpeg FS
      await ffmpeg.writeFile(inputName, await fetchFile(inputFile))

      // Extract thumbnail
      await execute([
        '-i', inputName,
        '-ss', time.toString(),
        '-vframes', '1',
        '-f', 'image2',
        outputName
      ])

      // Read output
      const data = await ffmpeg.readFile(outputName)
      const blob = new Blob([data], { type: 'image/jpeg' })
      
      // Clean up
      await ffmpeg.deleteFile(inputName)
      await ffmpeg.deleteFile(outputName)

      return URL.createObjectURL(blob)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Thumbnail extraction failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }, [isLoaded, initFfmpeg, execute])

  // Trim video
  const trimVideo = useCallback(async (inputFile: File, startTime: number, duration: number): Promise<Uint8Array> => {
    if (!isLoaded) throw new Error('FFmpeg not loaded')

    try {
      const ffmpeg = await initFfmpeg()
      const inputName = `input_${Date.now()}.${inputFile.name.split('.').pop()}`
      const outputName = `output_${Date.now()}.mp4`

      await ffmpeg.writeFile(inputName, await fetchFile(inputFile))

      await execute([
        '-i', inputName,
        '-ss', startTime.toString(),
        '-t', duration.toString(),
        '-c', 'copy',
        outputName
      ])

      const data = await ffmpeg.readFile(outputName)
      
      // Clean up
      await ffmpeg.deleteFile(inputName)
      await ffmpeg.deleteFile(outputName)

      return data as Uint8Array
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Video trimming failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }, [isLoaded, initFfmpeg, execute])

  // Convert to MP4
  const convertToMp4 = useCallback(async (inputFile: File): Promise<Uint8Array> => {
    if (!isLoaded) throw new Error('FFmpeg not loaded')

    try {
      const ffmpeg = await initFfmpeg()
      const inputName = `input_${Date.now()}.${inputFile.name.split('.').pop()}`
      const outputName = `output_${Date.now()}.mp4`

      await ffmpeg.writeFile(inputName, await fetchFile(inputFile))

      await execute([
        '-i', inputName,
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-preset', 'medium',
        '-crf', '23',
        outputName
      ])

      const data = await ffmpeg.readFile(outputName)
      
      await ffmpeg.deleteFile(inputName)
      await ffmpeg.deleteFile(outputName)

      return data as Uint8Array
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Video conversion failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }, [isLoaded, initFfmpeg, execute])

  // Merge videos
  const mergeVideos = useCallback(async (videoFiles: File[]): Promise<Uint8Array> => {
    if (!isLoaded) throw new Error('FFmpeg not loaded')
    if (videoFiles.length === 0) throw new Error('No video files provided')

    try {
      const ffmpeg = await initFfmpeg()
      const inputFiles: string[] = []
      const concatList: string[] = []

      // Write all input files and create concat list
      for (let i = 0; i < videoFiles.length; i++) {
        const file = videoFiles[i]
        const inputName = `input_${i}_${Date.now()}.${file.name.split('.').pop()}`
        await ffmpeg.writeFile(inputName, await fetchFile(file))
        inputFiles.push(inputName)
        concatList.push(`file '${inputName}'`)
      }

      // Create concat file
      const concatFileName = `concat_${Date.now()}.txt`
      await ffmpeg.writeFile(concatFileName, concatList.join('\n'))

      const outputName = `merged_${Date.now()}.mp4`

      await execute([
        '-f', 'concat',
        '-safe', '0',
        '-i', concatFileName,
        '-c', 'copy',
        outputName
      ])

      const data = await ffmpeg.readFile(outputName)
      
      // Clean up all files
      for (const inputFile of inputFiles) {
        await ffmpeg.deleteFile(inputFile)
      }
      await ffmpeg.deleteFile(concatFileName)
      await ffmpeg.deleteFile(outputName)

      return data as Uint8Array
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Video merging failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }, [isLoaded, initFfmpeg, execute])

  // Add audio to video
  const addAudioToVideo = useCallback(async (videoFile: File, audioFile: File): Promise<Uint8Array> => {
    if (!isLoaded) throw new Error('FFmpeg not loaded')

    try {
      const ffmpeg = await initFfmpeg()
      const videoName = `video_${Date.now()}.${videoFile.name.split('.').pop()}`
      const audioName = `audio_${Date.now()}.${audioFile.name.split('.').pop()}`
      const outputName = `output_${Date.now()}.mp4`

      await ffmpeg.writeFile(videoName, await fetchFile(videoFile))
      await ffmpeg.writeFile(audioName, await fetchFile(audioFile))

      await execute([
        '-i', videoName,
        '-i', audioName,
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-shortest',
        outputName
      ])

      const data = await ffmpeg.readFile(outputName)
      
      await ffmpeg.deleteFile(videoName)
      await ffmpeg.deleteFile(audioName)
      await ffmpeg.deleteFile(outputName)

      return data as Uint8Array
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Audio addition failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }, [isLoaded, initFfmpeg, execute])

  // Get video information
  const getVideoInfo = useCallback(async (inputFile: File): Promise<any> => {
    if (!isLoaded) throw new Error('FFmpeg not loaded')

    try {
      const ffmpeg = await initFfmpeg()
      const inputName = `input_${Date.now()}.${inputFile.name.split('.').pop()}`

      await ffmpeg.writeFile(inputName, await fetchFile(inputFile))

      await execute([
        '-i', inputName,
        '-f', 'null',
        '-'
      ])

      // Note: This is a simplified approach
      // In a real implementation, you'd parse the FFmpeg output for metadata
      
      await ffmpeg.deleteFile(inputName)

      return {
        filename: inputFile.name,
        size: inputFile.size,
        type: inputFile.type,
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Video info extraction failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }, [isLoaded, initFfmpeg, execute])

  // Reset progress
  const resetProgress = useCallback(() => {
    setProgress({ ratio: 0, time: 0, speed: 0 })
    setError(null)
    setOutput(null)
  }, [])

  // Auto-load on mount if not already loaded
  useEffect(() => {
    if (!isLoaded && !isLoading) {
      load()
    }
  }, [load, isLoaded, isLoading])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Don't dispose the singleton as it might be used elsewhere
      // ffmpegInstance?.terminate()
    }
  }, [])

  return {
    isLoaded,
    isLoading,
    progress,
    error,
    output,
    load,
    execute,
    resetProgress,
    extractThumbnail,
    trimVideo,
    convertToMp4,
    mergeVideos,
    addAudioToVideo,
    getVideoInfo,
  }
}
