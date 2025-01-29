# Movie Explorer App

A React-based movie explorer app that allows users to search for movies, view detailed information about them, and mark their favorite movies. The app fetches data from the OMDB API and allows users to interact with the interface easily.

## Features

- **Search Movies**: Users can search for movies using the search bar.
- **Movie Details**: Users can view detailed information about each movie, such as the poster, description, director, cast, IMDb rating, etc.
- **Favorites**: Users can mark and unmark movies as their favorites.
- **Responsive Design**: The app is responsive and works well on all screen sizes.
- **MongoDB Integration**: Favorite movies are stored in MongoDB to persist across sessions (if user authentication is implemented later).

## Tech Stack

- **Frontend**: React.js, TailwindCSS, React Router
- **Backend**: Node.js (Optional for future features such as MongoDB integration for favorites)
- **API**: OMDB API for movie data
- **Database**: MongoDB (for storing favorites)

## Setup Instructions

### 1. Clone the Repository
First, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/iamprathameshmore/Movie-Explorer-App.git
cd movie-explorer
```

### 2. Install Dependencies
Use npm or yarn to install the required dependencies for the frontend and backend (if you're using a backend).

For frontend (React):

```bash
npm install
```

For backend (Node.js if you have one):

```bash
npm install --prefix backend
```

### 3. Environment Variables
Create a `.env` file at the root of the project and add your OMDB API key:

```
REACT_APP_OMDB_API_KEY=your_api_key
```

### 4. Running the App
To start the app, use the following command:

For development:

```bash
npm start
```

This will start the app on `http://localhost:3000`.

### 5. Backend (Optional)
If you're using a Node.js backend to store favorites in MongoDB, run the server with:

```bash
npm run server --prefix backend
```

### 6. Open the App
Visit `http://localhost:3000` in your browser to view the app.

## MongoDB Data Model

In case you want to add the MongoDB integration for storing favorites, here's a basic data model:

- **Movie Schema**:
  - `title` (String)
  - `year` (String)
  - `genre` (String)
  - `director` (String)
  - `actors` (String)
  - `imdbRating` (String)
  - `posterUrl` (String)
  - `userId` (String, to associate with the user)

**MongoDB Document Example**:
```json
{
  "title": "Avengers: Endgame",
  "year": "2019",
  "genre": "Action, Adventure, Drama",
  "director": "Anthony Russo, Joe Russo",
  "actors": "Robert Downey Jr., Chris Evans, Mark Ruffalo",
  "imdbRating": "8.4",
  "posterUrl": "https://example.com/avengers.jpg",
  "userId": "user123"
}
```

## Demo Video

Click [here]([link-to-your-video](https://github.com/iamprathameshmore/Movie-Explorer-App/tree/main/demo)) to watch a short demo showcasing the features of the app.

## Contributing

Feel free to fork this project, create issues, and submit pull requests. Contributions are always welcome!
