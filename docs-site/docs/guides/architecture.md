---
title: Component Architecture
sidebar_position: 1
---

# Component Architecture

Every app in this showcase follows a consistent structure that separates components from their Storybook stories, mock data, and styling decorators.

## App Structure

```
src/apps/<app-name>/
├── components/          # Props-driven React components
│   ├── Header.jsx
│   ├── Header.stories.jsx
│   └── ...
├── mocks/
│   └── data.js          # Static mock data for stories
└── decorators.jsx       # ThemeProvider + global style wrappers
```

## Design Principles

**Props-driven components** — Every component receives data through props rather than importing services or making API calls. This makes them renderable in Storybook without network dependencies.

**Mock data isolation** — Each app has a `mocks/data.js` file with realistic static data. Stories import from mocks, never from production data sources.

**Decorator encapsulation** — Theme providers, global CSS, and context providers are wrapped in decorators so each app's styling system is self-contained.

## State Management Across Apps

| Pattern | Apps | Libraries |
|---------|------|-----------|
| **Redux Toolkit** | educationELLy, IntervalAI | `@reduxjs/toolkit`, `react-redux` |
| **Apollo Client** | educationELLy-GraphQL, Code Talk | `@apollo/client`, GraphQL |
| **React Context** | Pop!\_Portfolio, TenantFlow | Auth, Notification, WebSocket contexts |
| **Local State** | Bookmarked, FireBook, PodRick | `useState`, `useReducer` |

## Interaction Testing

Stories use Storybook's `play()` functions with `storybook/test` utilities (`fn`, `expect`, `userEvent`, `within`) to verify component interactions — form submissions, navigation clicks, state changes — directly in the story canvas.
