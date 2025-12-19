<?php
/**
 * Update Product API
 * PUT /api/products/update.php
 */

include_once '../config/cors.php';
include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Validate required fields
if (empty($data->id)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Product ID is required'
    ]);
    exit();
}

try {
    $db->beginTransaction();

    // Build update query dynamically
    $updates = [];
    $params = [':id' => $data->id];

    if (isset($data->name_en)) {
        $updates[] = "name_en = :name_en";
        $params[':name_en'] = $data->name_en;
    }
    if (isset($data->name_fr)) {
        $updates[] = "name_fr = :name_fr";
        $params[':name_fr'] = $data->name_fr;
    }
    if (isset($data->slug)) {
        $updates[] = "slug = :slug";
        $params[':slug'] = $data->slug;
    }
    if (isset($data->category_id)) {
        $updates[] = "category_id = :category_id";
        $params[':category_id'] = $data->category_id;
    }
    if (isset($data->short_desc_en)) {
        $updates[] = "short_desc_en = :short_desc_en";
        $params[':short_desc_en'] = $data->short_desc_en;
    }
    if (isset($data->short_desc_fr)) {
        $updates[] = "short_desc_fr = :short_desc_fr";
        $params[':short_desc_fr'] = $data->short_desc_fr;
    }
    if (isset($data->varieties_en)) {
        $updates[] = "varieties_en = :varieties_en";
        $params[':varieties_en'] = json_encode($data->varieties_en);
    }
    if (isset($data->varieties_fr)) {
        $updates[] = "varieties_fr = :varieties_fr";
        $params[':varieties_fr'] = json_encode($data->varieties_fr);
    }
    if (isset($data->image)) {
        $updates[] = "image = :image";
        $params[':image'] = $data->image;
    }
    if (isset($data->gallery)) {
        $updates[] = "gallery = :gallery";
        $params[':gallery'] = json_encode($data->gallery);
    }
    if (isset($data->is_visible)) {
        $updates[] = "is_visible = :is_visible";
        $params[':is_visible'] = $data->is_visible ? 1 : 0;
    }
    if (isset($data->display_order)) {
        $updates[] = "display_order = :display_order";
        $params[':display_order'] = $data->display_order;
    }

    if (empty($updates)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'No fields to update'
        ]);
        exit();
    }

    // Update product
    $query = "UPDATE products SET " . implode(', ', $updates) . " WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->execute($params);

    // Update season relationships if provided
    if (isset($data->season_ids)) {
        // Delete existing relationships
        $deleteQuery = "DELETE FROM product_seasons WHERE product_id = ?";
        $deleteStmt = $db->prepare($deleteQuery);
        $deleteStmt->execute([$data->id]);

        // Insert new relationships
        if (is_array($data->season_ids) && !empty($data->season_ids)) {
            $seasonQuery = "INSERT INTO product_seasons (product_id, season_id) VALUES (?, ?)";
            $seasonStmt = $db->prepare($seasonQuery);

            foreach ($data->season_ids as $season_id) {
                $seasonStmt->execute([$data->id, $season_id]);
            }
        }
    }

    $db->commit();

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Product updated successfully'
    ]);

} catch(PDOException $e) {
    $db->rollBack();
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to update product',
        'error' => $e->getMessage()
    ]);
}
