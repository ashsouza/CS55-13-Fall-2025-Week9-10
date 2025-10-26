"use client";

import React, { useState, useEffect } from "react";
import { getReviewsSnapshotByRecipeId } from "@/src/lib/firebase/firestore.js";
import { Review } from "@/src/components/Reviews/Review";

export default function ReviewsListClient({
  initialReviews,
  recipeId,
  userId,
}) {
  const [reviews, setReviews] = useState(initialReviews);

  useEffect(() => {
    return getReviewsSnapshotByRecipeId(recipeId, (data) => {
      setReviews(data);
    });
  }, [recipeId]);
  return (
    <article>
      <h3 style={{ marginBottom: '20px', color: '#2c3e50', fontSize: '1.5em' }}>
        Reviews ({reviews.length})
      </h3>
      <ul className="reviews">
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <Review
                key={review.id}
                rating={review.rating}
                text={review.text}
                timestamp={review.timestamp}
              />
            ))}
          </ul>
        ) : (
          <p>
            This recipe has not been reviewed yet,{" "}
            {!userId ? "first login and then" : ""} add your own review!
          </p>
        )}
      </ul>
    </article>
  );
}
