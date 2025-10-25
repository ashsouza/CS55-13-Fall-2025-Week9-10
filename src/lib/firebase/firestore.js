import { generateFakeRecipesAndReviews } from "@/src/lib/fakeRecipes.js";

import {
  collection,
  onSnapshot,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  orderBy,
  Timestamp,
  runTransaction,
  where,
  addDoc,
  getFirestore,
} from "firebase/firestore";

import { db } from "@/src/lib/firebase/clientApp";

export async function updateRecipeImageReference(
  recipeId,
  publicImageUrl
) {
  const recipeRef = doc(collection(db, "recipes"), recipeId);
  if (recipeRef) {
    await updateDoc(recipeRef, { photo: publicImageUrl });
  }
}

const updateWithRating = async (
  transaction,
  docRef,
  newRatingDocument,
  review
) => {
  return;
};

export async function addReviewToRecipe(db, recipeId, review) {
  return;
}

function applyQueryFilters(q, { category, difficulty, sort }) {
  if (category) {
    q = query(q, where("category", "==", category));
  }
  if (difficulty) {
    q = query(q, where("difficulty", "==", difficulty.length));
  }
  if (sort === "Rating" || !sort) {
    q = query(q, orderBy("avgRating", "desc"));
  } else if (sort === "Review") {
    q = query(q, orderBy("numRatings", "desc"));
  }
  return q;
}

export async function getRecipes(db = db, filters = {}) {
  let q = query(collection(db, "recipes"));

  q = applyQueryFilters(q, filters);
  const results = await getDocs(q);
  return results.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
      // Only plain objects can be passed to Client Components from Server Components
      timestamp: doc.data().timestamp.toDate(),
    };
  });
}

export function getRecipesSnapshot(cb, filters = {}) {
  let q = query(collection(db, "recipes"));
  
  q = applyQueryFilters(q, filters);
  return onSnapshot(q, (querySnapshot) => {
    const results = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
        // Only plain objects can be passed to Client Components from Server Components
        timestamp: doc.data().timestamp.toDate(),
      };
    });
    cb(results);
  });
}

export async function getRecipeById(db, recipeId) {
  if (!recipeId) {
    console.log("Error: Invalid ID received: ", recipeId);
    return;
  }
  const docRef = doc(db, "recipes", recipeId);
  const docSnap = await getDoc(docRef);
  return {
    ...docSnap.data(),
    timestamp: docSnap.data().timestamp.toDate(),
  };
}

export function getRecipeSnapshotById(recipeId, cb) {
  return;
}

export async function getReviewsByRecipeId(db, recipeId) {
  if (!recipeId) {
    console.log("Error: Invalid recipeId received: ", recipeId);
    return;
  }

  const q = query(
    collection(db, "recipes", recipeId, "ratings"),
    orderBy("timestamp", "desc")
  );

  const results = await getDocs(q);
  return results.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
      // Only plain objects can be passed to Client Components from Server Components
      timestamp: doc.data().timestamp.toDate(),
    };
  });
}

export function getReviewsSnapshotByRecipeId(recipeId, cb) {
  if (!recipeId) {
    console.log("Error: Invalid recipeId received: ", recipeId);
    return;
  }

  const q = query(
    collection(db, "recipes", recipeId, "ratings"),
    orderBy("timestamp", "desc")
  );
  return onSnapshot(q, (querySnapshot) => {
    const results = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
        // Only plain objects can be passed to Client Components from Server Components
        timestamp: doc.data().timestamp.toDate(),
      };
    });
    cb(results);
  });
}

export async function addFakeRecipesAndReviews() {
  const data = await generateFakeRecipesAndReviews();
  for (const { recipeData, ratingsData } of data) {
    try {
      const docRef = await addDoc(
        collection(db, "recipes"),
        recipeData
      );

      for (const ratingData of ratingsData) {
        await addDoc(
          collection(db, "recipes", docRef.id, "ratings"),
          ratingData
        );
      }
    } catch (e) {
      console.log("There was an error adding the document");
      console.error("Error adding document: ", e);
    }
  }
}

// Add a new recipe to Firestore
export async function addNewRecipe(recipeData) {
  try {
    const recipeWithTimestamp = {
      ...recipeData,
      avgRating: 0,
      numRatings: 0,
      sumRating: 0,
      timestamp: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, "recipes"), recipeWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error("Error adding new recipe:", error);
    throw error;
  }
}

// Update an existing recipe
export async function updateRecipe(recipeId, updateData) {
  try {
    const recipeRef = doc(collection(db, "recipes"), recipeId);
    await updateDoc(recipeRef, updateData);
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw error;
  }
}
