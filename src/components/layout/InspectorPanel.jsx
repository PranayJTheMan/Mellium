import React from 'react';

const InspectorPanel = () => {
  const toolGroups = [
    {
      title: 'Media',
      tools: ['Import Video', 'Import Audio', 'Import Image', 'Record Screen']
    },
    {
      title: 'Overlays',
      tools: ['Text', 'Shapes', 'Stickers', 'Emojis']
    },
    {
      title: 'Effects',
      tools: ['Filters', 'Transitions', 'Animations', 'Color Grading']
    },
    {
      title: 'Audio',
      tools: ['Volume', 'Fade In/Out', 'Noise Reduction', 'EQ']
    }
  ];

  return (
    <div className="w-80 bg-zen-panel border-l border-zen-border flex flex-col">
      {/* Inspector header */}
      <div className="h-12 zen-toolbar border-b border-zen-border">
        <h3 className="zen-section-title">Inspector</h3>
        <button className="zen-button p-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
          </svg>
        </button>
      </div>
      
      {/* Tool groups */}
      <div className="flex-1 overflow-y-auto zen-spacing-sm">
        {toolGroups.map((group, index) => (
          <div key={index} className="mb-6">
            <h4 className="zen-section-title mb-3">{group.title}</h4>
            <div className="space-y-2">
              {group.tools.map((tool, toolIndex) => (
                <button
                  key={toolIndex}
                  className="w-full zen-button justify-start text-left p-3 hover:bg-zen-accentLight hover:border-zen-accent/30"
                >
                  <span className="text-sm">{tool}</span>
                  <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        ))}
        
        {/* Additional inspector content */}
        <div className="mt-8 p-4 bg-zen-bg rounded-zen border border-zen-border">
          <h4 className="zen-section-title mb-3">Properties</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-zen-textLight mb-1">Opacity</label>
              <div className="flex items-center gap-2">
                <input type="range" className="flex-1" defaultValue="100" />
                <span className="text-xs text-zen-textLight w-8">100%</span>
              </div>
            </div>
            <div>
              <label className="block text-xs text-zen-textLight mb-1">Rotation</label>
              <div className="flex items-center gap-2">
                <input type="range" className="flex-1" defaultValue="0" />
                <span className="text-xs text-zen-textLight w-8">0°</span>
              </div>
            </div>
            <div>
              <label className="block text-xs text-zen-textLight mb-1">Scale</label>
              <div className="flex items-center gap-2">
                <input type="range" className="flex-1" defaultValue="100" />
                <span className="text-xs text-zen-textLight w-8">100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectorPanel;
