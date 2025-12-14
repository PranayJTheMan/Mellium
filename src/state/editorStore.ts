import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { 
  MediaAsset, 
  TimelineTrack, 
  EditorSettings, 
  Project, 
  Clip, 
  AudioSegment 
} from '@/types/models'

interface MediaAssetsSlice {
  assets: MediaAsset[]
  addAsset: (asset: MediaAsset) => void
  removeAsset: (assetId: string) => void
  updateAsset: (assetId: string, updates: Partial<MediaAsset>) => void
  getAssetById: (assetId: string) => MediaAsset | undefined
}

interface TimelineSlice {
  tracks: TimelineTrack[]
  clips: Record<string, Clip>
  audioSegments: Record<string, AudioSegment>
  currentTime: number
  duration: number
  addTrack: (track: TimelineTrack) => void
  removeTrack: (trackId: string) => void
  updateTrack: (trackId: string, updates: Partial<TimelineTrack>) => void
  addClip: (clip: Clip) => void
  removeClip: (clipId: string) => void
  updateClip: (clipId: string, updates: Partial<Clip>) => void
  addAudioSegment: (segment: AudioSegment) => void
  removeAudioSegment: (segmentId: string) => void
  updateAudioSegment: (segmentId: string, updates: Partial<AudioSegment>) => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  getTimelineClips: () => Clip[]
  getTimelineAudioSegments: () => AudioSegment[]
}

interface EditorSettingsSlice {
  settings: EditorSettings
  updateSettings: (updates: Partial<EditorSettings>) => void
  resetSettings: () => void
}

interface ProjectSlice {
  currentProject: Project | null
  setCurrentProject: (project: Project) => void
  createNewProject: (name: string) => Project
  saveProject: () => void
}

export const useEditorStore = create<MediaAssetsSlice & TimelineSlice & EditorSettingsSlice & ProjectSlice>()(
  devtools(
    persist(
      (set, get) => ({
        ...createMediaAssetsSlice(set),
        ...createTimelineSlice(set),
        ...createEditorSettingsSlice(set),
        ...createProjectSlice(set),
      }),
      {
        name: 'editor-store',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          assets: state.assets,
          tracks: state.tracks,
          clips: state.clips,
          audioSegments: state.audioSegments,
          settings: state.settings,
          currentProject: state.currentProject,
        }),
      }
    )
  )
)

function createMediaAssetsSlice(set: any): MediaAssetsSlice {
  return {
    assets: [],
    addAsset: (asset) =>
      set((state: MediaAssetsSlice) => ({
        assets: [...state.assets, asset],
      })),
    removeAsset: (assetId) =>
      set((state: MediaAssetsSlice) => ({
        assets: state.assets.filter((asset) => asset.id !== assetId),
      })),
    updateAsset: (assetId, updates) =>
      set((state: MediaAssetsSlice) => ({
        assets: state.assets.map((asset) =>
          asset.id === assetId ? { ...asset, ...updates } : asset
        ),
      })),
    getAssetById: (assetId) => {
      const state = get()
      return state.assets.find((asset) => asset.id === assetId)
    },
  }
}

function createTimelineSlice(set: any): TimelineSlice {
  return {
    tracks: [],
    clips: {},
    audioSegments: {},
    currentTime: 0,
    duration: 0,
    addTrack: (track) =>
      set((state: TimelineSlice) => ({
        tracks: [...state.tracks, track],
      })),
    removeTrack: (trackId) =>
      set((state: TimelineSlice) => ({
        tracks: state.tracks.filter((track) => track.id !== trackId),
      })),
    updateTrack: (trackId, updates) =>
      set((state: TimelineSlice) => ({
        tracks: state.tracks.map((track) =>
          track.id === trackId ? { ...track, ...updates } : track
        ),
      })),
    addClip: (clip) =>
      set((state: TimelineSlice) => ({
        clips: { ...state.clips, [clip.id]: clip },
      })),
    removeClip: (clipId) =>
      set((state: TimelineSlice) => {
        const newClips = { ...state.clips }
        delete newClips[clipId]
        return { clips: newClips }
      }),
    updateClip: (clipId, updates) =>
      set((state: TimelineSlice) => ({
        clips: { ...state.clips, [clipId]: { ...state.clips[clipId], ...updates } },
      })),
    addAudioSegment: (segment) =>
      set((state: TimelineSlice) => ({
        audioSegments: { ...state.audioSegments, [segment.id]: segment },
      })),
    removeAudioSegment: (segmentId) =>
      set((state: TimelineSlice) => {
        const newSegments = { ...state.audioSegments }
        delete newSegments[segmentId]
        return { audioSegments: newSegments }
      }),
    updateAudioSegment: (segmentId, updates) =>
      set((state: TimelineSlice) => ({
        audioSegments: { ...state.audioSegments, [segmentId]: { ...state.audioSegments[segmentId], ...updates } },
      })),
    setCurrentTime: (time) => set({ currentTime: Math.max(0, time) }),
    setDuration: (duration) => set({ duration: Math.max(0, duration) }),
    getTimelineClips: () => {
      const state = get()
      return Object.values(state.clips)
    },
    getTimelineAudioSegments: () => {
      const state = get()
      return Object.values(state.audioSegments)
    },
  }
}

function createEditorSettingsSlice(set: any): EditorSettingsSlice {
  const defaultSettings: EditorSettings = {
    resolution: { width: 1920, height: 1080 },
    fps: 30,
    sampleRate: 48000,
    quality: 'high',
    theme: 'auto',
    autoSave: true,
    autoSaveInterval: 30000,
  }

  return {
    settings: defaultSettings,
    updateSettings: (updates) =>
      set((state: EditorSettingsSlice) => ({
        settings: { ...state.settings, ...updates },
      })),
    resetSettings: () => set({ settings: defaultSettings }),
  }
}

function createProjectSlice(set: any): ProjectSlice {
  return {
    currentProject: null,
    setCurrentProject: (project) => set({ currentProject: project }),
    createNewProject: (name) => {
      const newProject: Project = {
        id: crypto.randomUUID(),
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
        timeline: {
          tracks: [],
          duration: 0,
          currentTime: 0,
        },
        assets: [],
        settings: {
          resolution: { width: 1920, height: 1080 },
          fps: 30,
          sampleRate: 48000,
          quality: 'high',
          theme: 'auto',
          autoSave: true,
          autoSaveInterval: 30000,
        },
      }
      set({ currentProject: newProject })
      return newProject
    },
    saveProject: () => {
      const state = get()
      if (state.currentProject) {
        set({
          currentProject: {
            ...state.currentProject,
            updatedAt: new Date(),
          },
        })
      }
    },
  }
}
