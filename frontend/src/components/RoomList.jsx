import { useState } from 'react';
import UserProfile from './UserProfile';

export default function MovieList({ movies, activeMovie, onMovieSelect, onAddMovie, user, onLogout }) {
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newMovieYear, setNewMovieYear] = useState('');
  const [newMovieGenre, setNewMovieGenre] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleAddMovie = (e) => {
    e.preventDefault();
    if (newMovieTitle.trim() && newMovieYear.trim()) {
      onAddMovie({
        title: newMovieTitle,
        year: parseInt(newMovieYear),
        genre: newMovieGenre
      });
      setNewMovieTitle('');
      setNewMovieYear('');
      setNewMovieGenre('');
      setShowCreateForm(false);
    }
  };

  return (
    <div className="w-64 bg-black flex flex-col">
      <div className="p-4 bg-black border-b border-gray-800">
        <h2 className="text-xl font-bold text-white">🎬 Movies</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {movies.map((movie) => (
          <button
            key={movie.id}
            onClick={() => onMovieSelect(movie.id)}
            className={`w-full text-left px-4 py-3 hover:bg-gray-900 transition-colors cursor-pointer ${
              activeMovie === movie.id
                ? 'bg-gray-900 border-l-4 border-orange-500'
                : 'border-l-4 border-transparent'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-white font-medium">{movie.title}</div>
                <div className="text-gray-400 text-sm">{movie.year} • {movie.genre}</div>
                <div className="text-gray-500 text-xs mt-1">{movie.reviewCount} reviews</div>
              </div>
              <span className="bg-orange-500 text-black text-xs rounded-full px-2 py-1 font-bold ml-2">
                ⭐ {(movie.averageRating || 0).toFixed(1)}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-gray-800">
        {showCreateForm ? (
          <form onSubmit={handleAddMovie} className="space-y-2">
            <input
              type="text"
              value={newMovieTitle}
              onChange={(e) => setNewMovieTitle(e.target.value)}
              placeholder="Movie title"
              className="w-full px-3 py-2 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              autoFocus
              required
            />
            <input
              type="number"
              value={newMovieYear}
              onChange={(e) => setNewMovieYear(e.target.value)}
              placeholder="Year"
              className="w-full px-3 py-2 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="text"
              value={newMovieGenre}
              onChange={(e) => setNewMovieGenre(e.target.value)}
              placeholder="Genre"
              className="w-full px-3 py-2 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-black px-3 py-2 rounded transition-colors font-bold cursor-pointer"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setNewMovieTitle('');
                  setNewMovieYear('');
                  setNewMovieGenre('');
                }}
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white px-3 py-2 rounded transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowCreateForm(true)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-black px-4 py-2 rounded transition-colors font-bold cursor-pointer"
          >
            + Add Movie
          </button>
        )}
      </div>
      
      <UserProfile user={user} onLogout={onLogout} />
    </div>
  );
}
