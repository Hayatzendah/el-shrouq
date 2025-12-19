<?php
/**
 * Get All Categories API
 * GET /api/categories/read.php
 */

include_once '../config/cors.php';
include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

try {
    $query = "SELECT
                id,
                name,
                slug,
                display_order as `order`,
                is_visible,
                color_hex
              FROM categories
              WHERE is_visible = 1
              ORDER BY display_order ASC";

    $stmt = $db->prepare($query);
    $stmt->execute();

    $categories = [];

    while ($row = $stmt->fetch()) {
        $category = [
            'id' => (string)$row['id'],
            'name' => $row['name'],
            'slug' => $row['slug'],
            'order' => (int)$row['order'],
            'isVisible' => (bool)$row['is_visible'],
            'colorHex' => $row['color_hex']
        ];

        $categories[] = $category;
    }

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'data' => $categories,
        'count' => count($categories)
    ]);

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to fetch categories',
        'error' => $e->getMessage()
    ]);
}
