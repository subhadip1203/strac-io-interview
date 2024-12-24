# Vue 3 Google OAuth File Manager

This is a Vue 3-based web application that integrates with Google OAuth and Google Drive API to enable users to authenticate, upload, download, and delete files from their Google Drive. It uses modern front-end technologies like Vue Router, Pinia, and Vite for a seamless development experience.

---

## Table of Contents

-   [Features](#features)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Running the Application](#running-the-application)
-   [Project Structure](#project-structure)
-   [Usage](#usage)
-   [Testing](#testing)

---

## Features

-   Google OAuth 2.0 for secure user authentication.
-   File operations:
    -   **View**: See all files and folders to Google Drive.
    -   **Upload**: Upload files to Google Drive.
    -   **Download**: Download files from Google Drive.
    -   **Delete**: Remove files from Google Drive.
-   User-friendly interface with responsive design.
-   Modular and scalable architecture.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (v20 or later)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

1. Start the development server:

    ```bash
    npm run dev
    ```

2. Open your browser and navigate to:
    ```
    http://localhost:3000
    ```

## Project Structure

```plaintext
.
├── src
│   ├── assets            # Static assets like images and CSS
│   ├── router            # Vue Router configuration
│   ├── stores            # State management (e.g., authentication)
│   ├── template          # Layout templates
│   ├── views             # Application views (e.g., Auth, Dashboard, Google Drive)
│   ├── App.vue           # Root Vue component
│   ├── main.js           # Application entry point
│   └── config.js         # App configuration (e.g., OAuth settings)
├── public                # Public assets
├── tests                 # Unit and integration tests
├── vite.config.js        # Vite configuration
└── package.json          # Project metadata and dependencies
```

---

## Usage

1. **Authenticate**:

    - Navigate to the authentication page.
    - Sign in with your Google account.

2. **File Operations**:
    - Upload files: Use the upload interface to select and upload files to Google Drive.
    - Download files: Select a file from the list and download it.
    - Delete files: Remove a file directly from Google Drive.

---

## Testing

Run the unit and integration tests using Vitest:

```bash
npm run test:unit
```

```bash
npm run test:integration
```

---
