# Backend Setup for SentinelGrid

This README file provides instructions for setting up and running the backend of the SentinelGrid project.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18 or higher)
- MongoDB (local or cloud instance)
- npm (Node Package Manager)

## Getting Started

1. **Clone the Repository**

   Open your terminal and run the following command to clone the repository:

   ```bash
   git clone https://github.com/yourusername/sentinelgrid.git
   cd sentinelgrid/backend
   ```

2. **Install Dependencies**

   Navigate to the backend directory and install the required npm packages:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the `backend` directory and add the following variables:

   ```
   PORT=5000
   MONGODB_URI=mongodb://<username>:<password>@localhost:27017/sentinelgrid
   FIREBASE_PROJECT_ID=<your_firebase_project_id>
   FIREBASE_PRIVATE_KEY=<your_firebase_private_key>
   FIREBASE_CLIENT_EMAIL=<your_firebase_client_email>
   ```

   Replace the placeholders with your actual MongoDB and Firebase credentials.

4. **Run the Application**

   Start the backend server using the following command:

   ```bash
   node src/app.js
   ```

   The server should now be running on `http://localhost:5000`.

## Directory Structure

- `src/app.js`: Entry point of the application, initializes Express and connects to MongoDB.
- `src/controllers/index.js`: Contains controller functions for handling requests.
- `src/models/index.js`: Defines MongoDB schemas and models.
- `src/routes/index.js`: Sets up application routes.
- `src/services/aiService.js`: Functions for AI model integration.
- `src/utils/notification.js`: Utility functions for Firebase Cloud Messaging.

## API Endpoints

Document your API endpoints here, including request methods, paths, and descriptions.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- Express.js for the web framework.
- Mongoose for MongoDB object modeling.
- Firebase for cloud messaging and notifications.
- AI models for threat detection and analysis.