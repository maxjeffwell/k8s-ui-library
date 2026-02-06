---
title: Code Talk
sidebar_position: 5
---

# Code Talk

Real-time code collaboration — collaborative text editor with live messaging, room management, and WebSocket subscriptions.

## Stack

- **React 18** with styled-components
- **Apollo Client** with GraphQL subscriptions
- **WebSockets** for real-time collaboration

## Components

| Component | Stories | Description |
|-----------|---------|-------------|
| **Editor** | Empty, WithCode, Disconnected, TypingIndicator, ReadOnly, Interactive | Collaborative code editor with syntax display and connection status |
| **MessageContainer** | GlobalChat, RoomChat, EmptyChat, SendMessage | Chat messaging with global and room-scoped channels |
| **RoomCreate** | Default, WithError, CreateRoom | Room creation form with validation |
| **RoomGrid** | Default, WithTypingUser, EmptyRoom | Grid layout for active collaboration rooms |
| **RoomList** | Default, WithActiveRoom, Empty, SelectRoom | Sidebar room listing with active state highlighting |

## Styling

styled-components with a monospace terminal aesthetic:
- Green (`#30d403`) on dark (`#393939`)
- Courier New monospace font
- `createGlobalStyle` for base resets

## Interaction Tests

- **Editor/Interactive** — Types code into the editor and verifies content updates
- **MessageContainer/SendMessage** — Types a message and clicks send
- **RoomCreate/CreateRoom** — Fills room title and description, submits the form
- **RoomList/SelectRoom** — Clicks a room and verifies the selection callback
