---
title: educationELLy
sidebar_position: 3
---

# educationELLy

Student management system for English Language Learners — CRUD operations, pagination, AI chat assistant, and responsive dashboard.

## Stack

- **React 18** with styled-components + Semantic UI CSS
- **Redux** for state management
- **Express** backend

## Components

| Component | Stories | Description |
|-----------|---------|-------------|
| **Header** | Authenticated, Unauthenticated | App header with auth-aware navigation |
| **StudentList** | WithStudents, Empty, Loading | Paginated student table with ELL status, composite levels, and designations |
| **Pagination** | MultiPage, FirstPage, LastPage, ManyPages | Page navigation with edge-case handling |
| **ChatBubble** | Closed, OpenEmpty, WithMessages | AI teaching assistant chat with ELL-focused responses |
| **LoadingSpinner** | Default, CustomMessage | Animated loading indicator |

## Styling

Dual styling approach — styled-components for custom layout with Semantic UI CSS for form elements and tables:
- Orange (`#fb9438`), Blue (`#2873b4`), Green (`#86c64e`)
- Roboto font family

## Domain Model

Students have ELL-specific fields: `ellStatus` (Active ELL, Reclassified, Monitoring), `compositeLevel` (Beginning through Advanced), and `designation` (EO, IFEP, EL, RFEP, TBD).
