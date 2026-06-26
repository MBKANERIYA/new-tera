import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Plus, X } from 'lucide-react';

export default function AdminAgents() {
  const [agents, setAgents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', location: '', logo: '', sale: 0, rent: 0, tags: '', moreTags: 0
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    const res = await fetch('/api/agents');
    const data = await res.json();
    setAgents(data);
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name, 
        location: item.location, 
        logo: item.logo || '', 
        sale: item.sale || 0, 
        rent: item.rent || 0, 
        tags: item.tags ? item.tags.join(', ') : '', 
        moreTags: item.moreTags || 0
      });
    } else {
      setEditingItem(null);
      setFormData({ name: '', location: '', logo: '', sale: 0, rent: 0, tags: '', moreTags: 0 });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this agent?')) {
      await fetch(`/api/agents/${id}`, { method: 'DELETE' });
      fetchAgents();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
    };

    if (editingItem) {
      await fetch(`/api/agents/${editingItem._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }
    setIsModalOpen(false);
    fetchAgents();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formUpload = new FormData();
    formUpload.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formUpload
      });
      const data = await res.json();
      if (res.ok) {
        setFormData(prev => ({ ...prev, logo: data.url }));
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
        <h2 className="text-xl font-bold text-gray-800">Manage Agents</h2>
        <button onClick={() => handleOpenModal()} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded flex items-center gap-2">
          <Plus size={16} /> Add Agent
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Stats</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {agents.map(item => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <img src={item.logo || 'https://via.placeholder.com/40'} className="w-8 h-8 rounded-full object-cover border border-gray-200" alt="" />
                    {item.name}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{item.location}</td>
                <td className="px-4 py-3 text-gray-600 text-xs">
                  {item.sale} Sale | {item.rent} Rent
                </td>
                <td className="px-4 py-3 flex gap-3">
                  <button onClick={() => handleOpenModal(item)} className="text-blue-500 hover:text-blue-700"><Edit size={16}/></button>
                  <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
            {agents.length === 0 && (
              <tr>
                <td colSpan="4" className="px-4 py-8 text-center text-gray-500">No agents found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center shrink-0">
              <h3 className="font-bold text-lg">{editingItem ? 'Edit Agent' : 'Add Agent'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black"><X size={20}/></button>
            </div>
            <div className="p-4 overflow-y-auto">
              <form id="agentForm" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Agent Name *</label>
                  <input required type="text" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Location *</label>
                  <input required type="text" className="w-full border border-gray-300 rounded p-2 text-sm" placeholder="e.g. Okhla Phase 1, Delhi NCR" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Sale Properties</label>
                    <input type="number" min="0" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.sale} onChange={e => setFormData({...formData, sale: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Rent Properties</label>
                    <input type="number" min="0" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.rent} onChange={e => setFormData({...formData, rent: Number(e.target.value)})} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                  <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm" placeholder="e.g. Sector 2, Okhla" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Additional Tags Count (e.g. +40)</label>
                  <input type="number" min="0" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.moreTags} onChange={e => setFormData({...formData, moreTags: Number(e.target.value)})} />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Logo URL or Upload</label>
                  <div className="flex gap-2 mb-2">
                    <input type="text" required className="flex-1 border border-gray-300 rounded p-2 text-sm" placeholder="https://..." value={formData.logo} onChange={e => setFormData({...formData, logo: e.target.value})} />
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="text-xs" />
                  {isUploading && <span className="text-xs text-blue-500 ml-2">Uploading...</span>}
                  {formData.logo && <img src={formData.logo} alt="Preview" className="h-10 w-10 object-cover mt-2 rounded border" />}
                </div>
              </form>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end gap-2 shrink-0">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm font-medium hover:bg-gray-50">Cancel</button>
              <button type="submit" form="agentForm" disabled={isUploading} className="px-4 py-2 bg-purple-600 rounded text-white text-sm font-medium hover:bg-purple-700 disabled:opacity-50">
                {editingItem ? 'Save Changes' : 'Create Agent'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
