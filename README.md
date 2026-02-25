# Streamsphere — Movie Application

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61dafb?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-v6-ca4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952b3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.6-5a29e4?style=for-the-badge&logo=axios&logoColor=white)
![Node](https://img.shields.io/badge/Node-v24+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

A Netflix-inspired movie discovery app built with React 18, powered by the TMDB API.

[Features](#features) • [Screenshots](#screenshots) • [Getting Started](#getting-started) • [Project Structure](#project-structure) • [Tech Stack](#tech-stack)

</div>

---

## Features

- **Live Movie Data** — Trending, popular, and searchable movies via TMDB API
- **Debounced Search** — Smart search that reduces API calls by waiting for the user to stop typing
- **Genre Filter** — Client-side filtering by movie genre on search results
- **Favorites List** — Save movies that persist across sessions via localStorage
- **Dark / Light Theme** — Toggle with preference saved to localStorage
- **Toast Notifications** — Global feedback system for all user actions
- **Error Boundaries** — Graceful error handling at every level
- **Vite Build Tool** — Fast dev server compatible with Node 24+

---

## Screenshots

> *(Add your screenshots here — drag images into the GitHub editor)*

| Home Page | Movie Details | Search | Favorites |
|-----------|--------------|--------|-----------|
| ![home](screenshots/home.png) | ![details](screenshots/details.png) | ![search](screenshots/search.png) | ![favorites](screenshots/favorites.png) |

---

## Getting Started

### Prerequisites

- Node.js `v17+` (tested on `v24.11.1`)
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/movie-app.git
cd movie-app

# 2. Install dependencies
npm install

# 3. Set up your environment variables
cp .env.example .env
# Then open .env and add your TMDB API key

# 4. Start the development server
npm start
```

The app opens automatically at `http://localhost:3000`

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

> **Note:** Vite requires the `VITE_` prefix. The app includes a fallback key for development, but you should use your own for production.

---

## Project Structure

```
src/
├── api/
│   └── tmdb.js              # All TMDB API functions (axios instance pattern)
├── components/
│   ├── Banner.jsx           # Hero banner for featured movie
│   ├── ErrorBoundary.jsx    # Catches runtime render errors
│   ├── LoadingSpinner.jsx   # Shared loading indicator
│   ├── MovieCard.jsx        # Individual movie card with favorite toggle
│   ├── MovieGrid.jsx        # Horizontal scrollable row of MovieCards
│   ├── NavBar.jsx           # Fixed navbar with theme toggle
│   └── SearchBar.jsx        # Controlled search input
├── context/
│   ├── FavoritesContext.jsx # Favorites state + localStorage persistence
│   ├── ThemeContext.jsx     # Dark/light mode + localStorage persistence
│   └── ToastContext.jsx     # Global toast notification system
├── hooks/
│   ├── useFetch.js          # Generic data fetching with loading/error state
│   └── useDebounce.js       # Delays value update until typing stops
├── pages/
│   ├── Favorites.jsx        # Saved movies page
│   ├── Home.jsx             # Landing page with trending + popular rows
│   ├── MovieDetails.jsx     # Full movie detail view
│   └── Search.jsx           # Search + genre filter page
└── styles/
    ├── index.css            # Global resets + CSS variable definitions
    ├── shared.css           # Cross-component layout classes
    ├── darkTheme.css        # Dark theme variable overrides
    └── lightTheme.css       # Light theme variable overrides
```

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework with hooks and concurrent features |
| **Vite 5** | Build tool — replaces Create React App, supports Node 24+ |
| **React Router v6** | Client-side routing with dynamic URL params |
| **Axios** | HTTP client with pre-configured instance pattern |
| **Bootstrap 5** | UI components (buttons, alerts, badges, toasts) |
| **CSS Custom Properties** | Theme system via `--bg-color` / `--text-color` variables |
| **TMDB API** | Movie data, posters, ratings, genres |
| **localStorage** | Persists favorites and theme preference across sessions |

---

## Key Architecture Decisions

### Custom Hooks
`useFetch` and `useDebounce` extract reusable logic from components, following the DRY principle. `useFetch` includes an `isMounted` flag to prevent state updates on unmounted components (memory leak prevention).

### Context API
Three separate contexts own distinct slices of global state — avoiding prop drilling without the overhead of a state management library. Provider nesting order is deliberate: `ToastProvider` wraps `FavoritesProvider` because favorites actions trigger toasts.

### Axios Instance Pattern
A single `apiClient` is created with `axios.create()`, pre-configuring the base URL and API key. All API functions use this instance — change config once, all functions inherit it.

### CSS Variable Theming
Dark mode works by toggling a class on `<html>`. Components only need `var(--bg-color)` — no JavaScript needed in individual components to respond to theme changes.

---

## API Reference

This app uses the [TMDB API v3](https://developer.themoviedb.org/docs). Endpoints used:

| Endpoint | Used For |
|---|---|
| `GET /movie/popular` | Popular movies row on Home |
| `GET /trending/movie/week` | Trending row + Banner on Home |
| `GET /movie/{id}` | Movie details page |
| `GET /search/movie` | Search results |
| `GET /genre/movie/list` | Genre filter dropdown |
| `GET /discover/movie` | Filter by genre |

---

## Available Scripts

```bash
npm start       # Start development server (http://localhost:3000)
npm run build   # Build for production (outputs to /dist)
npm run preview # Preview production build locally
npm test        # Run tests with Vitest
```

---

## Roadmap

- [ ] Pagination / infinite scroll on movie grids
- [ ] Movie trailer playback via YouTube embed
- [ ] User ratings and reviews
- [ ] Skeleton loaders instead of spinner
- [ ] Unit tests for custom hooks
- [ ] TypeScript migration
- [ ] React Query for caching and background refetching

---

## Why Vite Instead of Create React App?

Create React App (`react-scripts`) uses a webpack configuration with an older OpenSSL version that is incompatible with Node 17+. Node 24 uses OpenSSL 3, which removed those legacy APIs — CRA crashes on startup.

Vite solves this by using native ES modules in development. It also starts in under 300ms vs 10-30 seconds for CRA.

**Migration changes made:**
- `process.env.REACT_APP_*` → `import.meta.env.VITE_*`
- `src/index.js` → `src/main.jsx`
- `public/index.html` → `index.html` (project root)
- Context files renamed from `.js` → `.jsx` (Vite requires JSX files to use `.jsx` extension)

---

## Acknowledgements

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- UI components from [React Bootstrap](https://react-bootstrap.github.io/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)

---

<div align="center">

Built with React + Vite

</div>
