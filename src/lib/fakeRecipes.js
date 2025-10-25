import {
  randomNumberBetween,
  getRandomDateAfter,
  getRandomDateBefore,
} from "@/src/lib/utils.js";
import { randomData } from "@/src/lib/randomData.js";

import { Timestamp } from "firebase/firestore";

export async function generateFakeRecipesAndReviews() {
  const data = [];

  // Map recipe names to their correct categories and indices
  const recipeCategoryMap = {
    // COOKIES
    "Chewy Molasses Cookies": { category: "Cookies", index: 0 },
    "Peanut Blossoms": { category: "Cookies", index: 1 },
    "Vanishing Oatmeal Cookies": { category: "Cookies", index: 2 },
    "Peanut Butter Balls": { category: "Cookies", index: 3 },
    "Chocolate Crackle Cookies": { category: "Cookies", index: 4 },
    "Chewy Lemon Cookies": { category: "Cookies", index: 5 },
    "Coconut Cranberry Chews": { category: "Cookies", index: 6 },
    
    // CAKES
    "German's Sweet Chocolate Cake": { category: "Cakes", index: 7 },
    "Lemon Pound Cake": { category: "Cakes", index: 8 },
    "Carrot Cake": { category: "Cakes", index: 9 },
    "Best-Ever Chocolate Cake": { category: "Cakes", index: 10 },
    
    // PIES
    "Strawberry Rhubarb Pie": { category: "Pies", index: 11 },
    "Good Ol' Fashioned Apple Pie": { category: "Pies", index: 12 },
    "Perfect Pumpkin Pie": { category: "Pies", index: 13 },
    
    // OTHER DESSERTS
    "Old-Fashioned Bread Pudding": { category: "Other Desserts", index: 14 },
    "The Original Rice Krispies Treat": { category: "Other Desserts", index: 15 },
    
    // BREADS
    "Banana Bread": { category: "Breads", index: 16 },
    "Zucchini Almond Bread": { category: "Breads", index: 17 },
    "Irish Soda Bread": { category: "Breads", index: 18 },
  };

  // Generate all recipes (not random selection)
  for (let i = 0; i < randomData.recipeNames.length; i++) {
    const recipeName = randomData.recipeNames[i];
    const recipeInfo = recipeCategoryMap[recipeName];
    
    if (!recipeInfo) continue; // Skip if recipe not found in map

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

    const recipeData = {
      category: recipeInfo.category,
      name: recipeName,
      avgRating,
      numRatings: ratingsData.length,
      sumRating: ratingsData.reduce(
        (accumulator, currentValue) => accumulator + currentValue.rating,
        0
      ),
      difficulty: randomNumberBetween(1, 4), // 1=Easy, 2=Medium, 3=Hard, 4=Expert
      cookingTime: randomNumberBetween(15, 180), // minutes
      servings: randomNumberBetween(2, 8),
      ingredients: randomData.recipeIngredients[recipeInfo.index],
      instructions: randomData.recipeInstructions[recipeInfo.index],
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
