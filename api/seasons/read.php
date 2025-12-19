<?php
/**
 * Get All Seasons API
 * GET /api/seasons/read.php
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
                start_month,
                end_month
              FROM seasons
              WHERE is_visible = 1
              ORDER BY display_order ASC";

    $stmt = $db->prepare($query);
    $stmt->execute();

    $seasons = [];

    while ($row = $stmt->fetch()) {
        $season = [
            'id' => (string)$row['id'],
            'name' => $row['name'],
            'slug' => $row['slug'],
            'order' => (int)$row['order'],
            'isVisible' => (bool)$row['is_visible'],
            'startMonth' => $row['start_month'],
            'endMonth' => $row['end_month']
        ];

        $seasons[] = $season;
    }

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'data' => $seasons,
        'count' => count($seasons)
    ]);

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to fetch seasons',
        'error' => $e->getMessage()
    ]);
}
