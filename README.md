# Mini Task Manager

A full-stack task management application featuring a Next.js frontend and an Express backend. This project serves as a technical assessment submission, demonstrating clean code structure, responsive layout design, database integration, and theme state management.

---

## Features

- Add a task
- View all tasks
- Mark a task as completed
- Delete a task
- Light/Dark mode
- Responsive UI

---

## Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose

---

## Project Structure

```
CommuSync/
├── client/                 # Frontend Next.js Client
│   ├── src/
│   │   ├── app/            # Next.js App Router Page Layouts
│   │   ├── services/       # Native Fetch API Services
│   │   └── types/          # TypeScript Type Interfaces
│   └── package.json
├── server/                 # Backend Node/Express Server
│   ├── src/
│   │   ├── config/         # Configuration Modules (e.g. Database)
│   │   ├── controllers/    # API Controllers
│   │   ├── models/         # Mongoose Schemas & Models
│   │   ├── routes/         # Express Router Handlers
│   │   ├── app.ts          # Express Application Middleware Configuration
│   │   └── server.ts       # Server Bootstrapper & DB Connection Wrapper
│   └── package.json
├── package.json            # Root Workspace Package Configuration
└── README.md               # Main Project Documentation
```

---

## Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (Node Package Manager)
- A running MongoDB instance (Local community server or MongoDB Atlas URI)

### Installation
1. Clone the repository and navigate to the directory:
   ```bash
   cd CommuSync
   ```
2. Configure environment variables for both projects.
   - For the server, copy the environment template:
     ```bash
     cp server/.env.example server/.env
     ```
     Adjust `PORT` and `MONGODB_URI` inside `server/.env`.
   - For the client, copy the environment template:
     ```bash
     cp client/.env.example client/.env
     ```
     Adjust `NEXT_PUBLIC_API_URL` inside `client/.env`.
3. Install dependencies for the root and workspaces:
   - For the backend server:
     ```bash
     cd server && npm install
     ```
   - For the frontend client:
     ```bash
     cd ../client && npm install
     ```

### Running the Backend
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Start the development server (runs by default on port 5001):
   ```bash
   npm run dev
   ```
3. To compile TypeScript to production JavaScript:
   ```bash
   npm run build
   ```

### Running the Frontend
1. Navigate to the client folder:
   ```bash
   cd client
   ```
2. Start the client dev server:
   ```bash
   npm run dev
   ```
3. To build the production client package:
   ```bash
   npm run build
   ```

---

## Environment Variables

### Server
Create a `.env` file in the `/server` folder with:
```env
MONGODB_URI=mongodb://localhost:27017/commusync
PORT=5001
```

### Client
Create a `.env` file in the `/client` folder with:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

---

## API Endpoints

### Get All Tasks
- **URL**: `/api/tasks`
- **Method**: `GET`
- **Response Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "success": true,
    "count": 1,
    "data": [
      {
        "_id": "603fcd09f1d0440015a995e8",
        "title": "Build Backend",
        "completed": false,
        "createdAt": "2026-07-05T09:32:00.000Z",
        "updatedAt": "2026-07-05T09:32:00.000Z"
      }
    ]
  }
  ```

### Create Task
- **URL**: `/api/tasks`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "title": "Learn Next.js"
  }
  ```
- **Response Code**: `201 Created`
- **Response Body**:
  ```json
  {
    "success": true,
    "message": "Task created successfully",
    "data": {
      "_id": "603fcd09f1d0440015a995e9",
      "title": "Learn Next.js",
      "completed": false,
      "createdAt": "2026-07-05T09:33:00.000Z",
      "updatedAt": "2026-07-05T09:33:00.000Z"
    }
  }
  ```

### Complete Task
- **URL**: `/api/tasks/:id/complete`
- **Method**: `PATCH`
- **Response Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "success": true,
    "message": "Task marked as completed",
    "data": {
      "_id": "603fcd09f1d0440015a995e9",
      "title": "Learn Next.js",
      "completed": true,
      "createdAt": "2026-07-05T09:33:00.000Z",
      "updatedAt": "2026-07-05T09:35:00.000Z"
    }
  }
  ```

### Delete Task
- **URL**: `/api/tasks/:id`
- **Method**: `DELETE`
- **Response Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "success": true,
    "message": "Task deleted successfully"
  }
  ```

---

## Database Schema

### Task
Mongoose database schema definitions representing tasks in MongoDB:
- `title` (String, Required, Trimmed, Max 100 characters)
- `completed` (Boolean, Default: false)
- `createdAt` (Date, Auto-generated timestamp)
- `updatedAt` (Date, Auto-generated timestamp)

---

## Design Decisions

- **No Authentication**: Omitted to keep the project focused on core full-stack functionalities and assessment scope.
- **No State Management Library**: Relies entirely on native React state hooks (`useState` and `useEffect`) for simple and predictable state logic without installing Redux or Zustand.
- **Native Fetch API**: Avoids extra HTTP library overhead (like Axios) in the frontend client. Native Fetch matches modern web APIs.
- **Simple Folder Structure**: Avoids nested abstractions (like service layers or repository patterns) to make the code accessible and easily readable for junior developers.
- **Focus on Readability**: Written using clean code practices, clear variable names, and straightforward async/await blocks.
- **Assessment Scope**: Built strictly to satisfy requirements while ensuring a clean architecture.

---

## Challenges

- **API Integration**: Orchestrating frontend component states to react immediately after backend operations (such as dynamically updating lists after task completions).
- **Theme Persistence**: Creating a custom Light/Dark theme toggler that resolves system preferences and stores configurations locally inside the browser's `localStorage` without layout shifts or third-party packages.
- **Loading States**: Displaying indicators to communicate pending request statuses and disabling interactive elements to prevent duplicate form submissions.
- **Error Handling**: Restricting database validation errors from breaking the user flow, displaying error banners cleanly in the UI, and keeping the existing lists on screen during failures.

---

## Future Improvements

- **Edit Task**: Allow users to inline edit task titles.
- **Search**: Enable searching tasks by title keywords.
- **Filter Tasks**: Toggle between showing all, active, or completed tasks.
- **Due Dates**: Attach deadlines to individual tasks.
- **Categories**: Group tasks under custom tags or categories.
- **Authentication**: Integrate secure multi-user support (such as Auth0 or NextAuth).

*Note: These features were intentionally left out because they were outside the scope of the assessment requirements.*

---

## Author

- **GitHub**: [anshul4117](https://github.com/anshul4117)
- **LinkedIn**: [anshul-ab7135245](https://www.linkedin.com/in/anshul-ab7135245/)
