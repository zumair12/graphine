<div align="center">

<img src="public/favicon.svg" width="64" height="64" alt="Graphine Logo" />

# Graphine

**A premium real-time analytics dashboard built with React, TypeScript, Recharts & D3.js**

[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?style=flat-square&logo=vite)](https://vite.dev)
[![Recharts](https://img.shields.io/badge/Recharts-2-22b5bf?style=flat-square)](https://recharts.org)
[![D3.js](https://img.shields.io/badge/D3.js-7-f9a03c?style=flat-square&logo=d3.js)](https://d3js.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[Overview](#overview) · [Features](#features) · [Tech Stack](#tech-stack) · [Getting Started](#getting-started) · [Project Structure](#project-structure) · [Pages](#pages)

</div>

---

## Overview

Graphine is a high-fidelity, production-ready analytics dashboard that demonstrates best practices in modern React architecture. It combines **Recharts** for declarative chart composition and **D3.js** for bespoke low-level visualisations (sparklines, arc gauges), all driven by a real-time data simulation engine that updates every 2 seconds.

The design system is built entirely with **Vanilla CSS** — no utility framework — using a curated dark-mode palette with glassmorphism, subtle gradients, and micro-animations throughout.

---

## Features

### 📊 Data Visualisations
- **Area Charts** — revenue vs. expenses with gradient fills (Recharts)
- **Bar Charts** — hourly device traffic (desktop / mobile / tablet)
- **Composed Chart** — bars + area overlay for revenue/expense comparison
- **Donut Chart** — interactive with active-shape expansion animation
- **Radar Chart** — hexagonal system health across 6 dimensions
- **Line Chart** — multi-series cohort retention curves
- **Sparklines** — D3 Catmull-Rom splines with gradient area fills
- **Arc Gauges** — D3 radial gauges for CPU & memory utilisation

### ⚡ Real-time Updates
- 2-second tick loop via a dedicated `useRealtimeData` hook
- KPI values drift ±0.8% per tick with sparkline history updates
- Traffic data randomly walks ±5% per data point per tick
- Server node CPU / memory / latency drift with automatic status escalation
- Activity feed receives new randomly-generated events at a 35% probability per tick
- Live / Paused toggle in the header with a pulsing green indicator

### 🧩 Dashboard Pages

| Page | Contents |
|---|---|
| **Overview** | KPI grid, revenue area chart, traffic-source donut, conversion funnel, top-products table, live activity feed, geographic breakdown |
| **Analytics** | Session stats, device traffic bars, revenue vs expenses composed chart, acquisition donut, cohort retention lines, geographic data table |
| **Performance** | D3 arc gauges, node status bars, health radar chart, performance benchmarks list, infrastructure server grid |
| **Activity** | Event-type summary cards, filterable real-time event stream with avatars and type badges |

### 🎨 Design System
- Deep dark-mode palette (`#0a0a0f` → `#2a2a45` surface scale)
- Indigo / Violet / Cyan / Emerald / Rose / Amber accent palette
- Glassmorphism header with `backdrop-filter: blur`
- Smooth CSS animations: value-pulse, slide-down, pulse-dot, shimmer skeleton
- `Inter` body font + `JetBrains Mono` for all numeric values
- Responsive grid layouts (collapses gracefully to single-column on mobile)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript 5 |
| Build Tool | Vite 7 |
| Charts (declarative) | Recharts 2 |
| Charts (custom / D3) | D3.js 7 |
| Icons | Lucide React |
| Styling | Vanilla CSS (design tokens via custom properties) |
| Utilities | `date-fns`, `clsx` |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/graphine.git
cd graphine

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other Commands

```bash
# Type-check + production build
npm run build

# Preview the production build locally
npm run preview

# Lint
npm run lint
```

---

## Project Structure

```
graphine/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── charts/
│   │   │   ├── Sparkline.tsx        # D3 sparkline with gradient fill
│   │   │   ├── GaugeChart.tsx       # D3 arc gauge
│   │   │   ├── DonutChart.tsx       # Recharts interactive donut
│   │   │   ├── RadarChart.tsx       # Recharts health radar
│   │   │   └── RechartsCharts.tsx   # Area, Bar, Composed charts
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   │   └── Header.tsx           # Fixed glassmorphism header
│   │   ├── pages/
│   │   │   ├── OverviewPage.tsx
│   │   │   ├── AnalyticsPage.tsx
│   │   │   ├── PerformancePage.tsx
│   │   │   └── ActivityPage.tsx
│   │   └── widgets/
│   │       ├── KPICard.tsx          # Animated metric card with sparkline
│   │       ├── ActivityFeed.tsx     # Live event stream
│   │       ├── ServerGrid.tsx       # Infrastructure node cards
│   │       └── RegionTable.tsx      # Geographic breakdown
│   ├── data/
│   │   └── mockData.ts              # All seed data
│   ├── hooks/
│   │   └── useRealtimeData.ts       # Real-time simulation engine
│   ├── types/
│   │   └── index.ts                 # Shared TypeScript interfaces
│   ├── utils/
│   │   └── formatters.ts            # Currency, number, date, nudge utils
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                    # Full design system CSS
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Pages

### Overview
The main landing page showing the full business snapshot: four animated KPI cards with live sparklines, a monthly revenue area chart with Revenue / Profit tab toggle, a traffic-source donut chart, a conversion funnel, a top-products table, a live activity feed, and a geographic sessions breakdown.

### Analytics
Deep-dive traffic and conversion insights: session summary stats, hourly device traffic bar chart, monthly revenue vs expenses composed chart, acquisition channel donut, cohort retention multi-line chart, and a full geographic table with revenue and user counts.

### Performance
Infrastructure health monitoring: dual D3 arc gauges for average CPU and memory, node status progress bars, SLA uptime indicator, a system health radar chart across 6 dimensions, a performance benchmarks list with colour-coded status badges, and a live server node grid showing individual CPU/memory/latency bars.

### Activity
A real-time event stream with filterable event type tabs (Sales, Sign-ups, Upgrades, Refunds, Alerts). Includes per-type summary count cards and a full scrollable feed with user avatars, event descriptions, emails, relative timestamps, and type badges.

---

## Architecture Decisions

| Decision | Rationale |
|---|---|
| **Vanilla CSS over Tailwind** | Full control over custom properties, animations, and the design token system |
| **D3 for sparklines & gauges** | Recharts lacks the low-level SVG control needed for smooth Catmull-Rom splines and radial arcs |
| **Recharts for main charts** | Declarative API is faster to compose and easier to maintain for standard chart types |
| **Single `useRealtimeData` hook** | Centralises all simulation logic; components stay pure and receive only props |
| **Mock data in `src/data/`** | Clean separation of concerns — swap for a real API without touching components |
| **`JetBrains Mono` for numbers** | Tabular numerals prevent layout shift as live values update |

---

## License

[MIT](LICENSE) © 2026 Graphine
