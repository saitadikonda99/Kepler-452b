import { ref, getDownloadURL, getMetadata, listAll } from "firebase/storage";
import { storage } from "../../../firebase"; // Update this to your Firebase config path

export const fetchImages = async () => {
  const folderRef = ref(storage, "home/");

  try {
    const result = await listAll(folderRef);

    const imageList = await Promise.all(
      result.items.map(async (itemRef) => {
        try {
          const url = await getDownloadURL(itemRef);
          const metadata = await getMetadata(itemRef);
          const description = metadata.customMetadata?.description || null;
          return { url, description,};
        } catch (error) {
          console.warn(`Error fetching image ${itemRef.name}:`, error);
          return null; // Return null if there’s an error for this image
        }
      })
    );

    // Filter out null entries (in case some images were missing or caused errors)
    return imageList.filter(image => image !== null);
  } catch (error) {
    console.error("Error fetching images from Firebase:", error);
    throw error;
  }
};