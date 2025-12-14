export interface Clip {
  id: string
  name: string
  duration: number
  startTime: number
  endTime: number
  source: string
  type: 'video' | 'audio' | 'image'
  metadata?: {
    width?: number
    height?: number
    fps?: number
    codec?: string
    bitrate?: number
  }
  effects?: Effect[]
}

export interface Effect {
  id: string
  type: 'filter' | 'transition' | 'overlay' | 'color-correction'
  name: string
  parameters: Record<string, any>
  enabled: boolean
}

export interface Overlay {
  id: string
  type: 'text' | 'image' | 'shape'
  position: { x: number; y: number }
  size: { width: number; height: number }
  opacity: number
  startTime: number
  endTime: number
  content: {
    text?: string
    image?: string
    color?: string
    fontSize?: number
    fontFamily?: string
  }
}

export interface AudioSegment {
  id: string
  clipId?: string
  name: string
  source: string
  startTime: number
  duration: number
  volume: number
  fadeIn?: number
  fadeOut?: number
  muted: boolean
}

export interface TimelineTrack {
  id: string
  type: 'video' | 'audio'
  name: string
  clipIds: string[]
  muted: boolean
  hidden: boolean
  locked: boolean
  height?: number
}

export interface MediaAsset {
  id: string
  name: string
  type: 'video' | 'audio' | 'image'
  source: string
  thumbnail?: string
  duration?: number
  size: number
  metadata: {
    width?: number
    height?: number
    fps?: number
    codec?: string
    bitrate?: number
    sampleRate?: number
    channels?: number
  }
  uploadedAt: Date
}

export interface EditorSettings {
  resolution: {
    width: number
    height: number
  }
  fps: number
  sampleRate: number
  quality: 'low' | 'medium' | 'high' | 'ultra'
  theme: 'light' | 'dark' | 'auto'
  autoSave: boolean
  autoSaveInterval: number
}

export interface Project {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  timeline: {
    tracks: TimelineTrack[]
    duration: number
    currentTime: number
  }
  assets: MediaAsset[]
  settings: EditorSettings
}
