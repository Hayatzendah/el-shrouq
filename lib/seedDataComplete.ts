import { createCategory, createSeason, createProduct } from './firestore';
import { MultilingualText } from './types';

// Product data with English and French translations
interface ProductData {
  name: MultilingualText;
  slug: string;
  categorySlug: string;
  seasonSlugs: string[];
  shortDesc: MultilingualText;
  varieties: MultilingualText[];
  image: string;
}

// All products from the images folder - updated with new products
const productsData: ProductData[] = [
  // CITRUS (5 products)
  {
    name: { en: 'Grapefruit', fr: 'Pamplemousse' },
    slug: 'grapefruit',
    categorySlug: 'citrus',
    seasonSlugs: ['winter', 'spring'],
    shortDesc: {
      en: 'Fresh, juicy grapefruit with a perfect balance of sweetness and tanginess. Rich in vitamin C and antioxidants.',
      fr: 'Pamplemousse frais et juteux avec un équilibre parfait entre douceur et acidité. Riche en vitamine C et antioxydants.',
    },
    varieties: [
      { en: 'Red Grapefruit', fr: 'Pamplemousse Rouge' },
      { en: 'White Grapefruit', fr: 'Pamplemousse Blanc' },
      { en: 'Pink Grapefruit', fr: 'Pamplemousse Rose' },
    ],
    image: '/images/product/Citrus/Grapefruit.jpg',
  },
  {
    name: { en: 'Green Lemon', fr: 'Citron Vert' },
    slug: 'green-lemon',
    categorySlug: 'citrus',
    seasonSlugs: ['all-year'],
    shortDesc: {
      en: 'Fresh green lemons with high juice content and strong aromatic flavor. Perfect for culinary and beverage use.',
      fr: 'Citrons verts frais à forte teneur en jus et saveur aromatique intense. Parfait pour usage culinaire et boissons.',
    },
    varieties: [
      { en: 'Key Lime', fr: 'Citron Vert Clé' },
      { en: 'Persian Lime', fr: 'Citron Vert Persan' },
    ],
    image: '/images/product/Citrus/Green lemon.jpg',
  },
  {
    name: { en: 'Navel Orange', fr: 'Orange Navel' },
    slug: 'navel-orange',
    categorySlug: 'citrus',
    seasonSlugs: ['winter', 'spring'],
    shortDesc: {
      en: 'Premium navel oranges with sweet, seedless flesh. Excellent for fresh consumption and juice production.',
      fr: 'Oranges navel premium à chair douce et sans pépins. Excellent pour consommation fraîche et production de jus.',
    },
    varieties: [
      { en: 'Washington Navel', fr: 'Navel Washington' },
      { en: 'Cara Cara', fr: 'Cara Cara' },
    ],
    image: '/images/product/Citrus/navel orange.jpg',
  },
  {
    name: { en: 'Valencia Orange', fr: 'Orange Valencia' },
    slug: 'valencia-orange',
    categorySlug: 'citrus',
    seasonSlugs: ['spring', 'summer'],
    shortDesc: {
      en: 'Juicy Valencia oranges ideal for fresh consumption and juice production. Known for their excellent flavor and high juice yield.',
      fr: 'Oranges Valencia juteuses idéales pour consommation fraîche et production de jus. Connues pour leur excellent goût et rendement élevé en jus.',
    },
    varieties: [
      { en: 'Valencia Late', fr: 'Valencia Tardive' },
      { en: 'Midknight Valencia', fr: 'Valencia Minuit' },
    ],
    image: '/images/product/Citrus/Valencia orange.jpg',
  },
  {
    name: { en: 'Yorka Lemon', fr: 'Citron Yorka' },
    slug: 'yorka-lemon',
    categorySlug: 'citrus',
    seasonSlugs: ['all-year'],
    shortDesc: {
      en: 'Premium Yorka lemons with high acidity and strong citrus aroma. Perfect for culinary and industrial applications.',
      fr: 'Citrons Yorka premium à haute acidité et arôme d\'agrumes intense. Parfait pour applications culinaires et industrielles.',
    },
    varieties: [
      { en: 'Yorka Classic', fr: 'Yorka Classique' },
    ],
    image: '/images/product/Citrus/YorkaLemon.jpg',
  },

  // FROZEN (7 products - updated with new ones)
  {
    name: { en: 'Frozen Broccoli', fr: 'Brocoli Surgelé' },
    slug: 'frozen-broccoli',
    categorySlug: 'frozen',
    seasonSlugs: ['all-year'],
    shortDesc: {
      en: 'IQF frozen broccoli florets maintaining fresh texture and nutritional value. Perfect for year-round availability.',
      fr: 'Brocolis surgelés IQF en fleurettes conservant texture fraîche et valeur nutritionnelle. Parfait pour disponibilité toute l\'année.',
    },
    varieties: [
      { en: 'Florets', fr: 'Fleurettes' },
      { en: 'Cuts', fr: 'Morceaux' },
    ],
    image: '/images/product/Frozen/Frozen broccoli.jpg',
  },
  {
    name: { en: 'Frozen Green Peas', fr: 'Petits Pois Surgelés' },
    slug: 'frozen-green-peas',
    categorySlug: 'frozen',
    seasonSlugs: ['all-year'],
    shortDesc: {
      en: 'Premium IQF frozen green peas with sweet flavor and tender texture. Quick frozen to preserve freshness.',
      fr: 'Petits pois verts surgelés IQF premium au goût sucré et texture tendre. Surgelés rapidement pour préserver la fraîcheur.',
    },
    varieties: [
      { en: 'Extra Fine', fr: 'Extra Fins' },
      { en: 'Standard', fr: 'Standard' },
    ],
    image: '/images/product/Frozen/frozen green peas.jpg',
  },
  {
    name: { en: 'Frozen Mango', fr: 'Mangue Surgelée' },
    slug: 'frozen-mango',
    categorySlug: 'frozen',
    seasonSlugs: ['all-year'],
    shortDesc: {
      en: 'IQF frozen mango chunks maintaining fresh flavor and nutritional value. Perfect for smoothies, desserts, and year-round availability.',
      fr: 'Morceaux de mangue surgelés IQF conservant saveur fraîche et valeur nutritionnelle. Parfait pour smoothies, desserts et disponibilité toute l\'année.',
    },
    varieties: [
      { en: 'Chunks', fr: 'Morceaux' },
      { en: 'Sliced', fr: 'En Tranches' },
    ],
    image: '/images/product/Frozen/Frozen Mango.jpg',
  },
  {
    name: { en: 'Frozen Mixed Vegetables', fr: 'Légumes Surgelés Mélangés' },
    slug: 'frozen-mixed-vegetables',
    categorySlug: 'frozen',
    seasonSlugs: ['all-year'],
    shortDesc: {
      en: 'IQF frozen mixed vegetables including peas, carrots, green beans, and corn. Convenient and nutritious blend.',
      fr: 'Légumes surgelés IQF mélangés incluant pois, carottes, haricots verts et maïs. Mélange pratique et nutritif.',
    },
    varieties: [
      { en: 'Classic Mix', fr: 'Mélange Classique' },
      { en: 'Premium Mix', fr: 'Mélange Premium' },
    ],
    image: '/images/product/Frozen/frozen mixed vegetables.jpg',
  },
  {
    name: { en: 'Frozen Peas and Carrots', fr: 'Pois et Carottes Surgelés' },
    slug: 'frozen-peas-carrots',
    categorySlug: 'frozen',
    seasonSlugs: ['all-year'],
    shortDesc: {
      en: 'IQF frozen peas and carrots blend. A classic combination maintaining color, flavor, and nutritional value.',
      fr: 'Mélange de pois et carottes surgelés IQF. Combinaison classique conservant couleur, saveur et valeur nutritionnelle.',
    },
    varieties: [
      { en: 'Standard Blend', fr: 'Mélange Standard' },
    ],
    image: '/images/product/Frozen/frozen Peas and carrots.jpg',
  },
  {
    name: { en: 'Frozen Potatoes', fr: 'Pommes de Terre Surgelées' },
    slug: 'frozen-potatoes',
    categorySlug: 'frozen',
    seasonSlugs: ['all-year'],
    shortDesc: {
      en: 'IQF frozen potatoes in various cuts. Ready to use for fries, hash browns, and other applications.',
      fr: 'Pommes de terre surgelées IQF en diverses tailles. Prêtes à l\'emploi pour frites, röstis et autres applications.',
    },
    varieties: [
      { en: 'French Fries', fr: 'Frites' },
      { en: 'Hash Browns', fr: 'Röstis' },
      { en: 'Diced', fr: 'En Dés' },
    ],
    image: '/images/product/Frozen/frozen potatoes.jpg',
  },
  {
    name: { en: 'Frozen Strawberries', fr: 'Fraises Surgelées' },
    slug: 'frozen-strawberries',
    categorySlug: 'frozen',
    seasonSlugs: ['all-year'],
    shortDesc: {
      en: 'IQF frozen strawberries maintaining fresh flavor and nutritional value. Perfect for smoothies, desserts, and year-round availability.',
      fr: 'Fraises surgelées IQF conservant saveur fraîche et valeur nutritionnelle. Parfaites pour smoothies, desserts et disponibilité toute l\'année.',
    },
    varieties: [
      { en: 'Whole', fr: 'Entières' },
      { en: 'Sliced', fr: 'En Tranches' },
    ],
    image: '/images/product/Frozen/frozen strawberries.jpg',
  },

  // FRUITS (13 products)
  {
    name: { en: 'Apricot', fr: 'Abricot' },
    slug: 'apricot',
    categorySlug: 'fruits',
    seasonSlugs: ['spring', 'summer'],
    shortDesc: {
      en: 'Sweet and aromatic apricots with tender flesh. Rich in vitamins A and C, perfect for fresh consumption.',
      fr: 'Abricots doux et aromatiques à chair tendre. Riches en vitamines A et C, parfaits pour consommation fraîche.',
    },
    varieties: [
      { en: 'Royal', fr: 'Royal' },
      { en: 'Blenheim', fr: 'Blenheim' },
    ],
    image: '/images/product/Fruits/apricot.jpg',
  },
  {
    name: { en: 'Banana', fr: 'Banane' },
    slug: 'banana',
    categorySlug: 'fruits',
    seasonSlugs: ['all-year'],
    shortDesc: {
      en: 'Premium bananas with perfect ripeness. Rich in potassium and natural sugars. Excellent for fresh consumption.',
      fr: 'Bananes premium à maturité parfaite. Riches en potassium et sucres naturels. Excellent pour consommation fraîche.',
    },
    varieties: [
      { en: 'Cavendish', fr: 'Cavendish' },
      { en: 'Grand Nain', fr: 'Grand Nain' },
    ],
    image: '/images/product/Fruits/banana.jpg',
  },
  {
    name: { en: 'Custard Apple', fr: 'Pomme Cannelle' },
    slug: 'custard-apple',
    categorySlug: 'fruits',
    seasonSlugs: ['autumn', 'winter'],
    shortDesc: {
      en: 'Exotic custard apple with creamy, sweet flesh. Unique flavor profile and rich in antioxidants.',
      fr: 'Pomme cannelle exotique à chair crémeuse et douce. Profil de saveur unique et riche en antioxydants.',
    },
    varieties: [
      { en: 'African Pride', fr: 'Fierté Africaine' },
    ],
    image: '/images/product/Fruits/Custard apple.jpg',
  },
  {
    name: { en: 'Dates', fr: 'Dattes' },
    slug: 'dates',
    categorySlug: 'fruits',
    seasonSlugs: ['autumn', 'winter'],
    shortDesc: {
      en: 'Premium Egyptian dates with natural sweetness. Rich in fiber, vitamins, and minerals. Perfect for snacking.',
      fr: 'Dattes égyptiennes premium à douceur naturelle. Riches en fibres, vitamines et minéraux. Parfaites pour grignotage.',
    },
    varieties: [
      { en: 'Medjool', fr: 'Medjool' },
      { en: 'Deglet Noor', fr: 'Deglet Noor' },
      { en: 'Barhi', fr: 'Barhi' },
    ],
    image: '/images/product/Fruits/dates.jpg',
  },
  {
    name: { en: 'Grapes', fr: 'Raisins' },
    slug: 'grapes',
    categorySlug: 'fruits',
    seasonSlugs: ['summer', 'autumn'],
    shortDesc: {
      en: 'Sweet and juicy Egyptian grapes. Perfect for fresh consumption, wine making, and juice production.',
      fr: 'Raisins égyptiens doux et juteux. Parfaits pour consommation fraîche, vinification et production de jus.',
    },
    varieties: [
      { en: 'Flame Seedless', fr: 'Flame Sans Pépins' },
      { en: 'Thompson Seedless', fr: 'Thompson Sans Pépins' },
      { en: 'Red Globe', fr: 'Globe Rouge' },
    ],
    image: '/images/product/Fruits/grapes.jpg',
  },
  {
    name: { en: 'Guava', fr: 'Goyave' },
    slug: 'guava',
    categorySlug: 'fruits',
    seasonSlugs: ['summer', 'autumn'],
    shortDesc: {
      en: 'Tropical guava with sweet, aromatic flesh. Rich in vitamin C and dietary fiber. Excellent for fresh consumption.',
      fr: 'Goyave tropicale à chair douce et aromatique. Riche en vitamine C et fibres alimentaires. Excellent pour consommation fraîche.',
    },
    varieties: [
      { en: 'White Guava', fr: 'Goyave Blanche' },
      { en: 'Pink Guava', fr: 'Goyave Rose' },
    ],
    image: '/images/product/Fruits/guava.jpg',
  },
  {
    name: { en: 'Mango', fr: 'Mangue' },
    slug: 'mango',
    categorySlug: 'fruits',
    seasonSlugs: ['summer'],
    shortDesc: {
      en: 'Premium Egyptian mangoes with sweet, juicy flesh. Known as the "king of fruits" for their exceptional flavor.',
      fr: 'Mangues égyptiennes premium à chair douce et juteuse. Surnommées "roi des fruits" pour leur saveur exceptionnelle.',
    },
    varieties: [
      { en: 'Keitt', fr: 'Keitt' },
      { en: 'Kent', fr: 'Kent' },
      { en: 'Tommy Atkins', fr: 'Tommy Atkins' },
    ],
    image: '/images/product/Fruits/Mango.jpg',
  },
  {
    name: { en: 'Melon', fr: 'Melon' },
    slug: 'melon',
    categorySlug: 'fruits',
    seasonSlugs: ['summer'],
    shortDesc: {
      en: 'Sweet and refreshing melons with high water content. Perfect for hot weather and healthy snacking.',
      fr: 'Melons doux et rafraîchissants à forte teneur en eau. Parfaits pour temps chaud et grignotage sain.',
    },
    varieties: [
      { en: 'Cantaloupe', fr: 'Cantaloup' },
      { en: 'Honeydew', fr: 'Melon Miel' },
      { en: 'Galia', fr: 'Galia' },
    ],
    image: '/images/product/Fruits/melon.jpg',
  },
  {
    name: { en: 'Peaches', fr: 'Pêches' },
    slug: 'peaches',
    categorySlug: 'fruits',
    seasonSlugs: ['summer'],
    shortDesc: {
      en: 'Juicy peaches with sweet, aromatic flesh. Rich in vitamins and antioxidants. Perfect for fresh consumption.',
      fr: 'Pêches juteuses à chair douce et aromatique. Riches en vitamines et antioxydants. Parfaites pour consommation fraîche.',
    },
    varieties: [
      { en: 'Yellow Peach', fr: 'Pêche Jaune' },
      { en: 'White Peach', fr: 'Pêche Blanche' },
    ],
    image: '/images/product/Fruits/Peaches.jpg',
  },
  {
    name: { en: 'Plum', fr: 'Prune' },
    slug: 'plum',
    categorySlug: 'fruits',
    seasonSlugs: ['summer'],
    shortDesc: {
      en: 'Sweet and tart plums with firm flesh. Rich in vitamins and fiber. Excellent for fresh consumption and processing.',
      fr: 'Prunes douces et acidulées à chair ferme. Riches en vitamines et fibres. Excellent pour consommation fraîche et transformation.',
    },
    varieties: [
      { en: 'Black Plum', fr: 'Prune Noire' },
      { en: 'Red Plum', fr: 'Prune Rouge' },
    ],
    image: '/images/product/Fruits/plum.jpg',
  },
  {
    name: { en: 'Pomegranate', fr: 'Grenade' },
    slug: 'pomegranate',
    categorySlug: 'fruits',
    seasonSlugs: ['autumn'],
    shortDesc: {
      en: 'Premium pomegranates with deep red arils. Rich in antioxidants and vitamin C. Known for their health benefits.',
      fr: 'Grenades premium à arilles rouge foncé. Riches en antioxydants et vitamine C. Connues pour leurs bienfaits santé.',
    },
    varieties: [
      { en: 'Wonderful', fr: 'Wonderful' },
      { en: 'Acco', fr: 'Acco' },
    ],
    image: '/images/product/Fruits/pomegranate.jpg',
  },
  {
    name: { en: 'Strawberry', fr: 'Fraise' },
    slug: 'strawberry',
    categorySlug: 'fruits',
    seasonSlugs: ['winter', 'spring'],
    shortDesc: {
      en: 'Sweet and aromatic strawberries with perfect ripeness. Rich in vitamin C and antioxidants. Carefully harvested and packed.',
      fr: 'Fraises douces et aromatiques à maturité parfaite. Riches en vitamine C et antioxydants. Récoltées et emballées avec soin.',
    },
    varieties: [
      { en: 'Festival', fr: 'Festival' },
      { en: 'Fortuna', fr: 'Fortuna' },
      { en: 'Florida', fr: 'Floride' },
    ],
    image: '/images/product/Fruits/Strawberry.jpg',
  },
  {
    name: { en: 'Watermelon', fr: 'Pastèque' },
    slug: 'watermelon',
    categorySlug: 'fruits',
    seasonSlugs: ['summer'],
    shortDesc: {
      en: 'Refreshing watermelons with sweet, juicy flesh. High water content makes them perfect for hot weather.',
      fr: 'Pastèques rafraîchissantes à chair douce et juteuse. Forte teneur en eau les rend parfaites pour temps chaud.',
    },
    varieties: [
      { en: 'Crimson Sweet', fr: 'Crimson Sweet' },
      { en: 'Sugar Baby', fr: 'Sugar Baby' },
    ],
    image: '/images/product/Fruits/watermelon.jpg',
  },

  // VEGETABLES (12 products)
  {
    name: { en: 'Artichoke', fr: 'Artichaut' },
    slug: 'artichoke',
    categorySlug: 'vegetables',
    seasonSlugs: ['spring', 'summer'],
    shortDesc: {
      en: 'Fresh artichokes with tender hearts. Rich in fiber and antioxidants. Perfect for culinary applications.',
      fr: 'Artichauts frais à cœurs tendres. Riches en fibres et antioxydants. Parfaits pour applications culinaires.',
    },
    varieties: [
      { en: 'Green Globe', fr: 'Globe Vert' },
      { en: 'Purple Artichoke', fr: 'Artichaut Violet' },
    ],
    image: '/images/product/Vegetables/artichoke.jpg',
  },
  {
    name: { en: 'Cabbage', fr: 'Chou' },
    slug: 'cabbage',
    categorySlug: 'vegetables',
    seasonSlugs: ['winter', 'spring'],
    shortDesc: {
      en: 'Fresh cabbage with crisp leaves. Rich in vitamin K and fiber. Excellent for salads and cooking.',
      fr: 'Chou frais à feuilles croquantes. Riche en vitamine K et fibres. Excellent pour salades et cuisson.',
    },
    varieties: [
      { en: 'Green Cabbage', fr: 'Chou Vert' },
      { en: 'Red Cabbage', fr: 'Chou Rouge' },
    ],
    image: '/images/product/Vegetables/cabbage.jpg',
  },
  {
    name: { en: 'Carrot', fr: 'Carotte' },
    slug: 'carrot',
    categorySlug: 'vegetables',
    seasonSlugs: ['all-year'],
    shortDesc: {
      en: 'Fresh carrots with sweet flavor and crisp texture. Rich in beta-carotene and vitamin A. Perfect for fresh consumption and cooking.',
      fr: 'Carottes fraîches au goût sucré et texture croquante. Riches en bêta-carotène et vitamine A. Parfaites pour consommation fraîche et cuisson.',
    },
    varieties: [
      { en: 'Nantes', fr: 'Nantes' },
      { en: 'Imperator', fr: 'Imperator' },
    ],
    image: '/images/product/Vegetables/carrot.jpg',
  },
  {
    name: { en: 'Colored Pepper', fr: 'Poivron Coloré' },
    slug: 'colored-pepper',
    categorySlug: 'vegetables',
    seasonSlugs: ['spring', 'summer', 'autumn'],
    shortDesc: {
      en: 'Colorful bell peppers in red, yellow, green, and orange. Sweet flavor and crisp texture. Perfect for salads and cooking.',
      fr: 'Poivrons colorés en rouge, jaune, vert et orange. Goût doux et texture croquante. Parfaits pour salades et cuisson.',
    },
    varieties: [
      { en: 'Red', fr: 'Rouge' },
      { en: 'Yellow', fr: 'Jaune' },
      { en: 'Green', fr: 'Vert' },
      { en: 'Orange', fr: 'Orange' },
    ],
    image: '/images/product/Vegetables/Colored pepper.jpg',
  },
  {
    name: { en: 'Garlic', fr: 'Ail' },
    slug: 'garlic',
    categorySlug: 'vegetables',
    seasonSlugs: ['all-year'],
    shortDesc: {
      en: 'Premium garlic bulbs with strong flavor and aroma. Rich in allicin and antioxidants. Essential culinary ingredient.',
      fr: 'Bulbes d\'ail premium à saveur et arôme intenses. Riches en allicine et antioxydants. Ingrédient culinaire essentiel.',
    },
    varieties: [
      { en: 'White Garlic', fr: 'Ail Blanc' },
      { en: 'Purple Garlic', fr: 'Ail Violet' },
    ],
    image: '/images/product/Vegetables/garlic.jpg',
  },
  {
    name: { en: 'Iceberg Lettuce', fr: 'Laitue Iceberg' },
    slug: 'iceberg-lettuce',
    categorySlug: 'vegetables',
    seasonSlugs: ['spring', 'summer'],
    shortDesc: {
      en: 'Crisp iceberg lettuce with fresh, crunchy leaves. Perfect for salads and sandwiches. High water content.',
      fr: 'Laitue iceberg croquante à feuilles fraîches. Parfaite pour salades et sandwiches. Forte teneur en eau.',
    },
    varieties: [
      { en: 'Iceberg Classic', fr: 'Iceberg Classique' },
    ],
    image: '/images/product/Vegetables/Iceberg.jpg',
  },
  {
    name: { en: 'Onion', fr: 'Oignon' },
    slug: 'onion',
    categorySlug: 'vegetables',
    seasonSlugs: ['all-year'],
    shortDesc: {
      en: 'Fresh onions with excellent storage life. Rich flavor and aroma. Essential ingredient in many cuisines.',
      fr: 'Oignons frais à excellente durée de conservation. Saveur et arôme riches. Ingrédient essentiel dans de nombreuses cuisines.',
    },
    varieties: [
      { en: 'Yellow Onion', fr: 'Oignon Jaune' },
      { en: 'Red Onion', fr: 'Oignon Rouge' },
      { en: 'White Onion', fr: 'Oignon Blanc' },
    ],
    image: '/images/product/Vegetables/onion.jpg',
  },
  {
    name: { en: 'Potatoes', fr: 'Pommes de Terre' },
    slug: 'potatoes',
    categorySlug: 'vegetables',
    seasonSlugs: ['all-year'],
    shortDesc: {
      en: 'Premium Egyptian potatoes in various sizes and grades. Excellent for cooking, frying, and processing. High quality and long shelf life.',
      fr: 'Pommes de terre égyptiennes premium en diverses tailles et qualités. Excellent pour cuisson, friture et transformation. Haute qualité et longue durée de conservation.',
    },
    varieties: [
      { en: 'Spunta', fr: 'Spunta' },
      { en: 'Diamant', fr: 'Diamant' },
      { en: 'Hermes', fr: 'Hermès' },
    ],
    image: '/images/product/Vegetables/potatoes.jpg',
  },
  {
    name: { en: 'Sweet Potato', fr: 'Patate Douce' },
    slug: 'sweet-potato',
    categorySlug: 'vegetables',
    seasonSlugs: ['autumn', 'winter'],
    shortDesc: {
      en: 'Sweet potatoes with rich flavor and high nutritional value. Rich in beta-carotene, fiber, and vitamins.',
      fr: 'Patates douces au goût riche et haute valeur nutritionnelle. Riches en bêta-carotène, fibres et vitamines.',
    },
    varieties: [
      { en: 'Orange Flesh', fr: 'Chair Orange' },
      { en: 'Purple Flesh', fr: 'Chair Violette' },
    ],
    image: '/images/product/Vegetables/sweet potato.jpg',
  },
  {
    name: { en: 'Taro', fr: 'Taro' },
    slug: 'taro',
    categorySlug: 'vegetables',
    seasonSlugs: ['all-year'],
    shortDesc: {
      en: 'Fresh taro root with starchy texture. Rich in fiber and essential minerals. Used in various culinary applications.',
      fr: 'Racine de taro fraîche à texture féculente. Riche en fibres et minéraux essentiels. Utilisée dans diverses applications culinaires.',
    },
    varieties: [
      { en: 'Eddoe', fr: 'Eddoe' },
    ],
    image: '/images/product/Vegetables/Taro.jpg',
  },
  {
    name: { en: 'Tomato', fr: 'Tomate' },
    slug: 'tomato',
    categorySlug: 'vegetables',
    seasonSlugs: ['spring', 'summer', 'autumn'],
    shortDesc: {
      en: 'Fresh tomatoes with rich flavor and vibrant color. Rich in lycopene and vitamin C. Perfect for salads, cooking, and processing.',
      fr: 'Tomates fraîches au goût riche et couleur vive. Riches en lycopène et vitamine C. Parfaites pour salades, cuisson et transformation.',
    },
    varieties: [
      { en: 'Round Tomato', fr: 'Tomate Ronde' },
      { en: 'Cherry Tomato', fr: 'Tomate Cerise' },
      { en: 'Plum Tomato', fr: 'Tomate Prune' },
    ],
    image: '/images/product/Vegetables/tomato.jpg',
  },
  {
    name: { en: 'Yellow Onion', fr: 'Oignon Jaune' },
    slug: 'yellow-onion',
    categorySlug: 'vegetables',
    seasonSlugs: ['all-year'],
    shortDesc: {
      en: 'Premium yellow onions with excellent storage properties. Strong flavor and aroma. Ideal for cooking and processing.',
      fr: 'Oignons jaunes premium à excellentes propriétés de conservation. Saveur et arôme intenses. Idéaux pour cuisson et transformation.',
    },
    varieties: [
      { en: 'Yellow Globe', fr: 'Globe Jaune' },
    ],
    image: '/images/product/Vegetables/Yellow onion.jpg',
  },
];

