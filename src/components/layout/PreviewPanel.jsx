import React from 'react';

const PreviewPanel = () => {
  return (
    <div className="flex-1 bg-zen-bg flex items-center justify-center relative overflow-hidden">
      {/* Preview toolbar */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="zen-toolbar justify-between">
          <div className="flex items-center gap-2">
            <button className="zen-button p-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button className="zen-button p-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4a2 2 0 012-2h2M4 16v4a2 2 0 002 2h2m8-16h2a2 2 0 012 2v4m-4 12h2a2 2 0 002-2v-4M9 12h6M9 8h6v8H9V8z" />
              </svg>
            </button>
            <button className="zen-button p-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zen-textLight">1920 × 1080</span>
            <button className="zen-button p-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4a2 2 0 012-2h2M4 16v4a2 2 0 002 2h2m8-16h2a2 2 0 012 2v4m-4 12h2a2 2 0 002-2v-4M9 12h6M9 8h6v8H9V8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main preview area */}
      <div className="w-full h-full max-w-6xl max-h-96 bg-gradient-to-br from-zen-panel to-zen-bg border border-zen-border rounded-zen shadow-zen-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 bg-zen-accent/10 rounded-full flex items-center justify-center mb-4 mx-auto">
            <svg className="w-16 h-16 text-zen-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-zen-textLight">Preview will appear here</p>
          <p className="text-xs text-zen-textLight mt-2">Import media or start with a template</p>
        </div>
      </div>
      
      {/* Preview controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="zen-toolbar">
          <button className="zen-button p-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button className="zen-button p-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button className="zen-button p-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
