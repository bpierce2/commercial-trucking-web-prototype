# Implementation Plan for Commercial Trucking Condition Report App

## Phase 1: Foundation & Setup
- **Project Setup**: Initialize React + TypeScript + Vite with Tailwind CSS 4
- **Dependencies**: Install React Router DOM, Lucide React icons, @headlessui/react for modals
- **App Shell**: Create mobile-first layout with pinned header, bottom tabs, and scrollable content area

## Phase 2: Core Data & Authentication  
- **Mock Data**: Generate realistic equipment data with varying categories (< 1000, 1000-1999, ≥ 2000)
- **Auth Context**: Implement login state management with branch selection
- **Login Page**: Create unique layout without header/tabs, username/password/branch form

## Phase 3: Main Navigation Flow
- **Home Page**: Build 3 HomeCard components (Equipment deliveries, pickups, status search)
- **Equipment Lists**: Create filtered views for pickups/deliveries with EquipmentCard components
- **Equipment Detail**: Header card with GPS button, "Add Condition Report" action button

## Phase 4: Condition Report System
- **Dynamic Photo Layouts**: 
  - Layout 1: 2 vertical inputs (cat < 1000)
  - Layout 2: 5-photo grid (1000-1999) 
  - Layout 3: 20-photo list (≥ 2000)
- **Form Implementation**: Hour meter input, file uploads with base64 storage
- **Success Page**: Custom layout with equipment-type-specific return navigation

## Phase 5: Search & Settings
- **Search Functionality**: Equipment lookup with scanner UI, filter unreported items only  
- **Settings Dialogs**: Sync, helpdesk password, theme toggle, language selection, about info
- **State Management**: Track completed condition reports, filter search results

## Phase 6: Polish & Testing
- **Mobile Optimization**: Touch-friendly 44px buttons, drag-and-drop file uploads
- **Form Validation**: Required field handling, file type validation
- **User Flow Testing**: Complete navigation paths from login → report submission
- **Visual Polish**: Loading states, transitions, proper error handling

## Detailed Todo List

### Phase 1: Foundation & Setup
1. Set up project foundation with React, TypeScript, Vite, and Tailwind CSS
2. Create basic app shell with header, bottom navigation, and routing structure

### Phase 2: Core Data & Authentication
3. Generate mock data for equipment, branches, and categories
4. Implement authentication context and login page with unique layout

### Phase 3: Main Navigation Flow
5. Build home page with three HomeCard components and navigation
6. Create equipment list page with filtering by type (pickups/deliveries)
7. Implement equipment detail page with header card and GPS button

### Phase 4: Condition Report System
8. Build dynamic photo input system with three different layouts based on equipment category
9. Create condition report form with hour meter input and photo uploads
10. Implement condition report success page with equipment-type-specific navigation

### Phase 5: Search & Settings
11. Build search page with scanner button and equipment filtering
12. Create settings page with all dialog modals (sync, helpdesk, options, language, about)

### Phase 6: Polish & Testing
13. Implement responsive mobile-first styling and touch-friendly interactions
14. Add file upload handling with base64 storage and drag-and-drop support
15. Implement state management for condition reports and equipment tracking
16. Add form validation and error handling throughout the application
17. Test all user flows and navigation paths for mobile viewport
18. Polish UI/UX with proper loading states and transitions

## Key Technical Considerations
- All data stored in React Context (no persistence)
- Mobile viewport focus (375px-428px)
- Photo uploads as base64 with visual state indicators (red/green)
- Dynamic routing with query params for filtering
- Equipment categories determine photo requirements:
  - Cat < 1000: 2 photos (vertical layout)
  - 1000 ≤ Cat < 2000: 5 photos (grid layout)
  - Cat ≥ 2000: 20 photos (list layout)