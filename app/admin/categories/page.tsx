'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  generateSlug,
} from '@/lib/firestore';
import { Category } from '@/lib/types';

const CATEGORY_COLORS: Record<string, string> = {
  Vegetables: '#465C1B',
  Fruits: '#CB6A0F',
  Citrus: '#D79B3F',
  'Medicinal Plants': '#6B5B95',
  Frozen: '#254551',
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    name: '' as 'Vegetables' | 'Fruits' | 'Citrus' | 'Medicinal Plants' | 'Frozen' | '',
    order: 0,
    isVisible: true,
    colorHex: '#254551',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('Error loading categories');
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setEditingCategory(null);
    setFormData({
      name: '',
      order: categories.length + 1,
      isVisible: true,
      colorHex: '#254551',
    });
    setShowModal(true);
  }

  function openEditModal(category: Category) {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      order: category.order,
      isVisible: category.isVisible,
      colorHex: category.colorHex,
    });
    setShowModal(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name) {
      alert('Please select a category name');
      return;
    }

    setLoading(true);

    try {
      const categoryData = {
        name: formData.name as 'Vegetables' | 'Fruits' | 'Citrus' | 'Medicinal Plants' | 'Frozen',
        slug: generateSlug(formData.name),
        order: formData.order,
        isVisible: formData.isVisible,
        colorHex: formData.colorHex,
      };

      if (editingCategory?.id) {
        await updateCategory(editingCategory.id, categoryData);
        alert('Category updated successfully');
      } else {
        await createCategory(categoryData);
        alert('Category created successfully');
      }

      setShowModal(false);
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Error saving category');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this category? This may affect associated products.')) return;

    try {
      await deleteCategory(id);
      alert('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error deleting category');
    }
  }

  async function toggleVisibility(category: Category) {
    try {
      await updateCategory(category.id!, { isVisible: !category.isVisible });
      fetchCategories();
    } catch (error) {
      console.error('Error toggling visibility:', error);
      alert('Error toggling visibility');
    }
  }

  if (loading && categories.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal mx-auto mb-4"></div>
          <p className="text-neutral-text">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-teal mb-2">Categories</h1>
          <p className="text-neutral-text">Manage product categories</p>
        </div>
        <button onClick={openAddModal} className="btn-primary inline-flex items-center gap-2">
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {/* Categories Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-soft">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-brand-teal">Order</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-brand-teal">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-brand-teal">Color</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-brand-teal">Visible</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-brand-teal">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-border">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-neutral-soft/50">
                  <td className="px-6 py-4 text-neutral-text font-semibold">{category.order}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-brand-teal">{category.name}</div>
                    <div className="text-sm text-neutral-muted">{category.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg border border-neutral-border"
                        style={{ backgroundColor: category.colorHex }}
                      />
                      <span className="text-sm text-neutral-text font-mono">{category.colorHex}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleVisibility(category)}
                      className="p-2 hover:bg-neutral-soft rounded-lg transition-colors"
                    >
                      {category.isVisible ? (
                        <Eye className="text-brand-green" size={20} />
                      ) : (
                        <EyeOff className="text-neutral-muted" size={20} />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openEditModal(category)}
                        className="p-2 text-brand-orange hover:bg-brand-orange/10 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id!)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {categories.length === 0 && (
            <div className="text-center py-12 text-neutral-muted">No categories found</div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card max-w-md w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-brand-teal mb-6">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-text mb-2">Name *</label>
                  <select
                    required
                    value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value as 'Vegetables' | 'Fruits' | 'Citrus' | 'Medicinal Plants' | 'Frozen';
                      setFormData({
                        ...formData,
                        name,
                        colorHex: CATEGORY_COLORS[name] || '#254551',
                      });
                    }}
                    className="w-full px-4 py-2 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  >
                    <option value="">Select category</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Citrus">Citrus</option>
                    <option value="Medicinal Plants">Medicinal Plants</option>
                    <option value="Frozen">Frozen</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-text mb-2">Order *</label>
                  <input
                    type="number"
                    required
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-text mb-2">Color *</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.colorHex}
                      onChange={(e) => setFormData({ ...formData, colorHex: e.target.value })}
                      className="w-16 h-10 border border-neutral-border rounded-xl cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.colorHex}
                      onChange={(e) => setFormData({ ...formData, colorHex: e.target.value })}
                      className="flex-1 px-4 py-2 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal font-mono"
                    />
                  </div>
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
                  <button type="submit" disabled={loading} className="btn-primary flex-1">
                    {loading ? 'Saving...' : 'Save Category'}
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
