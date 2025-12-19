<?php
/**
 * Get Single Product by Slug API
 * GET /api/products/read_single.php?slug=product-slug
 */

include_once '../config/cors.php';
include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

// Get slug from query parameter
$slug = isset($_GET['slug']) ? $_GET['slug'] : '';

if (empty($slug)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Slug parameter is required'
    ]);
    exit();
}

try {
    $query = "SELECT
                p.id,
                p.name_en,
                p.name_fr,
                p.slug,
                p.category_id,
                p.short_desc_en,
                p.short_desc_fr,
                p.varieties_en,
                p.varieties_fr,
                p.image,
                p.gallery,
                p.is_visible,
                p.display_order,
                p.created_at,
                p.updated_at,
                c.name as category_name,
                c.slug as category_slug,
                c.color_hex as category_color,
                GROUP_CONCAT(s.id) as season_ids,
                GROUP_CONCAT(s.name) as season_names
              FROM products p
              LEFT JOIN categories c ON p.category_id = c.id
              LEFT JOIN product_seasons ps ON p.id = ps.product_id
              LEFT JOIN seasons s ON ps.season_id = s.id
              WHERE p.slug = :slug
              GROUP BY p.id
              LIMIT 1";

    $stmt = $db->prepare($query);
    $stmt->bindParam(':slug', $slug);
    $stmt->execute();

    $row = $stmt->fetch();

    if ($row) {
        $product = [
            'id' => (string)$row['id'],
            'name' => [
                'en' => $row['name_en'],
                'fr' => $row['name_fr']
            ],
            'slug' => $row['slug'],
            'categoryId' => (string)$row['category_id'],
            'shortDesc' => [
                'en' => $row['short_desc_en'],
                'fr' => $row['short_desc_fr']
            ],
            'varieties' => [
                'en' => $row['varieties_en'] ? json_decode($row['varieties_en']) : [],
                'fr' => $row['varieties_fr'] ? json_decode($row['varieties_fr']) : []
            ],
            'image' => $row['image'],
            'gallery' => $row['gallery'] ? json_decode($row['gallery']) : [],
            'isVisible' => (bool)$row['is_visible'],
            'order' => (int)$row['display_order'],
            'seasonIds' => $row['season_ids'] ? explode(',', $row['season_ids']) : [],
            'category' => [
                'name' => $row['category_name'],
                'slug' => $row['category_slug'],
                'colorHex' => $row['category_color']
            ],
            'createdAt' => $row['created_at'],
            'updatedAt' => $row['updated_at']
        ];

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => $product
        ]);
    } else {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'Product not found'
        ]);
    }

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to fetch product',
        'error' => $e->getMessage()
    ]);
}
