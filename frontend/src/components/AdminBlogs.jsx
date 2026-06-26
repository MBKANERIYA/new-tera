import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Plus, X } from 'lucide-react';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '', author: '', category: '', date: '', image: '', excerpt: '', content: '', tags: ''
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await fetch('/api/blogs');
    const data = await res.json();
    setBlogs(data);
  };

  const handleOpenModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        ...blog,
        tags: blog.tags ? blog.tags.join(', ') : ''
      });
    } else {
      setEditingBlog(null);
      setFormData({ title: '', author: '', category: '', date: '', image: '', excerpt: '', content: '', tags: '' });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this blog?')) {
      await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      fetchBlogs();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    if (editingBlog) {
      await fetch(`/api/blogs/${editingBlog._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }
    setIsModalOpen(false);
    fetchBlogs();
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
        <h2 className="text-xl font-bold text-gray-800">Manage Blogs</h2>
        <button onClick={() => handleOpenModal()} className="bg-black text-white px-4 py-2 rounded flex items-center gap-2">
          <Plus size={16} /> Add Blog
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Author</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {blogs.map(blog => (
              <tr key={blog._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{blog.title}</td>
                <td className="px-4 py-3 text-gray-600">{blog.author}</td>
                <td className="px-4 py-3 text-gray-600">{blog.category}</td>
                <td className="px-4 py-3 text-gray-600">{blog.date}</td>
                <td className="px-4 py-3 flex gap-3">
                  <button onClick={() => handleOpenModal(blog)} className="text-blue-500 hover:text-blue-700"><Edit size={16}/></button>
                  <button onClick={() => handleDelete(blog._id)} className="text-red-500 hover:text-red-700"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-gray-500">No blogs found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg">{editingBlog ? 'Edit Blog' : 'Add Blog'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black"><X size={20}/></button>
            </div>
            <div className="p-4 overflow-y-auto">
              <form id="blogForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                    <input required type="text" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Author</label>
                    <input required type="text" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                    <input required type="text" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
                    <input required type="date" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Blog Image</label>
                  <div className="flex items-center gap-4">
                    {formData.image && (
                      <img src={formData.image} alt="Preview" className="h-16 w-16 object-cover rounded border border-gray-200" />
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
                  <label className="block text-xs font-medium text-gray-700 mb-1">Excerpt</label>
                  <textarea required rows="2" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Content (Markdown supported with ## for headers)</label>
                  <textarea required rows="6" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                  <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
                </div>
              </form>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">Cancel</button>
              <button type="submit" form="blogForm" disabled={isUploading} className="px-4 py-2 bg-black text-white rounded text-sm hover:bg-gray-800 disabled:opacity-50">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
