# TaskManagementApp

## Project Overview

TaskManagementApp is a full stack web application designed for task management, similar to Trello. It utilizes Next.js for the frontend and Node.js with Express and MongoDB for the backend.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB instance

### Clone the Repository

Clone the repository using Git:

```bash
git clone https://github.com/sDEV-eloper/TaskManagementApp
cd TaskManagementApp
```

Setting Up the Frontend
Navigate to the frontend directory:

```bash
cd frontend
npm install
npm run dev
```
The front end will be accessible at http://localhost:3000.

Setting Up the Backend
Navigate to the backend directory:

```bash

cd ../backend
npm install
```
Create a .env file in the backend directory with the following content:

MONGO_URI=mongodb+srv://username:password@cluster0.tgvwr9v.mongodb.net/
JWT_SECRET=adkfjas235.@jq8984q9qnljQWEqhqirS
PORT=3001
Replace username, password, and other placeholders with your actual MongoDB credentials.

Start the backend server:
npm start
The backend will be accessible at http://localhost:3001.
