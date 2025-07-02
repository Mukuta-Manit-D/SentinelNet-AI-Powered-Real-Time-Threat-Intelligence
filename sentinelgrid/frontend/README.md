# Frontend README.md

# 🔐 SentinelGrid Frontend

This document provides an overview of the frontend setup and usage for the SentinelGrid project, a unified event security and intelligence platform.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/sentinelgrid.git
   cd sentinelgrid/frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Running the Application

To start the frontend application, run the following command:

```bash
npm start
```

This will start the development server and open the application in your default web browser.

### Firebase Cloud Messaging Setup

To integrate Firebase Cloud Messaging (FCM) for notifications, follow these steps:

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Add a web app to your Firebase project and copy the Firebase configuration.
3. Update the `src/utils/fcm.js` file with your Firebase configuration.

### Folder Structure

- `src/`: Contains the main source code for the frontend application.
  - `App.jsx`: Main component that sets up routing and layout.
  - `components/`: Contains reusable components.
  - `pages/`: Contains page components, including the home page.
  - `utils/`: Contains utility functions, including FCM integration.

### Contributing

If you would like to contribute to the project, please fork the repository and submit a pull request with your changes.

### License

This project is licensed under the MIT License. See the LICENSE file for details.

---

For more information, refer to the main project README.md or the backend documentation.