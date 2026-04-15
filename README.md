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

## Docker Support

This project is ready to run with Docker Compose. The setup includes:
- Backend (Node.js)
- Frontend (React/Vite)
- Database (PostgreSQL/Supabase compatible)
- Redis (Queue management)
- Supabase Services (Kong Gateway, Auth, PostgREST)

### Running with Docker

1. Ensure you have Docker and Docker Compose installed.
2. Run the application:
   ```bash
   docker-compose up --build
   ```
3. Access the applications:
   - Frontend: [http://localhost:80](http://localhost:80)
   - Backend API: [http://localhost:3000](http://localhost:3000)
   - Supabase Gateway: [http://localhost:8000](http://localhost:8000)

## Features

- Artificial Intelligence integration.
- Responsive Web Dashboard.
- Scalable backend architecture.

## License

MIT
