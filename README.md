# TinderClone

## Overview

Tinder clone made with MERN-STACK (MongoDB, Express.js, React, and Node.js). In the app, you can match, chat, and find common activities with your matches.

## Technology Stack

### Frontend
- **Framework**: React.js
- **Libraries**:
  - **React-toastify**: Used for custom toasts.
  - **React-router-dom**: Implemented for page navigation.
  - **React-tinder-card**: Utilized for swiping users.
  - **React-cookie**: Used for storing cookies from the server.
  - **Mui/Material-UI**: Employed for buttons and the navigation bar.
  - **CSS and Media Queries**: Utilized for styling and responsive design.

### Backend
- **Libraries**:
  - **Database**: MongoDB
  - **ODM (Object-Document Mapper)**: Mongoose
  - **Server Framework**: Express.js
  - **Authentication**: JWT (JSON Web Tokens)
  - **Password Hashing**: Bcrypt
  - **Validation**: Express-validator
  - **Unique ID Generation**: Uuid
  - **Environment Variables Management**: Dotenv

## Installation Guidelines

### Installation

#### Prerequisites
Before you begin, ensure you have the following installed on your machine:
- Node.js
- MongoDB

#### Clone the Repository

```bash
git clone https://github.com/veetiengblom/TinderClone.git
```

Frontend Setup

1. Navigate to the frontend directory:
```bash
cd tinder-clone/client
```
2. Install dependencies:
```bash
npm install
```
3. Run the frontend application:
```bash
npm start
```

Backend Setup

1. Navigate to the backend directory:
```bash
cd tinder-clone/server
```
2. Install dependencies:
```bash
npm install
```
3. Create a .env file in the backend directory and add the following:
```bash
MONGODB_URI=your-mongodb-connection-string  # Replace with your MongoDB connection string
SECRET=your-secret-key                  # Replace with a secure secret key for JWT
```
4. Run the backend server:
with nodemon
```bash
npm start
```
or without nodemon
```bash
npm run startwithout
```

Database setup

If you wish to use the activity element, you need to make activities collection in your database. Then import the sports, music, adventure JSON files from the code to the collection.
Access the Application

Visit http://localhost:3000 in your web browser to access the application.
