import { useState, useEffect } from 'react';

export default function ReviewForm({ onAddReview, editingReview, onCancelEdit }) {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);

  // Update form when editingReview changes
  useEffect(() => {
    if (editingReview) {
      setReviewText(editingReview.text);
      setRating(editingReview.rating);
    } else {
      setReviewText('');
      setRating(5);
    }
  }, [editingReview]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewText.trim()) {
      onAddReview({
        text: reviewText,
        rating: rating,
        id: editingReview?.id
      });
      setReviewText('');
      setRating(5);
    }
  };

  const handleCancel = () => {
    setReviewText('');
    setRating(5);
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-800 p-4">
      {editingReview && (
        <div className="mb-3 px-4 py-2 bg-blue-900/30 border border-blue-600 rounded-lg text-blue-300 text-sm">
          Editing review
        </div>
      )}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <label className="text-white font-medium">Rating:</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl cursor-pointer ${
                  star <= rating ? 'text-orange-500' : 'text-gray-700 opacity-30'
                } hover:text-orange-400 transition-colors`}
              >
                ⭐
              </button>
            ))}
          </div>
          <span className="text-orange-500 font-bold">{rating}/5</span>
        </div>
        <div className="flex gap-2">
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
            className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            rows="3"
            required
          />
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={!reviewText.trim()}
              className="px-8 py-3 text-lg bg-orange-500 hover:bg-orange-600 disabled:bg-gray-900 disabled:cursor-not-allowed text-black disabled:text-gray-600 rounded-lg transition-colors font-bold cursor-pointer"
            >
              {editingReview ? 'Update' : 'Post Review'}
            </button>
            {editingReview && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-8 py-3 text-lg bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-bold cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
