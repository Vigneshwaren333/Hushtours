# Hush Tours

A travel and tour booking website with HTML, CSS, JS frontend and MongoDB backend.

## Features

- Responsive design
- Tour booking functionality
- MongoDB database integration
- Admin dashboard to view bookings

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (must be installed and running on your local machine)

## Setup Instructions

1. **Clone or download the repository**

2. **Install dependencies**
   ```
   npm install
   ```

3. **Ensure MongoDB is running on your local machine**
   - MongoDB should be running on the standard port (27017)
   - The application will automatically create a database called "hush-tours"

4. **Start the application**
   ```
   npm start
   ```
   or for development with auto-reload:
   ```
   npm run dev
   ```

5. **Access the website**
   - Main website: http://localhost:5000
   - Admin dashboard: http://localhost:5000/admin

## Project Structure

- `index2.html` - Main HTML file for the website
- `style2.css` - CSS styles for the website
- `server.js` - Node.js server file
- `admin.html` - Admin dashboard
- Various image files for the website

## Technology Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Other tools: cors, dotenv, body-parser 