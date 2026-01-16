import { useEffect, useRef } from 'react';

export default function ReviewList({ reviews }) {
  const reviewsEndRef = useRef(null);

  const scrollToBottom = () => {
    reviewsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [reviews]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {reviews.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No reviews yet. Be the first to review this movie!
        </div>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-black font-bold">
                  {review.author[0].toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-white">{review.author}</div>
                  <div className="text-xs text-gray-500">{review.timestamp}</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-lg ${
                      star <= review.rating ? 'text-orange-500' : 'text-gray-700 opacity-30'
                    }`}
                  >
                    ⭐
                  </span>
                ))}
                <span className="ml-1 text-orange-500 font-bold">{review.rating}/5</span>
              </div>
            </div>
            <p className="text-gray-300">{review.text}</p>
          </div>
        ))
      )}
      <div ref={reviewsEndRef} />
    </div>
  );
}
