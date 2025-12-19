/**
 * Storage API
 * This file provides Firebase Storage-compatible functions using PHP API backend
 */

import { uploadImage as phpUploadImage } from './phpApi';

/**
 * Upload image to server
 */
export async function uploadImage(file: File, path?: string): Promise<string> {
  return phpUploadImage(file);
}

/**
 * Delete image from server
 */
export async function deleteImage(url: string): Promise<void> {
  // TODO: Implement PHP API endpoint for image deletion
  console.warn('Image deletion not yet implemented in PHP API');
  // For now, we'll just log a warning
  // In a real implementation, this would call a PHP endpoint to delete the image
}

