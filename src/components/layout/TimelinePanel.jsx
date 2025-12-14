import React from 'react';

const TimelinePanel = () => {
  return (
    <div className="h-64 bg-zen-panel border-t border-zen-border flex flex-col">
      {/* Timeline header */}
      <div className="h-12 zen-toolbar border-b border-zen-border">
        <div className="flex items-center gap-4">
          <h3 className="zen-section-title">Timeline</h3>
          <div className="flex items-center gap-1">
            <button className="zen-button p-1 h-6 w-6">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button className="zen-button p-1 h-6 w-6">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-zen-textLight">00:00:15</span>
          <div className="w-px h-4 bg-zen-border"></div>
          <span className="text-xs text-zen-textLight">00:01:30</span>
        </div>
        
        <div className="flex items-center gap-1">
          <button className="zen-button p-1 h-6 w-6">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <button className="zen-button p-1 h-6 w-6">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Timeline content */}
      <div className="flex-1 flex">
        {/* Track headers */}
        <div className="w-48 border-r border-zen-border bg-zen-bg">
          <div className="h-8 border-b border-zen-border flex items-center px-3">
            <span className="text-sm font-medium text-zen-text">Video Tracks</span>
          </div>
          <div className="h-8 border-b border-zen-border flex items-center px-3">
            <span className="text-sm text-zen-textLight">Track 1</span>
          </div>
          <div className="h-8 border-b border-zen-border flex items-center px-3">
            <span className="text-sm text-zen-textLight">Track 2</span>
          </div>
          <div className="h-8 border-b border-zen-border flex items-center px-3">
            <span className="text-sm font-medium text-zen-text">Audio Tracks</span>
          </div>
          <div className="h-8 border-b border-zen-border flex items-center px-3">
            <span className="text-sm text-zen-textLight">Audio 1</span>
          </div>
        </div>
        
        {/* Timeline tracks */}
        <div className="flex-1 relative overflow-x-auto">
          <div className="h-8 border-b border-zen-border bg-zen-panel flex items-center px-3">
            <div className="flex items-center gap-1">
              <button className="zen-button p-1 h-6 w-6">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Track content areas */}
          <div className="relative" style={{ minWidth: '600px' }}>
            {/* Video track 1 */}
            <div className="h-8 border-b border-zen-border relative">
              <div className="absolute top-1 left-16 w-24 h-6 bg-zen-accent/20 border border-zen-accent rounded-sm"></div>
            </div>
            
            {/* Video track 2 */}
            <div className="h-8 border-b border-zen-border relative">
              <div className="absolute top-1 left-64 w-32 h-6 bg-zen-accent/10 border border-zen-border rounded-sm"></div>
            </div>
            
            {/* Audio track */}
            <div className="h-8 border-b border-zen-border relative">
              <div className="absolute top-1 left-32 w-40 h-6 bg-zen-success/20 border border-zen-success rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Timeline controls */}
      <div className="h-12 zen-toolbar border-t border-zen-border">
        <div className="flex items-center gap-2">
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
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-1">
            <button className="zen-button p-1 h-8 w-8">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </button>
            <button className="zen-button-primary p-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button className="zen-button p-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-zen-textLight">Zoom:</span>
          <div className="w-16 h-1 bg-zen-border rounded-full overflow-hidden">
            <div className="w-8 h-full bg-zen-accent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePanel;
