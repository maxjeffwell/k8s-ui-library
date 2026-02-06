---
title: Styling Systems
sidebar_position: 2
---

# Styling Systems

This showcase demonstrates 6 different CSS-in-JS and styling approaches coexisting in a single Storybook instance — each app uses the system that best fits its architecture.

## System Overview

| System | Apps | Approach |
|--------|------|----------|
| **Emotion** | Bookmarked | `@emotion/react` ThemeProvider, `css` prop |
| **styled-components** | Code Talk, educationELLy, educationELLy-GraphQL | `ThemeProvider`, `createGlobalStyle` |
| **MUI v7** | Pop!\_Portfolio | Full component library, dark theme palette, Emotion under the hood |
| **Tailwind CSS v4** | FireBook | Utility-first CSS, PostCSS plugin, CSS-first config |
| **Semantic UI** | educationELLy, educationELLy-GraphQL | Class-based CSS framework alongside styled-components |
| **Pure CSS / CSS Variables** | PodRick, TenantFlow, IntervalAI | CSS custom properties, no runtime overhead |

## Isolation Strategy

Each app provides its own **decorators** that wrap stories with the correct theme providers and global styles. This prevents style bleeding between apps that use different systems.

For example, Code Talk uses `createGlobalStyle` scoped inside its decorator, while Pop!\_Portfolio wraps stories in MUI's `ThemeProvider` + `CssBaseline`. The decorators live in each app's `decorators.jsx` file.

## Storybook Configuration

The `viteFinal` config in `.storybook/main.js` uses esbuild for CSS minification instead of LightningCSS, because Semantic UI 2.5.0 contains legacy pseudo-element syntax (`::after .header`) that LightningCSS rejects.
