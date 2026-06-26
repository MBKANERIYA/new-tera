import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RealEstateBlogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogs(data.slice(0, 4));
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching blogs:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="w-full bg-white py-16 px-4 border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <h2 className="text-center text-[28px] md:text-[32px] mb-12">
          <span className="text-[#707B87] font-normal">Explore Delhi NCR Real Estate</span>{' '}
          <span className="text-[#333] font-medium">Blogs</span>
        </h2>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-4 text-center py-10 text-gray-500">Loading blogs...</div>
          ) : blogs.map((blog) => (
            <div 
              key={blog._id} 
              onClick={() => navigate(`/blog/${blog._id}`)}
              className="bg-white border border-gray-200 rounded-[2px] overflow-hidden group cursor-pointer hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:border-gray-300 transition-all duration-300 flex flex-col"
            >
              
              {/* Image */}
              <div className="h-[180px] overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col border-t border-gray-100">
                <h3 className="text-[#333] font-semibold text-[15px] leading-snug mb-3 group-hover:text-black transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-500 text-[13px] leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Action Link */}
        <div className="text-center mt-10">
          <a href="#" className="text-black font-medium text-[15px] hover:underline inline-flex items-center">
            See all Blog <ArrowRight size={16} className="ml-1" />
          </a>
        </div>

      </div>
    </section>
  );
}
