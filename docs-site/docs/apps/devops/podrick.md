---
title: PodRick
sidebar_position: 1
---

# PodRick

DevOps portfolio manager — centralized dashboard for deploying and monitoring applications via ArgoCD, Helm, and GitHub Actions.

## Stack

- **React 19** with pure CSS and CSS variables
- **ArgoCD API** for sync status
- **GitHub Actions API** for pipeline runs

## Components

| Component | Stories | Description |
|-----------|---------|-------------|
| **ApplicationCard** | Healthy, Degraded, Progressing, Unknown, NoGithub, SyncInteraction | ArgoCD application cards with sync status, health indicators, and GitHub integration |
| **PipelineTimeline** | WithRuns, Empty, SingleSuccess, InProgress | GitHub Actions run timeline with status badges |
| **WorkflowCard** | BuildDeploy, TestSuite, Disabled | GitHub Actions workflow cards showing run history |

## Styling

CSS variables for a clean, light-themed dashboard:
- `--bg-primary`, `--text-primary` custom properties
- System font stack with antialiased rendering
- No runtime CSS overhead

## ArgoCD Integration

ApplicationCard stories showcase the full spectrum of ArgoCD sync states:
- **Healthy** — Synced, all resources running
- **Degraded** — Sync succeeded but pods unhealthy
- **Progressing** — Active sync in progress
- **Unknown** — Lost connection to ArgoCD
- **SyncInteraction** — Click-to-sync with callback verification
