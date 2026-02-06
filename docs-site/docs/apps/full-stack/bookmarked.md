---
title: Bookmarked
sidebar_position: 2
---

# Bookmarked

Bookmark management with AI features — semantic search, virtual scrolling, batch tag generation, and smart filtering.

## Stack

- **React 18** with Emotion CSS-in-JS
- **Express** backend
- **AI-powered** semantic search with similarity scoring

## Components

| Component | Stories | Description |
|-----------|---------|-------------|
| **Header** | Authenticated, AuthenticatedHome, Unauthenticated, LoginPage | Navigation header with auth-aware rendering |
| **BookmarkForm** | CreateNew, EditExisting, FillAndSubmit | Create and edit bookmarks with title, URL, description, rating, and tags |
| **SemanticSearch** | Default, WithResults, WithError, NoResults | AI-powered search with cosine similarity scores |
| **Landing** | Default | Marketing landing page |
| **Footer** | Default | Site footer |
| **Sidebar** | *(component available)* | Navigation sidebar |

## Styling

Emotion ThemeProvider with a custom palette:
- Primary: `#393939` (charcoal)
- Tertiary: `#FF4834` (red-orange accent)
- Background decorator: `#fbf579` (bright yellow)

## Interaction Tests

- **BookmarkForm/FillAndSubmit** — Types into title, URL, and description fields, selects a rating, and submits the form
- **SemanticSearch/WithResults** — Performs a semantic query and verifies similarity-scored results appear
