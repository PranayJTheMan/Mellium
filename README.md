# Video Editor Stack

A modern video editing application built with React, TypeScript, Vite, and FFmpeg.wasm. This project provides a solid foundation for building video editing functionality in the browser with a zen aesthetic and developer-friendly architecture.

## 🚀 Features

- **React + TypeScript**: Modern development experience with full type safety
- **Vite**: Lightning-fast build tool and development server
- **FFmpeg.wasm**: Browser-based video processing capabilities
- **Zustand**: Lightweight state management for complex editor state
- **Tailwind CSS**: Utility-first CSS with a zen-inspired design system
- **ESLint + Prettier**: Code quality and consistent formatting
- **Vitest**: Fast unit testing framework

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── state/              # Zustand store configuration
│   └── editorStore.ts  # Main application state
├── lib/                # Utility libraries
│   ├── useFfmpeg.ts    # FFmpeg.wasm integration
│   └── utils.ts        # General utilities
├── types/              # TypeScript type definitions
│   └── models.ts       # Core data models
├── styles/             # CSS and styling
│   └── index.css       # Main stylesheet with Tailwind
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## 🛠️ Setup and Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   # or
   yarn build
   ```

4. **Run tests:**
   ```bash
   npm run test
   # or
   yarn test
   ```

## 📋 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier
- `yarn type-check` - Run TypeScript type checking
- `yarn test` - Run unit tests
- `yarn test:ui` - Run tests with UI

## 🎬 FFmpeg.wasm Configuration

### Environment Considerations

This application uses FFmpeg.wasm for client-side video processing, which requires specific browser configurations:

### 1. Cross-Origin Isolation

FFmpeg.wasm requires cross-origin isolation to work properly due to SharedArrayBuffer usage:

```typescript
// vite.config.ts includes required headers
server: {
  headers: {
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',
  },
},
```

### 2. Web Worker Support

The FFmpeg integration automatically handles Web Workers for optimal performance:

- Core WASM files are loaded from CDN with proper CORS headers
- Progress tracking and error handling are built-in
- Singleton pattern ensures efficient resource usage

### 3. Memory Considerations

FFmpeg.wasm is memory-intensive:
- Large video files may require significant RAM
- Consider chunking large operations
- Monitor memory usage in production

### 4. Loading FFmpeg

The `useFfmpeg` hook automatically loads FFmpeg on component mount:

```typescript
const { isLoaded, isLoading, load, progress } = useFfmpeg()

// Manual loading (if needed)
await load()
```

### Supported Operations

The FFmpeg integration provides:

- **Video thumbnail extraction**
- **Video trimming and cutting**
- **Format conversion (to MP4)**
- **Video merging/concatenation**
- **Audio addition to video**
- **Video metadata extraction**

## 🎨 Zen Aesthetic Design System

The application uses a carefully crafted design system inspired by zen principles:

### Color Palette

- **Primary**: Zen gray tones (50-900)
- **Semantic**: Blue for interactive elements
- **Status**: Green (success), Red (error), Yellow (warning)

### Components

All components follow consistent patterns:

```typescript
// Button styles
.zen-button-primary  // Primary action buttons
.zen-button-secondary // Secondary actions

// Card layouts
.zen-card            // Base card component
.zen-panel          // Background panels with glass effect

// Form elements
.zen-input          // Consistent input styling
```

### Typography

- **Primary Font**: Inter (clean, readable)
- **Monospace**: JetBrains Mono (for time displays, code)

## 📊 State Management

The application uses Zustand for state management with separate slices:

### MediaAssets Slice
```typescript
const { assets, addAsset, removeAsset, updateAsset } = useEditorStore()
```

### Timeline Slice
```typescript
const { tracks, clips, addClip, setCurrentTime } = useEditorStore()
```

### Editor Settings Slice
```typescript
const { settings, updateSettings } = useEditorStore()
```

### Project Slice
```typescript
const { currentProject, createNewProject } = useEditorStore()
```

## 🔧 Development Guidelines

### Code Style

- Use TypeScript for all files
- Follow ESLint configuration
- Format with Prettier (plugins for Tailwind)
- Use functional components with hooks

### File Naming

- **Components**: PascalCase (`VideoPlayer.tsx`)
- **Hooks**: camelCase with "use" prefix (`useMediaPlayer.ts`)
- **Utilities**: camelCase (`formatTime.ts`)
- **Types**: PascalCase with descriptive names

### State Management

- Keep state minimal and normalized
- Use derived state when possible
- Persist only necessary data
- Use TypeScript for all state interfaces

## 🧪 Testing

The project uses Vitest for testing:

```typescript
// Example test structure
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFfmpeg } from '@/lib/useFfmpeg'

describe('useFfmpeg', () => {
  it('should load FFmpeg', async () => {
    const { result } = renderHook(() => useFfmpeg())
    await act(async () => {
      await result.current.load()
    })
    expect(result.current.isLoaded).toBe(true)
  })
})
```

## 📦 Deployment Considerations

### Production Build

1. **Vite Build**: Optimized for production
2. **Asset Optimization**: Automatic code splitting
3. **Environment Variables**: Configure for production

### FFmpeg.wasm in Production

1. **CDN Configuration**: Ensure WASM files are accessible
2. **CORS Headers**: Configure for your domain
3. **Loading Strategy**: Consider lazy loading for better UX

### Performance Optimizations

- Bundle splitting for faster loading
- Lazy loading of heavy components
- Efficient state updates
- Optimized re-renders

## 🐛 Troubleshooting

### Common Issues

1. **FFmpeg not loading:**
   - Check CORS headers in development
   - Verify network connectivity to CDN
   - Check browser console for errors

2. **Performance issues:**
   - Monitor memory usage with large files
   - Consider worker threads for heavy operations
   - Optimize video processing workflows

3. **Build errors:**
   - Clear node_modules and reinstall
   - Check TypeScript configuration
   - Verify all dependencies are installed

### Browser Compatibility

- **Modern browsers**: Chrome 88+, Firefox 85+, Safari 14.1+
- **Required features**: WebAssembly, SharedArrayBuffer
- **CORS**: Cross-origin isolation must be enabled

## 🤝 Contributing

1. Follow the established code style
2. Write tests for new features
3. Update documentation as needed
4. Use descriptive commit messages

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [FFmpeg.wasm](https://ffmpegwasm.netlify.app/) - Browser-based video processing
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
