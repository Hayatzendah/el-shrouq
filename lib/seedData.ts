import { createCategory, createSeason, createProduct } from './firestore';

export async function seedDatabase() {
  console.log('Starting database seed...');

  try {
    // 1. Create Categories
    console.log('Creating categories...');
    const categories = [
      { name: 'Vegetables' as const, slug: 'vegetables', order: 1, isVisible: true, colorHex: '#465C1B' },
      { name: 'Fruits' as const, slug: 'fruits', order: 2, isVisible: true, colorHex: '#CB6A0F' },
      { name: 'Citrus' as const, slug: 'citrus', order: 3, isVisible: true, colorHex: '#D79B3F' },
      { name: 'Medicinal Plants' as const, slug: 'medicinal-plants', order: 4, isVisible: true, colorHex: '#6B5B95' },
      { name: 'Frozen' as const, slug: 'frozen', order: 5, isVisible: true, colorHex: '#254551' },
    ];

    const categoryIds = await Promise.all(categories.map((cat) => createCategory(cat)));
    console.log('Categories created:', categoryIds.length);

    // 2. Create Seasons
    console.log('Creating seasons...');
    const seasons = [
      { name: 'Winter', slug: 'winter', order: 1, isVisible: true, startMonth: 12, endMonth: 2 },
      { name: 'Spring', slug: 'spring', order: 2, isVisible: true, startMonth: 3, endMonth: 5 },
      { name: 'Summer', slug: 'summer', order: 3, isVisible: true, startMonth: 6, endMonth: 8 },
      { name: 'Autumn', slug: 'autumn', order: 4, isVisible: true, startMonth: 9, endMonth: 11 },
      { name: 'All Year', slug: 'all-year', order: 5, isVisible: true },
    ];

    const seasonIds = await Promise.all(seasons.map((season) => createSeason(season)));
    console.log('Seasons created:', seasonIds.length);

    // 3. Create Sample Products
    console.log('Creating products...');
    const products = [
      {
        name: 'Fresh Potatoes',
        slug: 'fresh-potatoes',
        categoryId: categoryIds[0], // Vegetables
        seasonIds: [seasonIds[4]], // All Year
        shortDesc: 'Premium Egyptian potatoes, various sizes and grades available for export.',
        varieties: ['Spunta', 'Diamant', 'Hermes'],
        image: '/images/home/category-vegetables.jpg',
        isVisible: true,
      },
      {
        name: 'Red Onions',
        slug: 'red-onions',
        categoryId: categoryIds[0],
        seasonIds: [seasonIds[4]],
        shortDesc: 'High-quality red onions with excellent storage life and rich flavor.',
        varieties: ['Giza 6', 'Red Beheri'],
        image: '/images/home/category-vegetables.jpg',
        isVisible: true,
      },
      {
        name: 'Fresh Grapes',
        slug: 'fresh-grapes',
        categoryId: categoryIds[1], // Fruits
        seasonIds: [seasonIds[2]], // Summer
        shortDesc: 'Sweet and juicy Egyptian grapes, perfect for fresh consumption.',
        varieties: ['Superior', 'Flame Seedless', 'Thompson Seedless'],
        image: '/images/home/category-fruits.jpg',
        isVisible: true,
      },
      {
        name: 'Pomegranates',
        slug: 'pomegranates',
        categoryId: categoryIds[1],
        seasonIds: [seasonIds[3]], // Autumn
        shortDesc: 'Premium pomegranates with deep red color and sweet taste.',
        varieties: ['Wonderful', 'Acco'],
        image: '/images/home/category-fruits.jpg',
        isVisible: true,
      },
      {
        name: 'Valencia Oranges',
        slug: 'valencia-oranges',
        categoryId: categoryIds[2], // Citrus
        seasonIds: [seasonIds[1], seasonIds[2]], // Spring, Summer
        shortDesc: 'Juicy Valencia oranges, ideal for fresh consumption and juice production.',
        varieties: ['Valencia', 'Late Valencia'],
        image: '/images/home/category-citrus.jpg',
        isVisible: true,
      },
      {
        name: 'Lemons',
        slug: 'lemons',
        categoryId: categoryIds[2],
        seasonIds: [seasonIds[4]], // All Year
        shortDesc: 'Fresh Egyptian lemons with high juice content and excellent quality.',
        varieties: ['Eureka', 'Baladi'],
        image: '/images/home/category-citrus.jpg',
        isVisible: true,
      },
      {
        name: 'Medicinal Herbs',
        slug: 'medicinal-herbs',
        categoryId: categoryIds[3], // Medicinal Plants
        seasonIds: [seasonIds[1], seasonIds[2]], // Spring, Summer
        shortDesc: 'Premium medicinal herbs and plants with therapeutic properties.',
        varieties: ['Chamomile', 'Mint', 'Sage'],
        image: '/images/home/category-berries.jpg',
        isVisible: true,
      },
      {
        name: 'Frozen Mixed Vegetables',
        slug: 'frozen-mixed-vegetables',
        categoryId: categoryIds[4], // Frozen
        seasonIds: [seasonIds[4]], // All Year
        shortDesc: 'IQF mixed vegetables including peas, carrots, and green beans.',
        varieties: ['Standard Mix', 'Premium Mix'],
        image: '/images/home/category-frozen.jpg',
        isVisible: true,
      },
      {
        name: 'Frozen Strawberries',
        slug: 'frozen-strawberries',
        categoryId: categoryIds[4],
        seasonIds: [seasonIds[4]],
        shortDesc: 'IQF strawberries maintaining fresh flavor and nutritional value.',
        varieties: ['Whole', 'Sliced'],
        image: '/images/home/category-frozen.jpg',
        isVisible: true,
      },
      {
        name: 'Sweet Peppers',
        slug: 'sweet-peppers',
        categoryId: categoryIds[0],
        seasonIds: [seasonIds[1], seasonIds[2], seasonIds[3]], // Spring, Summer, Autumn
        shortDesc: 'Colorful bell peppers with excellent taste and quality.',
        varieties: ['Red', 'Yellow', 'Green', 'Orange'],
        image: '/images/home/category-vegetables.jpg',
        isVisible: true,
      },
    ];

    const productIds = await Promise.all(products.map((product) => createProduct(product)));
    console.log('Products created:', productIds.length);

    console.log('✅ Database seeding completed successfully!');
    return {
      success: true,
      counts: {
        categories: categoryIds.length,
        seasons: seasonIds.length,
        products: productIds.length,
      },
    };
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}
