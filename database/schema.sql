-- EL SHROUQ Database Schema
-- Run this in your Hostinger MySQL database

CREATE DATABASE IF NOT EXISTS el_shrouq CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE el_shrouq;

-- ==================== SEASONS TABLE ====================
CREATE TABLE IF NOT EXISTS seasons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    display_order INT DEFAULT 0,
    is_visible TINYINT(1) DEFAULT 1,
    start_month INT NULL,
    end_month INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_order (display_order),
    INDEX idx_visible (is_visible)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================== CATEGORIES TABLE ====================
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    display_order INT DEFAULT 0,
    is_visible TINYINT(1) DEFAULT 1,
    color_hex VARCHAR(7) NOT NULL DEFAULT '#22c55e',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_order (display_order),
    INDEX idx_visible (is_visible)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================== PRODUCTS TABLE ====================
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_en VARCHAR(200) NOT NULL,
    name_fr VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    category_id INT NOT NULL,
    short_desc_en TEXT,
    short_desc_fr TEXT,
    varieties_en JSON NULL,
    varieties_fr JSON NULL,
    image VARCHAR(500) NULL,
    gallery JSON NULL,
    is_visible TINYINT(1) DEFAULT 1,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    INDEX idx_slug (slug),
    INDEX idx_category (category_id),
    INDEX idx_order (display_order),
    INDEX idx_visible (is_visible)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================== PRODUCT_SEASONS (Many-to-Many) ====================
CREATE TABLE IF NOT EXISTS product_seasons (
    product_id INT NOT NULL,
    season_id INT NOT NULL,
    PRIMARY KEY (product_id, season_id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (season_id) REFERENCES seasons(id) ON DELETE CASCADE,
    INDEX idx_product (product_id),
    INDEX idx_season (season_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================== ADMIN USERS ====================
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================== SAMPLE DATA ====================

-- Insert default categories
INSERT INTO categories (name, slug, display_order, color_hex) VALUES
('Vegetables', 'vegetables', 1, '#22c55e'),
('Fruits', 'fruits', 2, '#f59e0b'),
('Citrus', 'citrus', 3, '#fb923c'),
('Medicinal Plants', 'medicinal-plants', 4, '#8b5cf6'),
('Frozen', 'frozen', 5, '#3b82f6');

-- Insert default seasons
INSERT INTO seasons (name, slug, display_order, start_month, end_month) VALUES
('Winter', 'winter', 1, 12, 2),
('Spring', 'spring', 2, 3, 5),
('Summer', 'summer', 3, 6, 8),
('Autumn', 'autumn', 4, 9, 11),
('All Year', 'all-year', 5, 1, 12);

-- Create default admin user (password: admin123)
-- Remember to change this password after first login!
INSERT INTO admin_users (email, password_hash, name) VALUES
('admin@el-shrouq.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin');
