import { useState, useEffect } from 'react';
import MovieList from './components/RoomList';
import MovieDetails from './components/ChatArea';
import AuthModal from './components/AuthModal';

function App() {
  const [user, setUser] = useState(null);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('chatUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Dummy movie data with reviews
  const [movies, setMovies] = useState([
    { 
      id: 1, 
      title: 'The Shawshank Redemption', 
      year: 1994, 
      genre: 'Drama',
      reviewCount: 3,
      averageRating: 4.7
    },
    { 
      id: 2, 
      title: 'The Godfather', 
      year: 1972, 
      genre: 'Crime',
      reviewCount: 2,
      averageRating: 5.0
    },
    { 
      id: 3, 
      title: 'Inception', 
      year: 2010, 
      genre: 'Sci-Fi',
      reviewCount: 2,
      averageRating: 4.5
    },
    { 
      id: 4, 
      title: 'Pulp Fiction', 
      year: 1994, 
      genre: 'Crime',
      reviewCount: 1,
      averageRating: 5.0
    },
  ]);

  const [activeMovieId, setActiveMovieId] = useState(null);
  
  const [reviewsByMovie, setReviewsByMovie] = useState({
    1: [
      { id: 1, author: 'Alice', text: 'Absolutely brilliant! One of the best movies ever made. The story is captivating and the acting is superb.', rating: 5, timestamp: '2 days ago' },
      { id: 2, author: 'Bob', text: 'A masterpiece. Every scene is perfect and the ending is unforgettable.', rating: 5, timestamp: '1 day ago' },
      { id: 3, author: 'Charlie', text: 'Great movie, but a bit slow in some parts. Still highly recommend it!', rating: 4, timestamp: '12 hours ago' },
    ],
    2: [
      { id: 1, author: 'David', text: 'The greatest crime movie of all time. Marlon Brando is legendary!', rating: 5, timestamp: '3 days ago' },
      { id: 2, author: 'Eve', text: 'A timeless classic. The cinematography and storytelling are unmatched.', rating: 5, timestamp: '1 day ago' },
    ],
    3: [
      { id: 1, author: 'Frank', text: 'Mind-bending and visually stunning. Christopher Nolan at his best!', rating: 5, timestamp: '2 days ago' },
      { id: 2, author: 'Grace', text: 'Amazing concept and execution, though it requires full attention to follow.', rating: 4, timestamp: '18 hours ago' },
    ],
    4: [
      { id: 1, author: 'Henry', text: 'Tarantino\'s masterpiece! Nonlinear storytelling at its finest.', rating: 5, timestamp: '4 days ago' },
    ],
  });

  const activeMovie = movies.find((movie) => movie.id === activeMovieId);
  const reviews = activeMovieId ? reviewsByMovie[activeMovieId] || [] : [];

  const handleMovieSelect = (movieId) => {
    setActiveMovieId(movieId);
  };

  const calculateAverageRating = (movieReviews) => {
    if (movieReviews.length === 0) return 0;
    const sum = movieReviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / movieReviews.length;
  };

  const handleAddMovie = (movieData) => {
    const newMovie = {
      id: Math.max(...movies.map(m => m.id), 0) + 1,
      title: movieData.title,
      year: movieData.year,
      genre: movieData.genre,
      reviewCount: 0,
      averageRating: 0,
    };
    setMovies([...movies, newMovie]);
    setReviewsByMovie({ ...reviewsByMovie, [newMovie.id]: [] });
    setActiveMovieId(newMovie.id);
  };

  const handleAddReview = (reviewData) => {
    if (!activeMovieId) return;

    const newReview = {
      id: reviews.length + 1,
      author: user?.username || 'You',
      text: reviewData.text,
      rating: reviewData.rating,
      timestamp: 'Just now',
    };

    const updatedReviews = [...reviews, newReview];
    setReviewsByMovie({
      ...reviewsByMovie,
      [activeMovieId]: updatedReviews,
    });

    // Update movie's average rating and review count
    const avgRating = calculateAverageRating(updatedReviews);
    setMovies(movies.map(movie => 
      movie.id === activeMovieId 
        ? { ...movie, averageRating: avgRating, reviewCount: updatedReviews.length }
        : movie
    ));
  };

  const handleLogin = (username) => {
    const newUser = { username };
    setUser(newUser);
    localStorage.setItem('chatUser', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('chatUser');
    setActiveMovieId(null);
  };

  if (!user) {
    return <AuthModal onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen flex bg-black">
      <MovieList
        movies={movies}
        activeMovie={activeMovieId}
        onMovieSelect={handleMovieSelect}
        onAddMovie={handleAddMovie}
        user={user}
        onLogout={handleLogout}
      />
      <MovieDetails
        movie={activeMovie}
        reviews={reviews}
        onAddReview={handleAddReview}
      />
    </div>
  );
}

export default App;