export async function seedCompleteDatabase() {
  console.log('Starting complete database seed with all products...');

  try {
    // 1. Get or create categories
    console.log('Setting up categories...');
    const { getCategories, createCategory } = await import('./firestore');
    const existingCategories = await getCategories();
    
    const categoryMap = new Map<string, string>();
    
    // Create categories if they don't exist
    const categoryData = [
      { name: 'Vegetables' as const, slug: 'vegetables', order: 1, isVisible: true, colorHex: '#465C1B' },
      { name: 'Fruits' as const, slug: 'fruits', order: 2, isVisible: true, colorHex: '#CB6A0F' },
      { name: 'Citrus' as const, slug: 'citrus', order: 3, isVisible: true, colorHex: '#D79B3F' },
      { name: 'Medicinal Plants' as const, slug: 'medicinal-plants', order: 4, isVisible: true, colorHex: '#6B5B95' },
      { name: 'Frozen' as const, slug: 'frozen', order: 5, isVisible: true, colorHex: '#254551' },
    ];

    for (const catData of categoryData) {
      let categoryId = existingCategories.find((c) => c.slug === catData.slug)?.id;
      if (!categoryId) {
        categoryId = await createCategory(catData);
      }
      categoryMap.set(catData.slug, categoryId);
    }

    // 2. Get or create seasons
    console.log('Setting up seasons...');
    const { getSeasons, createSeason } = await import('./firestore');
    const existingSeasons = await getSeasons();
    
    const seasonMap = new Map<string, string>();
    
    const seasonData = [
      { name: 'Winter', slug: 'winter', order: 1, isVisible: true, startMonth: 12, endMonth: 2 },
      { name: 'Spring', slug: 'spring', order: 2, isVisible: true, startMonth: 3, endMonth: 5 },
      { name: 'Summer', slug: 'summer', order: 3, isVisible: true, startMonth: 6, endMonth: 8 },
      { name: 'Autumn', slug: 'autumn', order: 4, isVisible: true, startMonth: 9, endMonth: 11 },
      { name: 'All Year', slug: 'all-year', order: 5, isVisible: true },
    ];

    for (const seasonDataItem of seasonData) {
      let seasonId = existingSeasons.find((s) => s.slug === seasonDataItem.slug)?.id;
      if (!seasonId) {
        seasonId = await createSeason(seasonDataItem);
      }
      seasonMap.set(seasonDataItem.slug, seasonId);
    }

    // 3. Get existing products to check for updates
    console.log('Checking existing products...');
    const { getProducts, createProduct, updateProduct } = await import('./firestore');
    const existingProducts = await getProducts();
    const existingProductsBySlug = new Map(existingProducts.map((p) => [p.slug, p]));

    let created = 0;
    let updated = 0;
    let skipped = 0;
    let order = 1; // Start order from 1

    // 4. Create or update all products with order
    console.log('Creating/updating products with order numbers...');
    for (const productData of productsData) {
      const categoryId = categoryMap.get(productData.categorySlug);
      if (!categoryId) {
        console.error(`Category not found: ${productData.categorySlug}`);
        continue;
      }

      const seasonIds = productData.seasonSlugs
        .map((slug) => seasonMap.get(slug))
        .filter((id): id is string => id !== undefined);

      const productPayload = {
        name: productData.name,
        slug: productData.slug,
        categoryId,
        seasonIds,
        shortDesc: productData.shortDesc,
        varieties: productData.varieties,
        image: productData.image,
        isVisible: true,
        order, // Add order number
      };

      const existingProduct = existingProductsBySlug.get(productData.slug);
      
      if (existingProduct?.id) {
        // Update existing product (update image, order, and other fields)
        await updateProduct(existingProduct.id, productPayload);
        updated++;
        console.log(`Updated: ${productData.name.en} (Order: ${order})`);
      } else {
        // Create new product
        await createProduct(productPayload);
        created++;
        console.log(`Created: ${productData.name.en} (Order: ${order})`);
      }

      order++; // Increment order for next product
    }

    console.log(`✅ Complete database seeding finished!`);
    console.log(`   Created: ${created} products`);
    console.log(`   Updated: ${updated} products`);
    console.log(`   Total products: ${productsData.length}`);
    console.log(`   Order range: 1-${order - 1}`);

    return {
      success: true,
      counts: {
        categories: categoryMap.size,
        seasons: seasonMap.size,
        productsCreated: created,
        productsUpdated: updated,
        totalProducts: productsData.length,
        orderRange: `1-${order - 1}`,
      },
    };
  } catch (error) {
    console.error('❌ Error seeding complete database:', error);
    throw error;
  }
}
