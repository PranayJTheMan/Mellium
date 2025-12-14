import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  const ms = Math.floor((seconds % 1) * 100)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`
}

export function parseTime(timeString: string): number {
  const [minutes, secondsWithMs] = timeString.split(':')
  const [seconds, ms] = secondsWithMs.split('.')
  return parseInt(minutes) * 60 + parseInt(seconds) + (parseInt(ms) / 100)
}

export function generateId(): string {
  return crypto.randomUUID()
}

export function formatFileSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  if (bytes === 0) return '0 Bytes'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null
  let lastExecTime = 0
  return (...args: Parameters<T>) => {
    const currentTime = Date.now()
    if (currentTime - lastExecTime > delay) {
      func(...args)
      lastExecTime = currentTime
    } else {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func(...args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function isVideoFile(file: File): boolean {
  return file.type.startsWith('video/')
}

export function isAudioFile(file: File): boolean {
  return file.type.startsWith('audio/')
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/')
}

export function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

export function validateVideoFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 500 * 1024 * 1024 // 500MB
  const supportedFormats = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv']
  const extension = getFileExtension(file.name).toLowerCase()
  
  if (!supportedFormats.includes(extension)) {
    return { valid: false, error: `Unsupported format: ${extension}. Supported formats: ${supportedFormats.join(', ')}` }
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: `File too large: ${formatFileSize(file.size)}. Maximum size: ${formatFileSize(maxSize)}` }
  }
  
  return { valid: true }
}

export function validateAudioFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 100 * 1024 * 1024 // 100MB
  const supportedFormats = ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a']
  const extension = getFileExtension(file.name).toLowerCase()
  
  if (!supportedFormats.includes(extension)) {
    return { valid: false, error: `Unsupported format: ${extension}. Supported formats: ${supportedFormats.join(', ')}` }
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: `File too large: ${formatFileSize(file.size)}. Maximum size: ${formatFileSize(maxSize)}` }
  }
  
  return { valid: true }
}
