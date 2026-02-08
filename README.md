# K8s UI Library

Component library and design system showcasing **9 full-stack applications** deployed on a K3s Kubernetes cluster. Built with Storybook 10, React 19, and comprehensive interaction testing.

**Live:** [showcase.el-jefe.me](https://showcase.el-jefe.me) | **Docs:** [showcase.el-jefe.me/docs](https://showcase.el-jefe.me/docs/)

## Applications

Each application module includes fully documented components with interaction tests, accessibility checks, and multiple state variants.

| App | Components | Key Patterns |
|:----|:-----------|:-------------|
| **PodRick** | ApplicationCard, SyncButton | K8s health status, ArgoCD sync |
| **TenantFlow** | DeploymentControls, TenantSelector | Multi-tenant deploys, form validation |
| **Bookmarked** | BookmarkCard, SearchBar | pgvector search, tag management |
| **Code Talk** | MessageContainer, RoomGrid | Real-time chat, room management |
| **educationELLy** | StudentForm, ChatBubble | CRUD forms, GraphQL integration |
| **educationELLy GraphQL** | CreateStudent, StudentList | Apollo Client, mutation handling |
| **IntervalAI** | MLStatusDisplay, NeuralViz | WebGPU/WebGL detection, ML metrics |
| **FireBook** | EditBookmarkModal, BookmarkCard | Firebase CRUD, Algolia search |
| **Portfolio** | ProjectCard, Header | Gatsby patterns, responsive grid |

## Tech Stack

- **Storybook 10** with Vitest integration, a11y addon, Chromatic, Apollo & Redux addons
- **React 19** with Material UI 7, Emotion, Styled Components, Tailwind CSS 4
- **Vite** with Rolldown build system and SWC Fast Refresh
- **Testing** — Vitest + Playwright browser testing, 37 story files with interaction tests
- **Docusaurus 3** documentation site served alongside Storybook

## Development

```bash
npm install

# Storybook (port 6006)
npm run storybook

# Docusaurus docs
npm run docs

# Vite dev server
npm run dev
```

## Project Structure

```
src/apps/
├── bookmarked/          # Bookmark management components
├── code-talk/           # Real-time code collaboration
├── educationelly/       # Educational platform (REST)
├── educationelly-graphql/ # Educational platform (GraphQL)
├── firebook/            # Firebase bookmark management
├── intervalai/          # ML status and visualization
├── podrick/             # K8s ArgoCD management
├── pop-portfolio/       # Portfolio showcase
└── tenantflow/          # Multi-tenant deployment

.storybook/              # Storybook 10 config (8 addons)
docs-site/               # Docusaurus v3 documentation
```

## Build & Deployment

Multi-stage Docker build serving both Storybook and Docusaurus via Nginx:

```bash
docker build -t k8s-ui-library .
```

**CI/CD:** GitHub Actions builds on push to `main`, pushes to Docker Hub (`maxjeffwell/k8s-ui-library-storybook`), and triggers ArgoCD sync to the K3s cluster.

**Nginx** serves Storybook at `/` and Docusaurus at `/docs/`, with gzip compression, security headers, CORS for `el-jefe.me`, and static asset caching.

## Storybook Configuration

- **Framework:** `@storybook/react-vite`
- **Addons:** A11y, Docs, Vitest, Designs, Chromatic, Pseudo States, Apollo Client, Redux Store
- **Viewports:** Mobile (375×812), Tablet (768×1024), Desktop (1440×900)
- **Backgrounds:** Dark, Light, K8s Dark
- **React 19:** `findDOMNode` polyfill for Semantic UI compatibility
