import { useState } from 'react';
import ReviewList from './MessageList';
import ReviewForm from './MessageInput';

export default function MovieDetails({ movie, reviews, onAddReview, onEditReview, onDeleteReview, currentUser }) {
  const [editingReview, setEditingReview] = useState(null);

  if (!movie) {
    return (
      <div className="flex-1 flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-2xl text-gray-500">Select a movie to view reviews</h2>
        </div>
      </div>
    );
  }

  const handleAddOrUpdateReview = (reviewData) => {
    if (editingReview) {
      // Update existing review
      onEditReview(editingReview.id, {
        text: reviewData.text,
        rating: reviewData.rating
      });
      setEditingReview(null);
    } else {
      // Add new review
      onAddReview(reviewData);
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
  };

  return (
    <div className="flex-1 flex flex-col bg-black">
      {/* Movie Header */}
      <div className="bg-black border-b border-gray-800 p-6">
        <h2 className="text-3xl font-bold text-white mb-2">{movie.title}</h2>
        <div className="flex items-center gap-4 text-gray-400">
          <span>{movie.year}</span>
          <span>•</span>
          <span>{movie.genre}</span>
          <span>•</span>
          <span className="text-orange-500 font-bold text-lg">
            ⭐ {movie.averageRating.toFixed(1)} / 5.0
          </span>
          <span className="text-gray-500">({movie.reviewCount} reviews)</span>
        </div>
      </div>

      {/* Reviews */}
      <ReviewList 
        reviews={reviews} 
        currentUser={currentUser}
        onEditReview={handleEditReview}
        onDeleteReview={onDeleteReview}
      />

      {/* Review Form */}
      <ReviewForm 
        onAddReview={handleAddOrUpdateReview}
        editingReview={editingReview}
        onCancelEdit={handleCancelEdit}
      />
    </div>
  );
}
