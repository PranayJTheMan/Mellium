import React from 'react';
import TopBar from './TopBar';
import PreviewPanel from './PreviewPanel';
import InspectorPanel from './InspectorPanel';
import TimelinePanel from './TimelinePanel';

const EditorLayout = () => {
  return (
    <div className="h-screen bg-zen-bg flex flex-col overflow-hidden">
      {/* Top navigation bar - fixed height */}
      <TopBar />
      
      {/* Main content area - uses CSS Grid for complex layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_320px] grid-rows-[1fr_256px] gap-0 overflow-hidden">
        {/* Preview Panel - center area, spans both rows on desktop */}
        <div className="col-span-1 lg:col-span-1 row-span-1 lg:row-span-2 min-h-0">
          <PreviewPanel />
        </div>
        
        {/* Inspector Panel - right sidebar on larger screens */}
        <div className="hidden lg:block col-span-1 row-span-1 lg:row-span-2 min-h-0">
          <InspectorPanel />
        </div>
        
        {/* Timeline Panel - bottom area */}
        <div className="col-span-1 lg:col-span-2 row-span-1 min-h-0">
          <TimelinePanel />
        </div>
      </div>
      
      {/* Mobile/Tablet Inspector - overlay for smaller screens */}
      <div className="lg:hidden fixed inset-0 z-50 hidden" id="mobile-inspector-overlay">
        <div className="absolute inset-0 bg-zen-overlay" onClick={() => {
          document.getElementById('mobile-inspector').classList.add('hidden');
          document.getElementById('mobile-inspector-overlay').classList.add('hidden');
        }}></div>
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-zen-panel border-l border-zen-border shadow-zen-lg" id="mobile-inspector">
          <InspectorPanel />
        </div>
      </div>
    </div>
  );
};

export default EditorLayout;
