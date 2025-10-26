// This component shows recipe metadata, and offers some actions to the user like uploading a new recipe image, and adding a review.

import React from "react";
import renderStars from "@/src/components/Stars.jsx";
import RecipeInstructions from "@/src/components/RecipeInstructions.jsx";

const RecipeDetails = ({
  recipe,
  userId,
  handleRecipeImage,
  setIsOpen,
  isOpen,
  children,
}) => {
  return (
    <>
      <section className="img__section">
        <img src={recipe.photo} alt={recipe.name} />

        <div className="actions">
          {userId && (
            <img
              alt="review"
              className="review"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              src="/review.svg"
            />
          )}
          <label
            onChange={(event) => handleRecipeImage(event.target)}
            htmlFor="upload-image"
            className="add"
          >
            <input
              name=""
              type="file"
              id="upload-image"
              className="file-input hidden w-full h-full"
            />

            <img className="add-image" src="/add.svg" alt="Add image" />
          </label>
        </div>

        <div className="details__container">
          <div className="details">
            <h2>{recipe.name}</h2>

            <div className="recipe__rating">
              <ul>{renderStars(recipe.avgRating)}</ul>

              <span>({recipe.numRatings})</span>
            </div>

            <p>
              {recipe.category}
            </p>
            <p>
              {recipe.cookingTime} minutes | {recipe.servings} servings
            </p>
            <p>Difficulty: {"★".repeat(recipe.difficulty)}</p>
            {children}
          </div>
        </div>
      </section>
      
      <RecipeInstructions recipe={recipe} />
    </>
  );
};

export default RecipeDetails;
