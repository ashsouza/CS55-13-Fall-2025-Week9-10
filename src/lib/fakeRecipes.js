import {
  randomNumberBetween,
  getRandomDateAfter,
  getRandomDateBefore,
} from "@/src/lib/utils.js";
import { randomData } from "@/src/lib/randomData.js";

import { Timestamp } from "firebase/firestore";

export async function generateFakeRecipesAndReviews() {
  const recipesToAdd = 5;
  const data = [];

  for (let i = 0; i < recipesToAdd; i++) {
    const recipeTimestamp = Timestamp.fromDate(getRandomDateBefore());

    const ratingsData = [];

    // Generate a random number of ratings/reviews for this recipe
    for (let j = 0; j < randomNumberBetween(0, 5); j++) {
      const ratingTimestamp = Timestamp.fromDate(
        getRandomDateAfter(recipeTimestamp.toDate())
      );

      const ratingData = {
        rating:
          randomData.recipeReviews[
            randomNumberBetween(0, randomData.recipeReviews.length - 1)
          ].rating,
        text: randomData.recipeReviews[
          randomNumberBetween(0, randomData.recipeReviews.length - 1)
        ].text,
        userId: `User #${randomNumberBetween()}`,
        timestamp: ratingTimestamp,
      };

      ratingsData.push(ratingData);
    }

    const avgRating = ratingsData.length
      ? ratingsData.reduce(
          (accumulator, currentValue) => accumulator + currentValue.rating,
          0
        ) / ratingsData.length
      : 0;

    const instructionIndex = randomNumberBetween(0, randomData.recipeInstructions.length - 1);
    const ingredientIndex = randomNumberBetween(0, randomData.recipeIngredients.length - 1);

    const recipeData = {
      category:
        randomData.recipeCategories[
          randomNumberBetween(0, randomData.recipeCategories.length - 1)
        ],
      name: randomData.recipeNames[
        randomNumberBetween(0, randomData.recipeNames.length - 1)
      ],
      avgRating,
      numRatings: ratingsData.length,
      sumRating: ratingsData.reduce(
        (accumulator, currentValue) => accumulator + currentValue.rating,
        0
      ),
      difficulty: randomNumberBetween(1, 4), // 1=Easy, 2=Medium, 3=Hard, 4=Expert
      cookingTime: randomNumberBetween(15, 180), // minutes
      servings: randomNumberBetween(2, 8),
      ingredients: randomData.recipeIngredients[ingredientIndex],
      instructions: randomData.recipeInstructions[instructionIndex],
      photo: `https://storage.googleapis.com/firestorequickstarts.appspot.com/food_${randomNumberBetween(
        1,
        22
      )}.png`,
      timestamp: recipeTimestamp,
    };

    data.push({
      recipeData,
      ratingsData,
    });
  }
  return data;
}
