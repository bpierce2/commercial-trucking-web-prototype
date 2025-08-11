# Commercial Trucking Mobile App - Implementation Plan

## Tech Stack
- **React 18** + **Vite** + **TypeScript**
- **Tailwind CSS** (mobile-first)
- **React Router DOM** (navigation)
- **Lucide React** (icons)
- **@headlessui/react** (modals/dialogs)

## Color Palette
- Primary Blue: `#3B82F6` (blue-500)
- Light Blue: `#EFF6FF` (blue-50) 
- Gray Text: `#6B7280` (gray-500)
- Light Gray: `#F3F4F6` (gray-100)
- White: `#FFFFFF`
- Success Green: `#10B981` (emerald-500)
- Error Red: `#EF4444` (red-500)

## Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Button, Input, Modal)
│   ├── cards/           # Card components (HomeCard, EquipmentCard, etc.)
│   └── layout/          # Layout components (Header, BottomNav, AppShell)
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── data/                # Mock data and data management
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## Implementation Steps

### Step 1: Project Setup
- [x] Create Vite React TypeScript project
- [x] Install and configure Tailwind CSS
- [x] Install dependencies: `react-router-dom`, `lucide-react`, `@headlessui/react`
- [x] Configure viewport meta tag for mobile
- [x] Set up TypeScript types

### Step 2: Mock Data Generation
- [ ] Create equipment type definitions
- [ ] Generate 10 pickup equipment items with varying categories
- [ ] Generate 10 delivery equipment items with varying categories  
- [ ] Create branches and user data
- [ ] Set up in-memory data store with React Context

### Step 3: Base UI Components
- [ ] Button component (primary/secondary variants)
- [ ] Input component (text, number, file)
- [ ] Modal/Dialog wrapper using Headless UI
- [ ] Loading spinner component

### Step 4: Layout Components  
- [ ] AppShell with mobile viewport constraints
- [ ] Header component (pinned top, back button, title)
- [ ] BottomNav component (3 tabs: Home, Search, Settings)
- [ ] Page wrapper component

### Step 5: Card Components
- [ ] HomeCard (icon, count, title, description)
- [ ] EquipmentCard (image, content, optional type badge)
- [ ] EquipmentDetailHeaderCard (image, equipment info, GPS button)
- [ ] PhotoInputCard (file drop zone, green/red states)
- [ ] ReportSuccessCard (checkmark, success message)
- [ ] ListOption (settings list item)

### Step 6: Authentication Flow
- [ ] Login page (unique layout without header/tabs)
- [ ] Protected route wrapper
- [ ] Authentication context and state management
- [ ] Logout functionality

### Step 7: Core Pages
- [ ] **Home Page** (`/app/home`): 3 HomeCards with navigation
- [ ] **Equipment List** (`/app/equipments?type=:type`): Filtered equipment cards  
- [ ] **Equipment Detail** (`/app/equipments/:equipmentNumber`): Header + CTA button
- [ ] **Search Page** (`/app/search`): Search input + scanner button + results

### Step 8: Condition Report System
- [ ] **Condition Report Page** (`/app/equipments/condition-report/:equipmentNumber`)
  - Equipment header card
  - Hour meter number input
  - Dynamic photo layouts based on equipment category:
    - Cat < 1000: 2 vertical photo inputs
    - 1000 ≤ cat < 2000: 5-photo grid (2-1-2 layout)
    - Cat ≥ 2000: 20 photo inputs in list
  - File upload with base64 + filename storage
  - Cancel/Submit buttons (fixed bottom)
- [ ] **Success Page** (`/app/equipments/condition-report/success/:equipmentNumber`)
  - No header layout
  - Centered success card with timestamp
  - Return to equipment list navigation

### Step 9: Settings & Dialogs
- [ ] **Settings Page** (`/app/settings`): List of options
- [ ] **Sync Dialog**: Loading spinner, auto-dismiss after 1 second
- [ ] **Helpdesk Dialog**: Password validation ("helpdesk" only)
- [ ] **Options Dialog**: Light/Dark mode toggle  
- [ ] **Language Dialog**: Radio buttons (English, Spanish, German)
- [ ] **About Dialog**: System information display

### Step 10: Data Management
- [ ] Equipment filtering by type (pickup/delivery)
- [ ] Search functionality (equipment number matching)
- [ ] Condition report submission handling
- [ ] Equipment status updates (completed reports)
- [ ] Photo file management (base64 storage)

### Step 11: Mobile Polish
- [ ] Touch-friendly button sizes (min 44px)
- [ ] Proper safe area handling for mobile browsers
- [ ] Smooth transitions and micro-interactions
- [ ] Loading states for all interactions
- [ ] Error handling and validation feedback

## Mock Data Specifications

### Equipment Categories
- **Cat < 1000**: Small equipment (generators, compressors) - 2 photos
- **1000 ≤ cat < 2000**: Medium trucks/trailers - 5 photos  
- **Cat ≥ 2000**: Large commercial trucks - 20 photos

### Sample Equipment Data
- Equipment numbers: Mix of alphanumeric (e.g., "TRK-001", "GEN-045")
- Branch codes: 3-digit alphanumeric (e.g., "A01", "D23", "P45", "S67")
- Descriptions: Realistic equipment descriptions
- Need-by times: Realistic delivery/pickup windows
- Placeholder images: `https://picsum.photos/300/200?random=${id}`

### Photo Requirements
- Store as base64 data URLs in memory
- Include original filename
- Show file upload state (green = uploaded, red = pending)
- Support common image formats (jpg, png, webp)

## Navigation Flow
```
Login → Home → Equipment List → Equipment Detail → Condition Report → Success
                ↓
               Search (cross-references all equipment)
                ↓  
              Settings (dialogs and logout)
```

## Success Criteria
- [ ] All pages render correctly on mobile viewport (375px-428px width)
- [ ] Navigation works between all screens
- [ ] File upload stores base64 + filename in memory
- [ ] Dynamic photo layouts work based on equipment category
- [ ] All dialogs function properly with mobile UX
- [ ] Search filters equipment without condition reports
- [ ] Login/logout flow works
- [ ] Success page shows correct timestamp and navigation