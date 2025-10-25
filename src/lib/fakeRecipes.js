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

    const recipeIndex = randomNumberBetween(0, randomData.recipeNames.length - 1);
    const instructionIndex = recipeIndex;
    const ingredientIndex = recipeIndex;

    // Map recipe names to their correct categories
    const recipeCategoryMap = {
      // COOKIES
      "Chewy Molasses Cookies": "Cookies",
      "Peanut Blossoms": "Cookies",
      "Vanishing Oatmeal Cookies": "Cookies",
      "Peanut Butter Balls": "Cookies",
      "Chocolate Crackle Cookies": "Cookies",
      "Chewy Lemon Cookies": "Cookies",
      "Coconut Cranberry Chews": "Cookies",
      
      // CAKES
      "German's Sweet Chocolate Cake": "Cakes",
      "Lemon Pound Cake": "Cakes",
      "Carrot Cake": "Cakes",
      "Best-Ever Chocolate Cake": "Cakes",
      
      // PIES
      "Strawberry Rhubarb Pie": "Pies",
      "Good Ol' Fashioned Apple Pie": "Pies",
      "Perfect Pumpkin Pie": "Pies",
      
      // OTHER DESSERTS
      "Old-Fashioned Bread Pudding": "Other Desserts",
      "The Original Rice Krispies Treat": "Other Desserts",
      
      // BREADS
      "Banana Bread": "Breads",
      "Zucchini Almond Bread": "Breads",
      "Irish Soda Bread": "Breads",
    };

    const recipeData = {
      category: recipeCategoryMap[randomData.recipeNames[recipeIndex]] || "Other Desserts",
      name: randomData.recipeNames[recipeIndex],
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
