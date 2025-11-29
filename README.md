# Vibing Violet

## Overview

It's a basic messaging app similar to messenger and discord, it uses WebSockets to create a live connection between users.

## Key features

- Secure sign-in with Auth0
- Add and manage connections
- Real-time 1-to-1 messaging using WebSockets
- Persistent message history
- Responsive UI built with Tailwind

## Tech used

### Frontend

- React
- React Router
- Vite
- TailwindCSS
- TanStack React Query

### Backend

- Express
- WebSockets (ws)
- Knex
- SQLite3
- JSON Web Tokens (Auth0)

## Setup

### Installation

```
git clone [project-ssh-address]
cd [project-name]
npm install # to install dependencies
npm run knex migrate:rollback # (only if you need to default back to the original migrations)
npm run knex migrate:latest # to setup the migrations
npm run knex seed:run # to run the seed files for basic data
npm run dev # to start the dev server
```

You can find the server running on [http://localhost:3000](http://localhost:3000), the client running on [http://localhost:5173](http://localhost:5173) and the WebSocket running on [ws://localhost:5173](ws://localhost:5173).

---
