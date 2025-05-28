# Portfolio Website

A full-stack portfolio website built with React, Node.js, Express, MongoDB, and Tailwind CSS.

## Features

- Modern and responsive UI using Tailwind CSS
- MongoDB Atlas for storing project data
- Full API for CRUD operations on projects
- Ready for deployment on Render.com

## Project Structure

- `client/`: React frontend with Tailwind CSS
- `server/`: Node.js backend with Express.js

## Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas account

### Setup

1. Clone the repository
2. Install dependencies for the project, client, and server:

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

3. Create a `.env` file in the server directory based on the `sample.env` file:

```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
NODE_ENV=development
```

### Development

To run both the client and server in development mode:

```bash
npm run dev
```

To run only the client:

```bash
npm run client
```

To run only the server:

```bash
npm run server
```

### Building for Production

To build both client and server for production:

```bash
npm run build
```

### Deployment

This project is ready to be deployed on Render.com.

#### Server Deployment Settings

- Build Command: `npm run build`
- Start Command: `npm start`

## API Endpoints

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get a specific project
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project 