---
title: "Pop!_Portfolio"
sidebar_position: 3
---

# Pop!\_Portfolio

Portfolio orchestration dashboard — unified control plane for all portfolio microservices with real-time monitoring.

## Stack

- **React 19** with MUI v7 (Material-UI) and Emotion
- **Socket.IO** for real-time WebSocket connections
- **React Router** for navigation

## Components

| Component | Stories | Description |
|-----------|---------|-------------|
| **Layout** | Default, DisconnectedState, PodsPage, NavigateToPage | Full app layout with sidebar navigation, header, and content area |
| **ConnectionStatus** | Connected, Connecting, Disconnected, Reconnecting | Real-time WebSocket connection indicator with 4 states |
| **NotificationBell** | NoNotifications, WithNotifications, ManyUnread, OpenAndInteract | K8s alert notifications (CrashLoopBackOff, HighMemory, Certificate expiry) |

## Styling

MUI v7 dark theme with Emotion:
- Background: `#0a1929` (dark navy)
- Paper: `#132f4c` (elevated surface)
- Full `CssBaseline` reset
- Stories wrapped in `ThemeProvider` + `MemoryRouter` via decorators

## Context Providers

The decorator provides mock implementations of:
- **AuthContext** — Admin user session
- **NotificationContext** — K8s alert notifications with unread counts
- **MemoryRouter** — React Router for navigation testing without a real browser history

## Interaction Tests

- **Layout/NavigateToPage** — Clicks sidebar navigation items and verifies route changes
- **NotificationBell/OpenAndInteract** — Opens the notification dropdown and marks alerts as read
