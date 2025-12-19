import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseClient';

/**
 * Upload an image file to Firebase Storage
 * @param file - The file to upload
 * @param folder - The folder path in storage (e.g., 'products')
 * @returns The download URL of the uploaded image
 */
export async function uploadImage(file: File, folder: string = 'products'): Promise<string> {
  try {
    // Generate a unique filename
    const timestamp = Date.now();
    const fileName = `${folder}/${timestamp}_${file.name}`;
    
    // Create a reference to the file location
    const storageRef = ref(storage, fileName);
    
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
}

/**
 * Delete an image from Firebase Storage
 * @param url - The download URL of the image to delete
 */
export async function deleteImage(url: string): Promise<void> {
  try {
    // Only delete if it's a Firebase Storage URL
    if (!url.includes('firebasestorage.googleapis.com')) {
      return; // Not a Firebase Storage URL, skip deletion
    }

    // Extract the path from the URL
    // Firebase Storage URLs format: https://firebasestorage.googleapis.com/v0/b/{bucket}/o/{path}?alt=media&token={token}
    const urlObj = new URL(url);
    const pathMatch = urlObj.pathname.match(/\/o\/(.+)/);
    
    if (!pathMatch) {
      throw new Error('Invalid Firebase Storage URL');
    }
    
    const path = decodeURIComponent(pathMatch[1]);
    
    // Import deleteObject
    const { deleteObject } = await import('firebase/storage');
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    // Don't throw - deletion is not critical
  }
}

