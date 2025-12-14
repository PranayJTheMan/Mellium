import React, { useEffect, useState } from 'react'
import { useEditorStore } from '@/state/editorStore'
import { useFfmpeg } from '@/lib/useFfmpeg'
import { Play, Pause, Upload, Settings } from 'lucide-react'

function App() {
  const { createNewProject, currentProject } = useEditorStore()
  const { isLoaded: ffmpegLoaded, isLoading: ffmpegLoading, load: loadFfmpeg } = useFfmpeg()
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!currentProject) {
      createNewProject('My First Project')
    }
  }, [currentProject, createNewProject])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="min-h-screen bg-zen-50 dark:bg-zen-900 text-zen-900 dark:text-zen-100">
      {/* Header */}
      <header className="zen-panel m-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-zen-900 dark:text-zen-100">
              Video Editor Stack
            </h1>
            <div className="flex items-center space-x-2 text-sm text-zen-600 dark:text-zen-400">
              <span className={`w-2 h-2 rounded-full ${ffmpegLoaded ? 'bg-green-500' : ffmpegLoading ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'}`} />
              <span>FFmpeg {ffmpegLoaded ? 'Ready' : ffmpegLoading ? 'Loading...' : 'Not Loaded'}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              className="zen-button-primary px-3 py-2 text-sm"
              onClick={loadFfmpeg}
              disabled={ffmpegLoaded || ffmpegLoading}
            >
              <Upload className="w-4 h-4 mr-2" />
              Load FFmpeg
            </button>
            
            <button className="zen-button-secondary px-3 py-2 text-sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-100px)]">
        {/* Sidebar */}
        <aside className="w-80 zen-panel m-4 mr-0 p-4">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Media Library</h2>
            
            <div className="border-2 border-dashed border-zen-300 dark:border-zen-600 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto mb-2 text-zen-400" />
              <p className="text-sm text-zen-600 dark:text-zen-400">
                Drop media files here or click to browse
              </p>
              <input 
                type="file" 
                multiple 
                accept="video/*,audio/*,image/*"
                className="hidden" 
                id="file-input"
              />
              <label 
                htmlFor="file-input"
                className="zen-button-primary mt-2 px-4 py-2 text-sm cursor-pointer"
              >
                Choose Files
              </label>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-zen-700 dark:text-zen-300">Recent Files</h3>
              <div className="text-sm text-zen-500 dark:text-zen-400">
                No files loaded yet
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 zen-panel m-4 p-4 flex flex-col">
          {/* Preview Area */}
          <div className="flex-1 zen-card bg-black rounded-lg flex items-center justify-center mb-4">
            <div className="text-center text-white">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p className="text-lg font-medium">Preview Area</p>
              <p className="text-sm opacity-75">Your video will appear here</p>
            </div>
          </div>

          {/* Transport Controls */}
          <div className="flex items-center justify-center space-x-4 p-4 bg-zen-100 dark:bg-zen-800 rounded-lg">
            <button 
              onClick={handlePlayPause}
              className="w-12 h-12 bg-zen-600 hover:bg-zen-700 dark:bg-zen-500 dark:hover:bg-zen-600 text-white rounded-full flex items-center justify-center transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </button>
            
            <div className="flex items-center space-x-2 text-sm font-mono">
              <span>00:00.00</span>
              <span>/</span>
              <span>00:00.00</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm">Speed:</label>
              <select className="zen-input w-20 text-sm py-1">
                <option>0.25x</option>
                <option>0.5x</option>
                <option selected>1x</option>
                <option>1.5x</option>
                <option>2x</option>
              </select>
            </div>
          </div>

          {/* Timeline */}
          <div className="h-48 mt-4 zen-card p-4">
            <div className="h-full timeline-grid rounded">
              {/* Timeline tracks will go here */}
              <div className="flex items-end justify-center h-full text-zen-400 dark:text-zen-600">
                <p>Timeline tracks will appear here</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
