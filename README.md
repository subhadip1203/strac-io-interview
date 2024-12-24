# Project Documentation

## Objective

Develop a small application that integrates with Google Drive. The application performs the following tasks:

1. **Authenticate the user** using OAuth 2.0.
2. **List files** in the user’s Google Drive.
3. **Upload a file** to the user’s Google Drive.
4. **Download a file** from the user’s Google Drive.
5. **Delete a file** from the user’s Google Drive.

---

## Project Structure

```
project-folder/
├── frontend/      # Contains frontend application code
├── backend/       # Contains backend application code
└── README.md      # Documentation for the root project
```

---

## Requirements

Ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (v20 or later)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

## Features

### Authentication
- Implement OAuth 2.0 authentication to allow users to log in with their Google account and authorize the application to access their Google Drive.

### File Management
- **List Files:** List all files in the user’s Google Drive, showing file names, types, and last modified dates.
- **Upload File:** Upload a file to the user’s Google Drive by selecting a local file.
- **Download File:** Download a file from Google Drive to the user’s local system.
- **Delete File:** Delete a selected file from the user’s Google Drive.

---

## Documentation
- **Frontend Documentation:** See [frontend/README.md](frontend/README.md) for instructions on setting up and running the frontend.
- **Backend Documentation:** See [backend/README.md](backend/README.md) for instructions on setting up and running the backend.

---

## Testing

Both the frontend and backend include unit and integration tests. Refer to their respective README files for testing instructions.

---

