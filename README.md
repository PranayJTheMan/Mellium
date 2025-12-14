# Zen Editor

A minimalistic, zen-inspired editor interface built with React and Tailwind CSS.

## Features

- **Clean, Minimal Design**: Muted color palette with generous spacing
- **Custom Typography**: Uses Zen Maru Gothic font for a zen aesthetic
- **Responsive Layout**: Scales gracefully from desktop (1280px+) to smaller laptop widths
- **Core Layout Components**:
  - TopBar with navigation and main actions
  - PreviewPanel for content preview and controls
  - InspectorPanel for tool groups and properties
  - TimelinePanel for media timeline editing
  - EditorLayout that orchestrates all components

## Zen Design Principles

- **Muted Colors**: Off-white backgrounds, subtle gray panels, soft borders
- **Generous Spacing**: Large padding and margins throughout
- **Soft Shadows**: Gentle box-shadows for depth without harshness
- **Rounded Corners**: Consistent 8px border radius
- **Subtle Animations**: Smooth transitions and hover states
- **No Visual Clutter**: Clean focus states and minimal visual noise

## Tech Stack

- React 18
- Vite (build tool)
- Tailwind CSS (styling)
- JavaScript (no TypeScript for simplicity)

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd zen-editor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── EditorLayout.jsx      # Main layout orchestrator
│   │   ├── TopBar.jsx            # Top navigation bar
│   │   ├── PreviewPanel.jsx      # Center preview area
│   │   ├── InspectorPanel.jsx    # Right sidebar with tools
│   │   └── TimelinePanel.jsx     # Bottom timeline
│   └── ui/
│       └── Button.jsx            # Reusable button component
├── styles/
│   └── globals.css               # Global styles and Zen design system
├── App.jsx                       # Root component
└── main.jsx                      # App entry point
```

## Layout Architecture

The editor uses CSS Grid for complex responsive layouts:

- **Desktop (1024px+)**: 3-column layout with preview center, inspector right, timeline bottom
- **Mobile/Tablet (<1024px)**: Single column with inspector as overlay modal
- **Responsive Breakpoints**: Tailwind CSS responsive prefixes (lg:, md:, sm:)

## Color Palette

- **Background**: `#fafafa` (Off-white)
- **Panels**: `#f5f5f5` (Light gray)
- **Borders**: `#e0e0e0` (Subtle gray)
- **Text**: `#2c2c2c` (Dark gray, not pure black)
- **Text Light**: `#666666` (Medium gray)
- **Accent**: `#4a90e2` (Muted blue)
- **Accent Light**: `#e8f4fd` (Light blue for highlights)

## Component Details

### TopBar
- Fixed height navigation with project title and main actions
- Mobile-responsive inspector toggle button

### PreviewPanel
- Central editing area with preview toolbar and controls
- Responsive scaling with max constraints
- Placeholder content for future media import

### InspectorPanel
- Tool groups: Media, Overlays, Effects, Audio
- Properties panel with sliders for opacity, rotation, scale
- Scrollable content area

### TimelinePanel
- Video and audio track management
- Playback controls and timeline scrubbing
- Zoom controls and track management

## Future Enhancements

- Media import functionality
- Drag-and-drop timeline editing
- Real-time preview rendering
- Export capabilities
- Undo/redo system
- Keyboard shortcuts
- Plugin architecture
