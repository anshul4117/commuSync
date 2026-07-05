# Mini Task Manager

A simple and clean full-stack web application designed for a technical assessment, built with Next.js (App Router), TypeScript, Express, and MongoDB.

---

## Project Overview
A lightweight and beginner-friendly Task Management system configured with a decoupled architecture (separated frontend client and backend server) to manage, track, and execute task lists.

## Features
* **Boilerplate Client**: Clean Next.js starter page built with Tailwind CSS.
* **Modular Backend**: Fully configured Node.js + Express setup in TypeScript.
* **Database Hook**: Seamless Mongoose connection with server startup safety checks (database connects before Express listens).
* **Environment Configuration**: Easy-to-replicate environment setups for both client and server.

## Tech Stack
* **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS
* **Backend**: Node.js, Express, TypeScript
* **Database**: MongoDB, Mongoose

## Folder Structure
```
CommuSync/
├── client/                 # Next.js App Router Frontend
│   ├── src/
│   │   └── app/            # Application routes & styles
│   └── package.json
├── server/                 # Express + Mongoose Backend
│   ├── src/
│   │   ├── config/         # Configs (e.g. database setup)
│   │   ├── app.ts          # Express configuration
│   │   └── server.ts       # Main listener entrypoint
│   └── package.json
├── package.json            # Root workspace task runner
└── README.md               # Main project documentation
```

## Installation Steps

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.0.0 or higher)
* [MongoDB](https://www.mongodb.com/) (local instance or Atlas cluster URI)

### Setup Instructions

1. **Clone and Navigate**:
   ```bash
   cd CommuSync
   ```

2. **Configure Environment Variables**:
   * Create a `.env` in the `/server` folder using `server/.env.example` as a template:
     ```bash
     cp server/.env.example server/.env
     ```
   * Create a `.env` in the `/client` folder using `client/.env.example` as a template:
     ```bash
     cp client/.env.example client/.env
     ```

3. **Install Dependencies**:
   * For the Express server:
     ```bash
     cd server && npm install
     ```
   * For the Next.js client:
     ```bash
     cd ../client && npm install
     ```

4. **Running the Application**:
   * To run both frontend and backend concurrently from the root directory:
     ```bash
     cd .. && npm run dev
     ```
   * To run frontend alone:
     ```bash
     npm run dev:client
     ```
   * To run backend alone:
     ```bash
     npm run dev:server
     ```

## Environment Variables

### Backend (`server/.env`)
* `PORT`: Server port (defaults to `5001` to avoid macOS AirPlay conflict on `5000`)
* `MONGODB_URI`: MongoDB connection string

### Frontend (`client/.env`)
* `NEXT_PUBLIC_API_URL`: Path to the Express backend endpoints (e.g., `http://localhost:5001/api`)

## API Endpoints

### Health Check
* **URL**: `/api/health`
* **Method**: `GET`
* **Response**:
  ```json
  {
    "success": true,
    "message": "Server is running"
  }
  ```

## Database Schema
*(To be implemented in subsequent phases)*

## Design Decisions
* **Decoupled Architecture**: Separating the frontend and backend simplifies development, makes scaling individual layers easier, and models real-world enterprise architectures.
* **Port Selection**: Changed the default Express port from `5000` to `5001` to prevent issues with the default macOS AirPlay system services.

## Challenges
* macOS AirPlay Receiver port collision on port `5000` was resolved by utilizing port `5001` with corresponding environment adjustments.

## Future Improvements
*(To be implemented)*

## Screen Recording Link
*(To be added)*
