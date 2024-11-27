# FitLife

FitLife is a full-stack web application designed to help users track their fitness journey. It allows individuals to monitor their workouts, meals, and progress toward their fitness goals. Whether you are a beginner or an experienced athlete, FitLife offers an easy-to-use platform to stay on top of your health and fitness routine.

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Workout Tracking**: Log various types of workouts, such as cardio, strength training, and flexibility exercises, with detailed descriptions and metrics.
- **Meal Tracking**: Log daily meals and track macronutrients (protein, carbs, fats) and calories to maintain a balanced diet.
- **Progress Monitoring**: View charts and graphs of your workout progress, body measurements, and weight over time.
- **Goal Setting**: Set personalized fitness goals for strength, endurance, and nutrition, and track your progress toward achieving them.
- **Workout Plans**: Create custom workout plans for different fitness levels and goals.
- **Reminders and Motivation**: Set workout and meal reminders to stay on track with your fitness regimen.

## Technology Stack

### Frontend
- **React.js**: A JavaScript library for building user interfaces.
- **Redux**: For state management to handle global application state.
- **Material UI**: A component library for faster and more efficient UI development.
- **Tailwind CSS**: For utility-first CSS styling and responsive design.

### Backend
- **Node.js**: A JavaScript runtime built on Chrome's V8 engine.
- **Express.js**: Web framework for Node.js to handle routing and middleware.
- **MongoDB**: NoSQL database for storing user and workout data.
- **Mongoose**: ODM (Object Document Mapping) library for MongoDB to work with data in an object-oriented way.
- **JWT Authentication**: For secure user login and authentication.

## Project Structure

This project uses a modular directory structure for easy organization:

```plaintext

FitLife/
│
├── src/
|   ├── app/
│   ├── components/           # Frontend code (React.js)
│   ├── hooks/   # Reusable React components
│   ├── lib/        # React pages (views)
│   └── types/       # Tailwind CSS and global styles
│
├── README.md             # Documentation file
├── LICENSE               # License information
└── .env                  # Environment variables
```

## Setup and Installation

To get started with FitLife, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/download/) (v14.x or later)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use MongoDB Atlas for a cloud database)
- [npm](https://www.npmjs.com/) (Node package manager)

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Anas-Jamil/FitLife.git
    cd FitLife
    ```

2. **Install dependencies**:

    - Install backend dependencies:
    
    ```bash
    cd src/server
    npm install
    ```

    - Install frontend dependencies:
    
    ```bash
    cd ../client
    npm install
    ```

3. **Set up environment variables**:

    - Create a `.env` file in the `src/server` directory and add the following variables:
    
    ```env
    MONGO_URI=your_mongo_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```
    
    - Replace the values with your actual credentials.

4. **Set up the database**:

    - If you're using MongoDB locally, make sure your MongoDB server is running.
    - If using MongoDB Atlas, ensure the connection string in the `.env` file points to your Atlas database.

5. **Run the app locally**:

    - Start the backend server:
    
    ```bash
    cd src/server
    npm start
    ```

    - Start the frontend client:
    
    ```bash
    cd ../client
    npm run dev
    ```

6. **View in Browser**: The application will be available at `http://localhost:3000`.

---

## Usage

1. **User Registration/Login**: Register an account or log in to track your fitness data securely.
2. **Add Workout**: Log a new workout, specifying the type, duration, and any relevant details.
3. **Track Meals**: Log your meals, including nutrition information, to track calories and macronutrients.
4. **Monitor Progress**: View graphs and stats on your workout and meal progress over time.

---

## Future Enhancements

Here are a few planned improvements for FitLife:

- **Enhanced Filtering and Sorting**: Additional ways to filter and sort workouts and meals by type, duration, or calorie content.
- **Integration with Wearables**: Allow users to sync data from fitness devices like Fitbit or Apple Watch.
- **Social Features**: Add functionality for users to share their progress with friends and on social media.
- **Progressive Web App (PWA)**: Enable offline functionality and improve mobile usability.

---

## Contributing

If you would like to contribute to FitLife, feel free to fork the repository, make changes, and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Create a new pull request

