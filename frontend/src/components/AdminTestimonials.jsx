import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Plus, X } from 'lucide-react';

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', role: '', content: '', rating: 5, image: ''
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const res = await fetch('/api/testimonials');
    const data = await res.json();
    setTestimonials(data);
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name, role: item.role, content: item.content, rating: item.rating, image: item.image || ''
      });
    } else {
      setEditingItem(null);
      setFormData({ name: '', role: '', content: '', rating: 5, image: '' });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this testimonial?')) {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      fetchTestimonials();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await fetch(`/api/testimonials/${editingItem._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } else {
      await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    }
    setIsModalOpen(false);
    fetchTestimonials();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setFormData(prev => ({ ...prev, image: data.url }));
      } else {
        alert(data.message || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Manage Testimonials</h2>
        <button onClick={() => handleOpenModal()} className="bg-black text-white px-4 py-2 rounded flex items-center gap-2">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Rating</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {testimonials.map(item => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <img src={item.image || 'https://via.placeholder.com/40'} className="w-8 h-8 rounded-full object-cover" alt="" />
                    {item.name}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{item.role}</td>
                <td className="px-4 py-3 text-gray-600">{item.rating}/5</td>
                <td className="px-4 py-3 flex gap-3">
                  <button onClick={() => handleOpenModal(item)} className="text-blue-500 hover:text-blue-700"><Edit size={16}/></button>
                  <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 && (
              <tr>
                <td colSpan="4" className="px-4 py-8 text-center text-gray-500">No testimonials found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg">{editingItem ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black"><X size={20}/></button>
            </div>
            <div className="p-4 overflow-y-auto">
              <form id="testForm" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                  <input required type="text" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Role/Company</label>
                  <input required type="text" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Rating (1-5)</label>
                  <input required type="number" min="1" max="5" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.rating} onChange={e => setFormData({...formData, rating: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Author Image</label>
                  <div className="flex items-center gap-4">
                    {formData.image && (
                      <img src={formData.image} alt="Preview" className="h-12 w-12 object-cover rounded-full border border-gray-200" />
                    )}
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload} 
                      disabled={isUploading}
                      className="w-full border border-gray-300 rounded p-2 text-sm" 
                    />
                  </div>
                  {isUploading && <p className="text-xs text-blue-500 mt-1">Uploading...</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Testimonial Content</label>
                  <textarea required rows="4" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
                </div>
              </form>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">Cancel</button>
              <button type="submit" form="testForm" disabled={isUploading} className="px-4 py-2 bg-black text-white rounded text-sm hover:bg-gray-800 disabled:opacity-50">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
