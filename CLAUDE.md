# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a React + TypeScript mobile web app for commercial trucking condition reports. It's a UI/UX prototype where all data is stored in memory with no external API calls or authentication backend.

## Development Commands
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (runs TypeScript compilation then Vite build)
- `npm run lint` - Run ESLint on all files
- `npm run preview` - Preview production build locally

## Tech Stack
- **React 19** + **Vite** + **TypeScript**
- **Tailwind CSS 4** - Mobile-first styling
- **React Router DOM** - Client-side routing
- **Lucide React** - Icon library
- **@headlessui/react** - Accessible UI components for modals/dialogs

## Architecture & Data Flow
This is a pure client-side prototype designed for mobile viewports (375px-428px width). All data is stored in React Context/state - no persistence between sessions.

### Key Data Concepts
- **Equipment**: Items that need condition reports (pickups/deliveries)
- **Categories**: Determine photo requirements (< 1000: 2 photos, 1000-1999: 5 photos, ≥ 2000: 20 photos)
- **Condition Reports**: Form submissions with hour meter readings and photos stored as base64
- **Photo Layouts**: Dynamic based on equipment category (vertical/grid/list)

### App Structure
```
/login → /app/home → /app/equipments?type=X → /app/equipments/:id → condition-report → success
                  ↓
                 /app/search (cross-references all equipment)
                  ↓
                 /app/settings (dialogs & logout)
```

### Mobile UI Shell
- **Top Header**: Pinned navigation bar with back button and title
- **Bottom Tab Bar**: 3 tabs (Home, Search, Settings) pinned to bottom
- **Content Area**: Scrollable content between header and bottom nav
- **Special Layouts**: Login page has no header/tabs, success page has no header

## Important Implementation Details

### Photo File Handling
- Store as base64 data URLs in memory with original filenames
- Visual states: green (uploaded) vs red (pending)
- Support drag & drop and click-to-upload
- Dynamic layouts based on equipment category

### Navigation Patterns
- Query params for filtering: `/app/equipments?type=deliveries`
- Equipment detail uses equipment number in URL
- Success page navigation depends on equipment type (return to pickups/deliveries)

### Dialog System
All settings dialogs are modals with specific behaviors:
- **Sync**: Auto-dismiss after 1 second with spinner
- **Helpdesk**: Password validation (only "helpdesk" works)
- **Options**: Theme toggle (light/dark mode)
- **Language**: Radio selection (English/Spanish/German)
- **About**: System info display

## Development Notes
- Mobile-first design (touch-friendly 44px minimum button sizes)
- No actual data persistence - everything resets on page refresh
- Search only shows equipment without condition reports
- Hour meter input is numeric only
- File uploads handle common image formats (jpg, png, webp)