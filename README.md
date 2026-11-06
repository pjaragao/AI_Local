<div align="center">

# 🧠 AI Local: assistant backend + web UI

### A self-hostable AI assistant platform: Node/TypeScript API, React frontend, Postgres, Redis and Supabase services

![Node](https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)
![React](https://img.shields.io/badge/React-Vite%20%2B%20Tailwind-61DAFB?logo=react&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-compose-2496ED?logo=docker&logoColor=white)

</div>

---

## What is it?

A broadly scoped AI assistant project made of a **backend service** and a **web interface**, packaged so the whole stack runs
locally with one command. For WhatsApp-based agents see [lolo-bot](https://github.com/pjaragao/lolo-bot) and
[mr-irrelevant](https://github.com/pjaragao/mr-irrelevant).

## 🏗️ Architecture

```mermaid
flowchart LR
    W[React + Vite + Tailwind<br/>assistant_web] --> B[Node.js / TypeScript API<br/>Prisma ORM]
    B --> DB[(PostgreSQL<br/>Supabase-compatible)]
    B --> R[(Redis<br/>queues)]
    B --> S[Supabase services<br/>Kong · Auth · PostgREST]
```

```text
assistant_backend/                Node.js + TypeScript backend (Prisma, Docker)
assistant_backend/assistant_web/  React + Vite + Tailwind frontend
docker-compose.yml                backend, frontend, Postgres, Redis, Supabase services
```

## 🚀 Getting started

Prerequisites: Node.js 18+, npm, Docker.

```bash
git clone https://github.com/pjaragao/AI_Local.git && cd AI_Local

# backend
cd assistant_backend && npm install
cp .env.example .env && npx prisma generate
npm run dev

# frontend (another terminal)
cd assistant_backend/assistant_web && npm install && npm run dev
```

Everything at once with Docker Compose:

```bash
docker compose up -d --build
```

---

<div align="center">

Built by **Paulo Aragão Jr** · [GitHub](https://github.com/pjaragao)

</div>
