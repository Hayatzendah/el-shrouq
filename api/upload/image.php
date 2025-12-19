<?php
/**
 * Image Upload API
 * POST /api/upload/image.php
 */

include_once '../config/cors.php';
include_once '../config/database.php';

// Maximum file size (5MB)
$max_file_size = 5 * 1024 * 1024;

// Allowed file types
$allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
    exit();
}

if (!isset($_FILES['image'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'No image file provided'
    ]);
    exit();
}

$file = $_FILES['image'];

// Check for upload errors
if ($file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Upload error: ' . $file['error']
    ]);
    exit();
}

// Validate file size
if ($file['size'] > $max_file_size) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'File size exceeds maximum allowed size (5MB)'
    ]);
    exit();
}

// Validate file type
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime_type = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mime_type, $allowed_types)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid file type. Allowed types: JPEG, PNG, WebP, GIF'
    ]);
    exit();
}

try {
    // Create uploads directory if it doesn't exist
    $upload_dir = __DIR__ . '/../../uploads/products/';
    if (!file_exists($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }

    // Generate unique filename
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = uniqid('product_') . '_' . time() . '.' . $extension;
    $filepath = $upload_dir . $filename;

    // Move uploaded file
    if (move_uploaded_file($file['tmp_name'], $filepath)) {
        // Return relative URL
        $url = '/uploads/products/' . $filename;

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Image uploaded successfully',
            'url' => $url,
            'filename' => $filename
        ]);
    } else {
        throw new Exception('Failed to move uploaded file');
    }

} catch(Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to upload image',
        'error' => $e->getMessage()
    ]);
}
