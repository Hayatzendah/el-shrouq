<?php
/**
 * Create Product API
 * POST /api/products/create.php
 */

include_once '../config/cors.php';
include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Validate required fields
if (
    empty($data->name_en) ||
    empty($data->name_fr) ||
    empty($data->slug) ||
    empty($data->category_id)
) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Missing required fields'
    ]);
    exit();
}

try {
    $db->beginTransaction();

    // Insert product
    $query = "INSERT INTO products SET
                name_en = :name_en,
                name_fr = :name_fr,
                slug = :slug,
                category_id = :category_id,
                short_desc_en = :short_desc_en,
                short_desc_fr = :short_desc_fr,
                varieties_en = :varieties_en,
                varieties_fr = :varieties_fr,
                image = :image,
                gallery = :gallery,
                is_visible = :is_visible,
                display_order = :display_order";

    $stmt = $db->prepare($query);

    // Bind values
    $stmt->bindParam(':name_en', $data->name_en);
    $stmt->bindParam(':name_fr', $data->name_fr);
    $stmt->bindParam(':slug', $data->slug);
    $stmt->bindParam(':category_id', $data->category_id);
    $stmt->bindParam(':short_desc_en', $data->short_desc_en);
    $stmt->bindParam(':short_desc_fr', $data->short_desc_fr);

    $varieties_en = isset($data->varieties_en) ? json_encode($data->varieties_en) : null;
    $varieties_fr = isset($data->varieties_fr) ? json_encode($data->varieties_fr) : null;
    $stmt->bindParam(':varieties_en', $varieties_en);
    $stmt->bindParam(':varieties_fr', $varieties_fr);

    $image = $data->image ?? null;
    $stmt->bindParam(':image', $image);

    $gallery = isset($data->gallery) ? json_encode($data->gallery) : null;
    $stmt->bindParam(':gallery', $gallery);

    $is_visible = $data->is_visible ?? true;
    $stmt->bindParam(':is_visible', $is_visible);

    $display_order = $data->display_order ?? 0;
    $stmt->bindParam(':display_order', $display_order);

    $stmt->execute();
    $product_id = $db->lastInsertId();

    // Insert season relationships
    if (isset($data->season_ids) && is_array($data->season_ids)) {
        $seasonQuery = "INSERT INTO product_seasons (product_id, season_id) VALUES (?, ?)";
        $seasonStmt = $db->prepare($seasonQuery);

        foreach ($data->season_ids as $season_id) {
            $seasonStmt->execute([$product_id, $season_id]);
        }
    }

    $db->commit();

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Product created successfully',
        'id' => (string)$product_id
    ]);

} catch(PDOException $e) {
    $db->rollBack();
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to create product',
        'error' => $e->getMessage()
    ]);
}
