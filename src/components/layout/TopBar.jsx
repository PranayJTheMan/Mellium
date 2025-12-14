import React from 'react';

const TopBar = () => {
  return (
    <header className="h-16 bg-zen-panel border-b border-zen-border flex items-center justify-between px-6 shadow-zen">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-medium text-zen-text">Zen Editor</h1>
        <div className="text-sm text-zen-textLight">
          • Untitled Project
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Mobile inspector toggle */}
        <button 
          className="lg:hidden zen-button p-2"
          onClick={() => {
            document.getElementById('mobile-inspector').classList.remove('hidden');
            document.getElementById('mobile-inspector-overlay').classList.remove('hidden');
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
          </svg>
        </button>
        
        <button className="zen-button">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Share
        </button>
        <button className="zen-button-primary">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export
        </button>
      </div>
    </header>
  );
};

export default TopBar;
