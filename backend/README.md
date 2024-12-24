# Project Documentation

## Project Overview
This is an Express.js backend project designed to manage Google Drive-like functionalities, including file and folder management. It includes features for viewing, updating, and deleting files and folders.

---

## Setting up Google Cloud

To enable Google Drive API and integrate it into this project:

1. **Create a Google Cloud Project:**
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Click on **Create Project** and provide a name for your project.

2. **Enable Google Drive API:**
   - In the Google Cloud Console, navigate to **APIs & Services > Library**.
   - Search for "Google Drive API" and click **Enable**.

3. **Set Up OAuth 2.0 Credentials:**
   - Navigate to **APIs & Services > Credentials**.
   - Click on **Create Credentials** and select **OAuth 2.0 Client IDs**.
   - Configure the following:
     - **Application Type:** Web application.
     - **Authorized Redirect URIs:** Add your application’s callback URLs (e.g., `http://localhost:3000/auth/callback`).

4. **Add Test Users:**
   - Navigate to **OAuth consent screen** in the Google Cloud Console.
   - Add test users (e.g., your email or emails of your team members).

5. **Download Credentials:**
   - Download the JSON file for your OAuth credentials and update the `.env` file with relevant details.

---

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables:
   - Rename `.env.sample` to `.env`

   - Update the `.env` file with the required configurations (e.g., database connection, API keys).

---



## Project Structure

```
project-express/
├── .env.sample                # Environment configuration example
├── .env                       # Environment configuration (created from .env.sample)
├── index.js                   # Main server entry point
├── package.json               # Project dependencies and scripts
├── src/
│   ├── app.js                 # App initialization and middleware setup
│   ├── controllers/           # Controllers for handling requests
│   │   ├── AuthController.js  # Authentication controller
│   │   └── FileController.js  # File management controller
│   ├── helpers/               # Utility functions
│   │   └── encryption.js      # Encryption helper
│   ├── routes/                # Route definitions
│   │   ├── AuthRoutes.js      # Authentication routes
│   │   └── FileRoutes.js      # File routes
│   └── services/              # Business logic
│       ├── AuthService.js     # Authentication services
│       └── FileService.js     # File management services
└── tests/
    └── unit/                  # Unit tests
        ├── AuthController.test.js
        ├── encryption.test.js
        └── FileController.test.js
```

---

## Features

- **Authentication:**
  - User login and registration.
  - Token-based authentication using JSON Web Tokens (JWT).

- **File Management:**
  - View files and folders.
  - Update file metadata.
  - Delete files and folders.

- **Encryption:**
  - Secure handling of sensitive data.

---

## Usage

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Access the API at `http://localhost:3000` (default).

---

## API Endpoints

### Authentication
- **POST** `/auth/login` - User login.
- **POST** `/auth/register` - User registration.

### File Management
- **GET** `/files` - Retrieve all files and folders.
- **PUT** `/files/:id` - Update file metadata.
- **DELETE** `/files/:id` - Delete a file or folder.

---

## Testing

Run unit tests with:
```bash
npm test
```

---


