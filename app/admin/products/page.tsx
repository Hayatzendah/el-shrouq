'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Search, Upload, X } from 'lucide-react';
import {
  getProducts,
  getCategories,
  getSeasons,
  createProduct,
  updateProduct,
  deleteProduct,
  generateSlug,
} from '@/lib/firestore';
import { uploadImage } from '@/lib/storage';
import { Product, Category, Season } from '@/lib/types';
import Image from 'next/image';
import SeedButton from '@/components/SeedButton';
import { clearCache, CACHE_KEYS } from '@/lib/cache';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    seasonIds: [] as string[],
    shortDesc: '',
    varieties: '',
    image: '',
    isVisible: true,
    order: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // Disable cache for admin panel to always get fresh data
      const [productsData, categoriesData, seasonsData] = await Promise.all([
        getProducts(false), // useCache = false
        getCategories(false), // useCache = false
        getSeasons(false), // useCache = false
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
      setSeasons(seasonsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error loading data');
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setEditingProduct(null);
    // Set order to next available number
    const nextOrder = products.length > 0 
      ? Math.max(...products.map(p => p.order || 0)) + 1 
      : 1;
    setFormData({
      name: '',
      categoryId: '',
      seasonIds: [],
      shortDesc: '',
      varieties: '',
      image: '',
      isVisible: true,
      order: nextOrder,
    });
    setSelectedFile(null);
    setImagePreview('');
    setShowModal(true);
  }

  function openEditModal(product: Product) {
    setEditingProduct(product);
    const productName = typeof product.name === 'string' ? product.name : product.name.en || '';
    const productDesc = typeof product.shortDesc === 'string' ? product.shortDesc : product.shortDesc.en || '';
    const productVarieties = product.varieties
      ? product.varieties.map((v) => (typeof v === 'string' ? v : v.en || '')).join(', ')
      : '';
    
    setFormData({
      name: productName,
      categoryId: product.categoryId,
      seasonIds: product.seasonIds,
      shortDesc: productDesc,
      varieties: productVarieties,
      image: product.image,
      isVisible: product.isVisible,
      order: product.order || 0,
    });
    setSelectedFile(null);
    setImagePreview(product.image || '');
    setShowModal(true);
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function removeSelectedFile() {
    setSelectedFile(null);
    setImagePreview(editingProduct?.image || '');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setUploadingImage(true);

    try {
      let imageUrl = formData.image;

      // Upload new image if selected
      if (selectedFile) {
        try {
          imageUrl = await uploadImage(selectedFile, 'products');
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Failed to upload image. Please try again.');
          setUploadingImage(false);
          setLoading(false);
          return;
        }
      }

      // Validate that we have an image URL
      if (!imageUrl) {
        alert('Please upload an image or provide an image URL');
        setUploadingImage(false);
        setLoading(false);
        return;
      }

      const productData = {
        name: formData.name,
        slug: generateSlug(formData.name),
        categoryId: formData.categoryId,
        seasonIds: formData.seasonIds,
        shortDesc: formData.shortDesc,
        varieties: formData.varieties ? formData.varieties.split(',').map((v) => v.trim()) : [],
        image: imageUrl,
        isVisible: formData.isVisible,
        order: formData.order || 0,
      };

      if (editingProduct?.id) {
        await updateProduct(editingProduct.id, productData);
        alert('Product updated successfully');
      } else {
        await createProduct(productData);
        alert('Product created successfully');
      }

      // Clear cache to force refresh
      clearCache(CACHE_KEYS.VISIBLE_PRODUCTS);
      clearCache(CACHE_KEYS.PRODUCTS);

      setShowModal(false);
      setSelectedFile(null);
      setImagePreview('');
      fetchData();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product');
    } finally {
      setLoading(false);
      setUploadingImage(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await deleteProduct(id);
      // Clear cache to force refresh
      clearCache(CACHE_KEYS.VISIBLE_PRODUCTS);
      clearCache(CACHE_KEYS.PRODUCTS);
      alert('Product deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  }

  async function toggleVisibility(product: Product) {
    try {
      await updateProduct(product.id!, { isVisible: !product.isVisible });
      // Clear cache to force refresh
      clearCache(CACHE_KEYS.VISIBLE_PRODUCTS);
      clearCache(CACHE_KEYS.PRODUCTS);
      fetchData();
    } catch (error) {
      console.error('Error toggling visibility:', error);
      alert('Error toggling visibility');
    }
  }

  function handleSeasonToggle(seasonId: string) {
    setFormData((prev) => ({
      ...prev,
      seasonIds: prev.seasonIds.includes(seasonId)
        ? prev.seasonIds.filter((id) => id !== seasonId)
        : [...prev.seasonIds, seasonId],
    }));
  }

  const filteredProducts = products.filter((p) => {
    const name = typeof p.name === 'string' ? p.name : p.name.en || p.name.fr || '';
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal mx-auto mb-4"></div>
          <p className="text-neutral-text">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-teal mb-2">Products</h1>
          <p className="text-neutral-text">Manage your product catalog</p>
        </div>
        <div className="flex items-center gap-3">
          {products.length === 0 && <SeedButton />}
          <button onClick={openAddModal} className="btn-primary inline-flex items-center gap-2">
            <Plus size={20} />
            Add Product
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="card p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-muted" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-soft">
              <tr>
                <th className="px-6 py-4 text-center text-sm font-semibold text-brand-teal">Order</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-brand-teal">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-brand-teal">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-brand-teal">Seasons</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-brand-teal">Visible</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-brand-teal">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-border">
              {filteredProducts.map((product) => {
                const category = categories.find((c) => c.id === product.categoryId);
                const productSeasons = seasons.filter((s) => product.seasonIds.includes(s.id || ''));

                return (
                  <tr key={product.id} className="hover:bg-neutral-soft/50">
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-teal/10 text-brand-teal font-bold">
                        {product.order || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-brand-teal">
                        {typeof product.name === 'string' ? product.name : product.name.en || product.name.fr || 'N/A'}
                      </div>
                      <div className="text-sm text-neutral-muted">{product.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-neutral-text">{category?.name || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {productSeasons.map((season) => (
                          <span
                            key={season.id}
                            className="chip bg-neutral-soft text-neutral-text border border-neutral-border text-xs"
                          >
                            {season.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => toggleVisibility(product)}
                        className="p-2 hover:bg-neutral-soft rounded-lg transition-colors"
                      >
                        {product.isVisible ? (
                          <Eye className="text-brand-green" size={20} />
                        ) : (
                          <EyeOff className="text-neutral-muted" size={20} />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-2 text-brand-orange hover:bg-brand-orange/10 rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id!)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-neutral-muted">No products found</div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-brand-teal mb-6">
                {editingProduct ? 'Edit Product' : 'Add Product'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-text mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-text mb-2">Category *</label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  >
                    <option value="">Select category</option>
                    {categories
                      .map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-text mb-2">Seasons *</label>
                  <div className="flex flex-wrap gap-2">
                    {seasons.map((season) => (
                      <label key={season.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.seasonIds.includes(season.id || '')}
                          onChange={() => handleSeasonToggle(season.id || '')}
                          className="rounded border-neutral-border"
                        />
                        <span className="text-sm text-neutral-text">{season.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-text mb-2">Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.shortDesc}
                    onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-text mb-2">
                    Varieties (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.varieties}
                    onChange={(e) => setFormData({ ...formData, varieties: e.target.value })}
                    placeholder="e.g., Type A, Type B, Type C"
                    className="w-full px-4 py-2 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-text mb-2">Product Image *</label>
                  
                  {/* File Upload */}
                  <div className="mb-4">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-border rounded-xl cursor-pointer hover:bg-neutral-soft transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-neutral-muted" />
                        <p className="mb-2 text-sm text-neutral-text">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-neutral-muted">PNG, JPG, GIF up to 5MB</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileSelect}
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="relative mb-4 w-full h-48 border border-neutral-border rounded-xl overflow-hidden bg-neutral-soft">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-contain"
                      />
                      {selectedFile && (
                        <button
                          type="button"
                          onClick={removeSelectedFile}
                          className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Manual URL Input (Optional) */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-neutral-text mb-2">
                      Or enter image URL manually
                    </label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => {
                        setFormData({ ...formData, image: e.target.value });
                        if (!selectedFile) {
                          setImagePreview(e.target.value);
                        }
                      }}
                      placeholder="https://example.com/image.jpg or /images/products/image.jpg"
                      className="w-full px-4 py-2 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal"
                      disabled={!!selectedFile || uploadingImage}
                    />
                  </div>

                  {uploadingImage && (
                    <div className="mt-2 text-sm text-brand-teal flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand-teal"></div>
                      Uploading image...
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-text mb-2">Display Order *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    placeholder="1, 2, 3, ..."
                  />
                  <p className="text-xs text-neutral-muted mt-1">Lower numbers appear first on the website</p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isVisible"
                    checked={formData.isVisible}
                    onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                    className="rounded border-neutral-border"
                  />
                  <label htmlFor="isVisible" className="text-sm font-medium text-neutral-text cursor-pointer">
                    Visible on website
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" disabled={loading || uploadingImage} className="btn-primary flex-1">
                    {uploadingImage ? 'Uploading...' : loading ? 'Saving...' : 'Save Product'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 border border-neutral-border rounded-2xl hover:bg-neutral-soft transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
