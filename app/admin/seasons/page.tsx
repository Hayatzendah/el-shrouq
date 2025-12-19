'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { getSeasons, createSeason, updateSeason, deleteSeason, generateSlug } from '@/lib/firestore';
import { Season } from '@/lib/types';

export default function AdminSeasonsPage() {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSeason, setEditingSeason] = useState<Season | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    order: 0,
    isVisible: true,
    startMonth: undefined as number | undefined,
    endMonth: undefined as number | undefined,
  });

  useEffect(() => {
    fetchSeasons();
  }, []);

  async function fetchSeasons() {
    try {
      const data = await getSeasons();
      setSeasons(data);
    } catch (error) {
      console.error('Error fetching seasons:', error);
      alert('Error loading seasons');
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setEditingSeason(null);
    setFormData({
      name: '',
      order: seasons.length + 1,
      isVisible: true,
      startMonth: undefined,
      endMonth: undefined,
    });
    setShowModal(true);
  }

  function openEditModal(season: Season) {
    setEditingSeason(season);
    setFormData({
      name: season.name,
      order: season.order,
      isVisible: season.isVisible,
      startMonth: season.startMonth,
      endMonth: season.endMonth,
    });
    setShowModal(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const seasonData = {
        name: formData.name,
        slug: generateSlug(formData.name),
        order: formData.order,
        isVisible: formData.isVisible,
        startMonth: formData.startMonth,
        endMonth: formData.endMonth,
      };

      if (editingSeason?.id) {
        await updateSeason(editingSeason.id, seasonData);
        alert('Season updated successfully');
      } else {
        await createSeason(seasonData);
        alert('Season created successfully');
      }

      setShowModal(false);
      fetchSeasons();
    } catch (error) {
      console.error('Error saving season:', error);
      alert('Error saving season');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this season? This may affect associated products.')) return;

    try {
      await deleteSeason(id);
      alert('Season deleted successfully');
      fetchSeasons();
    } catch (error) {
      console.error('Error deleting season:', error);
      alert('Error deleting season');
    }
  }

  async function toggleVisibility(season: Season) {
    try {
      await updateSeason(season.id!, { isVisible: !season.isVisible });
      fetchSeasons();
    } catch (error) {
      console.error('Error toggling visibility:', error);
      alert('Error toggling visibility');
    }
  }

  if (loading && seasons.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal mx-auto mb-4"></div>
          <p className="text-neutral-text">Loading seasons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-teal mb-2">Seasons</h1>
          <p className="text-neutral-text">Manage seasonal availability</p>
        </div>
        <button onClick={openAddModal} className="btn-primary inline-flex items-center gap-2">
          <Plus size={20} />
          Add Season
        </button>
      </div>

      {/* Seasons Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-soft">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-brand-teal">Order</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-brand-teal">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-brand-teal">Period</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-brand-teal">Visible</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-brand-teal">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-border">
              {seasons.map((season) => (
                <tr key={season.id} className="hover:bg-neutral-soft/50">
                  <td className="px-6 py-4 text-neutral-text font-semibold">{season.order}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-brand-teal">{season.name}</div>
                    <div className="text-sm text-neutral-muted">{season.slug}</div>
                  </td>
                  <td className="px-6 py-4 text-neutral-text">
                    {season.startMonth && season.endMonth
                      ? `Month ${season.startMonth} - ${season.endMonth}`
                      : 'All Year'}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleVisibility(season)}
                      className="p-2 hover:bg-neutral-soft rounded-lg transition-colors"
                    >
                      {season.isVisible ? (
                        <Eye className="text-brand-green" size={20} />
                      ) : (
                        <EyeOff className="text-neutral-muted" size={20} />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openEditModal(season)}
                        className="p-2 text-brand-orange hover:bg-brand-orange/10 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(season.id!)}
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
          {seasons.length === 0 && (
            <div className="text-center py-12 text-neutral-muted">No seasons found</div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card max-w-md w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-brand-teal mb-6">
                {editingSeason ? 'Edit Season' : 'Add Season'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-text mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Winter, Spring"
                    className="w-full px-4 py-2 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  />
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-text mb-2">Start Month (1-12)</label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={formData.startMonth || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, startMonth: e.target.value ? parseInt(e.target.value) : undefined })
                      }
                      placeholder="Optional"
                      className="w-full px-4 py-2 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-text mb-2">End Month (1-12)</label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={formData.endMonth || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, endMonth: e.target.value ? parseInt(e.target.value) : undefined })
                      }
                      placeholder="Optional"
                      className="w-full px-4 py-2 border border-neutral-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal"
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
                    {loading ? 'Saving...' : 'Save Season'}
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
