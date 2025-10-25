import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { storage } from "@/src/lib/firebase/clientApp";

import { updateRecipeImageReference } from "@/src/lib/firebase/firestore";

// Upload recipe image to Firebase Storage
export async function updateRecipeImage(recipeId, image) {
  try {
    const publicImageUrl = await uploadImage(recipeId, image);
    await updateRecipeImageReference(recipeId, publicImageUrl);
    return publicImageUrl;
  } catch (error) {
    console.error("Error updating recipe image:", error);
    throw error;
  }
}

async function uploadImage(recipeId, image) {
  const imageRef = ref(storage, `recipe-images/${recipeId}/${image.name}`);
  
  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(imageRef, image);
    
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress tracking (optional)
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Upload failed:", error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
}
