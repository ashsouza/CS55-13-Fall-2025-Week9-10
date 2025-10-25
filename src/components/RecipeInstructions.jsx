import React from "react";

const RecipeInstructions = ({ recipe }) => {
  if (!recipe.ingredients || !recipe.instructions) {
    return null;
  }

  return (
    <div className="recipe__instructions">
      <div className="recipe__ingredients">
        <h3>Ingredients</h3>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="recipe__steps">
        <h3>Instructions</h3>
        <ol>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeInstructions;
