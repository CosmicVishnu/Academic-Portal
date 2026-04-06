# Academic Portal

> **KTU Third Semester — Object Oriented Programming Project (Group 8)**  
> A modern, responsive academic management portal built with React, TypeScript, and shadcn/ui.

---

## Overview

Academic Portal is a frontend web application designed to replicate the core experience of a university academic management system. It provides students and faculty with a clean, accessible interface for managing courses, grades, attendance, and academic records — built with a component-driven architecture using industry-standard tooling.

This project was developed as part of the **KTU (APJ Abdul Kalam Technological University) Third Semester OOP curriculum**, applying object-oriented design principles in a modern frontend context through TypeScript's class and interface system.

---

## Features

- 📋 **Dashboard** — At-a-glance view of academic status, attendance, and upcoming events
- 📚 **Course Management** — Browse enrolled subjects with details and schedules
- 📊 **Grades & Results** — View semester-wise marks and CGPA tracking with charts
- 🗓️ **Attendance Tracker** — Monitor attendance percentage per subject with visual indicators
- 👤 **Student Profile** — Manage personal and academic information
- 🌙 **Dark / Light Mode** — Theme toggle powered by `next-themes`
- ♿ **Accessible UI** — Built entirely on Radix UI primitives for full keyboard and screen reader support

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript |
| Build Tool | Vite |
| UI Components | shadcn/ui (Radix UI + Tailwind CSS) |
| Charts | Recharts |
| Forms | React Hook Form |
| Icons | Lucide React |
| Theming | next-themes |
| Notifications | Sonner |

---

## Project Structure

```
Academic-Portal/
├── src/
│   ├── components/        # Reusable UI components (shadcn/ui based)
│   ├── pages/             # Route-level page components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   └── main.tsx           # App entry point
├── index.html
├── vite.config.ts
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/CosmicVishnu/Academic-Portal.git
cd Academic-Portal

# Install dependencies
npm i

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready for static hosting (Vercel, Netlify, GitHub Pages, etc.).

---

## Design Principles

This project applies **OOP concepts** within a TypeScript + React context:

- **Encapsulation** — Component state and logic are self-contained; UI components expose clean props interfaces
- **Abstraction** — shadcn/ui components abstract complex Radix primitives into simple, reusable building blocks
- **Modularity** — Each feature (grades, attendance, courses) is an independent module with its own components and data logic
- **Type Safety** — TypeScript interfaces define the shape of all data models (Student, Course, Grade, Attendance) enforcing correctness at compile time

---

## Screenshots

> _Add screenshots here once the app is running — a dashboard view, grades page, and mobile responsive view would showcase the project best._

---

## Resume Description

> Built a full-featured academic management portal using React 18, TypeScript, and shadcn/ui; implemented reusable, accessible components with Radix UI primitives, integrated Recharts for grade visualization, and applied OOP design principles through TypeScript interfaces and modular architecture.

---

## Team

Developed by **Group 8** — KTU B.Tech Computer Science, Semester 3.

---

## Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/) — Component library
- [Radix UI](https://www.radix-ui.com/) — Accessible primitives
- [Vite](https://vitejs.dev/) — Build tooling
- APJ Abdul Kalam Technological University — OOP curriculum
