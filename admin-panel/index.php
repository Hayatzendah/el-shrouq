<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EL SHROUQ - لوحة التحكم</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    </style>
</head>
<body class="bg-gray-100">
    <div class="min-h-screen">
        <!-- Header -->
        <header class="bg-green-600 text-white shadow-lg">
            <div class="container mx-auto px-4 py-6">
                <h1 class="text-3xl font-bold">🌱 EL SHROUQ</h1>
                <p class="text-green-100">لوحة تحكم المنتجات</p>
            </div>
        </header>

        <!-- Main Content -->
        <main class="container mx-auto px-4 py-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <!-- Stats Cards -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm">إجمالي المنتجات</p>
                            <p class="text-3xl font-bold text-green-600" id="total-products">0</p>
                        </div>
                        <div class="text-4xl">📦</div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm">الفئات</p>
                            <p class="text-3xl font-bold text-blue-600" id="total-categories">0</p>
                        </div>
                        <div class="text-4xl">📂</div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm">المواسم</p>
                            <p class="text-3xl font-bold text-orange-600" id="total-seasons">0</p>
                        </div>
                        <div class="text-4xl">🌞</div>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 class="text-2xl font-bold mb-4">الإجراءات السريعة</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <a href="products.php" class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-center transition">
                        إدارة المنتجات
                    </a>
                    <a href="categories.php" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-center transition">
                        إدارة الفئات
                    </a>
                    <a href="seasons.php" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg text-center transition">
                        إدارة المواسم
                    </a>
                    <a href="../" target="_blank" class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg text-center transition">
                        عرض الموقع
                    </a>
                </div>
            </div>

            <!-- Recent Products -->
            <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-2xl font-bold mb-4">آخر المنتجات</h2>
                <div id="recent-products" class="space-y-4">
                    <p class="text-gray-500">جاري التحميل...</p>
                </div>
            </div>
        </main>
    </div>

    <script>
        const API_URL = '../api';

        // Load stats
        async function loadStats() {
            try {
                const [products, categories, seasons] = await Promise.all([
                    fetch(`${API_URL}/products/read.php`).then(r => r.json()),
                    fetch(`${API_URL}/categories/read.php`).then(r => r.json()),
                    fetch(`${API_URL}/seasons/read.php`).then(r => r.json())
                ]);

                document.getElementById('total-products').textContent = products.count || 0;
                document.getElementById('total-categories').textContent = categories.count || 0;
                document.getElementById('total-seasons').textContent = seasons.count || 0;

                // Display recent products
                if (products.data && products.data.length > 0) {
                    const recentProducts = products.data.slice(0, 5);
                    const html = recentProducts.map(p => `
                        <div class="flex items-center justify-between border-b pb-3">
                            <div class="flex items-center gap-4">
                                ${p.image ? `<img src="${p.image}" class="w-12 h-12 object-cover rounded" />` : '<div class="w-12 h-12 bg-gray-200 rounded"></div>'}
                                <div>
                                    <p class="font-semibold">${p.name.en}</p>
                                    <p class="text-sm text-gray-500">${p.category.name}</p>
                                </div>
                            </div>
                            <span class="px-3 py-1 rounded-full text-xs ${p.isVisible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                                ${p.isVisible ? 'مرئي' : 'مخفي'}
                            </span>
                        </div>
                    `).join('');
                    document.getElementById('recent-products').innerHTML = html;
                } else {
                    document.getElementById('recent-products').innerHTML = '<p class="text-gray-500">لا توجد منتجات بعد</p>';
                }
            } catch (error) {
                console.error('Error loading stats:', error);
            }
        }

        loadStats();
    </script>
</body>
</html>
