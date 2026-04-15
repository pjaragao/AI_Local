# AI Local - Assistant Project

Broadly focused AI Assistant project consisting of a backend service and a web interface.

## Project Structure

- **`/assistant_backend`**: Node.js backend using Prisma ORM, TypeScript, and Docker.
- **`/assistant_backend/assistant_web`**: Frontend application built with React, Vite, and tailwindcss.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Docker (for database services)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pjaragao/AI_Local.git
   cd AI_Local
   ```

2. Setup Backend:
   ```bash
   cd assistant_backend
   npm install
   cp .env.example .env
   # Update .env with your credentials
   npx prisma generate
   ```

3. Setup Frontend:
   ```bash
   cd assistant_web
   npm install
   npm run dev
   ```

## Development

- **Backend**: `npm run dev` inside `assistant_backend`.
- **Frontend**: `npm run dev` inside `assistant_backend/assistant_web`.

## Features

- Artificial Intelligence integration.
- Responsive Web Dashboard.
- Scalable backend architecture.

## License

MIT
