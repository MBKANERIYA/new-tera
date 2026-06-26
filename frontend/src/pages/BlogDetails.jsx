import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch blog data
  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`/api/blogs/${id}`)
      .then(res => res.json())
      .then(data => {
        setBlog(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching blog:', err);
        setLoading(false);
      });
  }, [id]);

  // Convert markdown-style headers (##) to styled HTML elements
  const formatContent = (text) => {
    return text.split('\n\n').map((paragraph, index) => {
      if (paragraph.trim().startsWith('##')) {
        const title = paragraph.replace('##', '').trim();
        return (
          <h3 key={index} className="text-[#222] font-bold text-[18px] md:text-[20px] mt-8 mb-4">
            {title}
          </h3>
        );
      }
      return (
        <p key={index} className="text-[#555] text-[15px] leading-relaxed mb-5 text-justify">
          {paragraph.trim()}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f8f9fa] font-sans">
        <Header />
        <div className="flex-1 flex items-center justify-center text-gray-500">Loading blog details...</div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f8f9fa] font-sans">
        <Header />
        <div className="flex-1 flex items-center justify-center text-gray-500">Blog not found.</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] font-sans">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#e0e0e0] py-3 px-4 text-[13px] text-[#333]">
        <div className="max-w-[1200px] mx-auto flex items-center">
          <Link to="/" className="text-black hover:underline font-medium">Home</Link>
          <span className="mx-2 text-[#999]"><ChevronRight size={14}/></span>
          <Link to="/properties" className="text-black hover:underline font-medium">Blogs</Link>
          <span className="mx-2 text-[#999]"><ChevronRight size={14}/></span>
          <span className="text-[#666] truncate max-w-[200px] sm:max-w-none">{blog.title}</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto w-full px-4 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Main Content (Left Column) */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-md border border-gray-200 p-6 md:p-8">
            
            {/* Title & Meta */}
            <h1 className="text-[24px] md:text-[32px] font-bold text-[#111] leading-tight mb-4">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center text-[13px] text-gray-500 mb-6 gap-x-6 gap-y-2">
              <div>By : <span className="text-blue-600 font-medium">{blog.author}</span></div>
              <div>In : <span className="text-blue-600 font-medium">{blog.category}</span></div>
              <div>Last Updated : <span className="text-gray-700 font-medium">{new Date(blog.createdAt || blog.date).toLocaleDateString()}</span></div>
            </div>

            {/* Hero Image */}
            <div className="w-full h-[300px] md:h-[450px] overflow-hidden rounded-[2px] mb-8">
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="article-content">
              {formatContent(blog.content)}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mt-10 pt-6 border-t border-gray-100">
              {blog.tags && blog.tags.map((tag, idx) => (
                <Link 
                  key={idx} 
                  to="/properties" 
                  className="px-4 py-1.5 border border-gray-200 text-gray-600 text-[13px] hover:border-black hover:text-black transition-colors rounded-[2px]"
                >
                  {tag}
                </Link>
              ))}
            </div>

          </div>

          {/* Prev/Next Navigation */}
          <div className="flex justify-between items-center mt-6">
            <Link to="#" className="flex items-center text-[14px] text-[#444] font-medium border border-gray-300 bg-white px-5 py-2 hover:bg-gray-50 rounded-full transition-colors">
              <ArrowLeft size={16} className="mr-2" /> Previous Post
            </Link>
            <Link to="#" className="flex items-center text-[14px] text-[#444] font-medium border border-gray-300 bg-white px-5 py-2 hover:bg-gray-50 rounded-full transition-colors">
              Next Post <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>

        {/* Sidebar (Right Column) */}
        <div className="lg:w-[320px] flex-shrink-0 flex flex-col gap-6">
          
          {/* Post Property CTA */}
          <div className="bg-white rounded-md border border-gray-200 p-6 shadow-sm">
            <h3 className="text-[16px] text-[#333] mb-5 leading-snug">
              Want to <strong className="text-blue-600">Sell/Rent</strong> out your property for free?
            </h3>
            <Link 
              to="/post-property" 
              className="w-full flex items-center justify-center bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white transition-colors py-2.5 rounded-[3px] font-medium text-[14px]"
            >
              Post Property <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          {/* Search Property CTA */}
          <div className="bg-white rounded-md border border-gray-200 p-6 shadow-sm">
            <h3 className="text-[16px] text-[#333] mb-5 leading-snug">
              Looking to <strong className="text-blue-600">Buy/Rent</strong> Property?
            </h3>
            <Link 
              to="/properties" 
              className="w-full flex items-center justify-center bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white transition-colors py-2.5 rounded-[3px] font-medium text-[14px]"
            >
              Search Properties <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          {/* Quick Links Widget */}
          <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-[#111] text-white px-5 py-3 font-medium text-[15px]">
              Quick Links
            </div>
            
            {/* Widget Tabs */}
            <div className="flex text-[13px] font-medium border-b border-gray-200 bg-gray-50">
              <button className="flex-1 py-2.5 text-blue-600 bg-white border-r border-gray-200 border-t-2 border-t-blue-600">
                Property in Delhi
              </button>
              <button className="flex-1 py-2.5 text-gray-500 hover:text-black">
                Rental Property
              </button>
            </div>

            {/* Links List */}
            <div className="p-4 flex flex-col gap-3">
              {[
                'Industrial Plot in Delhi', 
                'Warehouse in Noida', 
                'Office Space in Gurgaon', 
                'Commercial Shop in Faridabad'
              ].map((link, i) => (
                <Link 
                  key={i} 
                  to="/properties" 
                  className="flex items-center justify-between text-[13.5px] text-gray-600 border border-gray-200 p-2.5 rounded hover:border-black hover:text-black transition-colors"
                >
                  {link} <ChevronRight size={14} className="text-gray-400" />
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}
