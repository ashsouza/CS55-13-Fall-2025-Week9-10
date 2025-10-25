import { gemini20Flash, googleAI } from "@genkit-ai/googleai";
import { genkit } from "genkit";
import { getReviewsByRecipeId } from "@/src/lib/firebase/firestore.js";
import { getAuthenticatedAppForUser } from "@/src/lib/firebase/serverApp";
import { getFirestore } from "firebase/firestore";

export async function GeminiSummary({ recipeId }) {
  return (
    <div className="recipe__review_summary">
      <p>TODO: summarize reviews</p>
    </div>
  );
}

export function GeminiSummarySkeleton() {
  return (
    <div className="recipe__review_summary">
      <p>✨ Summarizing reviews with Gemini...</p>
    </div>
  );
}
