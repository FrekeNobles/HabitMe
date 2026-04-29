# Habit Tracker PWA (HabitMe)

A simple Progressive Web App for tracking daily habits and building consistency. Built with Next.js, TypeScript, and Tailwind CSS.

##  Overview

HabitMe is a habit tracking application that allows users to:
- Create, edit, and delete habits
- Track daily completions
- View current streaks
- Work offline after initial load
- Install as a native-like app

##  Setup Instructions

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/habitme.git
cd habitme

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Run production server
npm run lint         # Run ESLint
npm run test:unit    # Run unit tests with coverage
npm run test:integration  # Run integration tests
npm run test:e2e     # Run end-to-end tests
npm test             # Run all tests
```

## Running Tests

### Unit Tests
Tests core utility functions with 80%+ coverage:
```bash
npm run test:unit
```

### Integration Tests
Tests component behavior and data flow:
```bash
npm run test:integration
```

### End-to-End Tests
Tests complete user workflows with Playwright:
```bash
npm run test:e2e
```

### Run All Tests
```bash
npm test
```

## Local Persistence Structure

HabitMe uses `localStorage` for client-side data persistence:

### Storage Keys

- **`habit-tracker-users`**: Array of user objects
- **`habit-tracker-session`**: Current session object (or null)
- **`habit-tracker-habits`**: Array of habit objects


## PWA Support

### Manifest
Location: `public/manifest.json`

Defines app metadata, icons, and display properties for installation.

### Service Worker
Location: `public/sw.js`

Implements offline support with a network-first caching strategy:
- Tries to fetch fresh content from network
- Falls back to cache when offline
- Caches successful responses for future offline access
- Only registers in production builds

### Installation
1. Visit the app in Chrome/Edge
2. Click the install button in the address bar
3. App installs as standalone application

### Offline Capability
After the first visit, the app shell is cached and will load offline. Data operations require connectivity as they use localStorage (not server-based).

## Design System

**Color Palette:**
- Primary: Black (#000000)
- Background: White (#FFFFFF)
- Grays: 50-900 scale for UI elements

**Typography:**
- Font: Inter (Google Fonts)
- Minimalist, premium aesthetic

**Responsiveness:**
- Mobile-first design
- Minimum width: 320px
- Fully responsive up to desktop

## Test File Mappings

### Unit Tests (`tests/unit/`)
| Test File | Verifies | Coverage |
|-----------|----------|----------|
| `slug.test.ts` | Habit name to URL slug conversion | `lib/slug.ts` |
| `validators.test.ts` | Habit name validation logic | `lib/validators.ts` |
| `streaks.test.ts` | Streak calculation algorithm | `lib/streaks.ts` |
| `habits.test.ts` | Habit completion toggle logic | `lib/habits.ts` |

### Integration Tests (`tests/integration/`)
| Test File | Verifies | Coverage |
|-----------|----------|----------|
| `auth-flow.test.tsx` | Signup, login, duplicate handling, invalid credentials | Auth components + storage |
| `habit-form.test.tsx` | Create, edit, delete habits, completion toggle, streak updates | Habit components + utilities |

### E2E Tests (`tests/e2e/`)
| Test File | Verifies | Coverage |
|-----------|----------|----------|
| `app.spec.ts` | Complete user journeys: signup → create habits → complete → persistence → logout | Full application flow |

## Trade-offs & Limitations

### Security
- **Passwords stored in plain text**: For demo purposes only. Production apps must hash passwords.
- **No HTTPS enforcement**: Required for real PWAs in production.
- **No rate limiting**: Vulnerable to brute force in production.

### Scalability
- **localStorage limitations**: 5-10MB limit, no multi-device sync.
- **No backend**: All data is client-side only.
- **Single user per browser**: Clearing browser data deletes all habits.

### Feature Limitations
- **Daily frequency only**: No weekly, monthly, or custom frequencies.
- **No habit history view**: Can't see past completions in UI.
- **No data export**: No CSV or JSON export functionality.
- **No reminders**: No push notifications or email reminders.

### PWA Limitations
- **Service worker only in production**: Offline support doesn't work in `npm run dev`.
- **Cache invalidation**: Users might see stale content until cache expires.
- **iOS limitations**: Limited PWA support on iOS compared to Android.

## Live Link
(https://habit-me-lac.vercel.app)

## Author
Ndifreke Udoh 

---

**Note**: This is a demonstration project for educational purposes. Do not use in production without implementing proper security measures.
