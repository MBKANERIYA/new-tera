import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function RealEstateBlogs() {
  const blogs = [
    {
      id: 1,
      title: 'Delhi NCR Commercial Properties Under 5 Cr: Best Areas & Buying Guide',
      excerpt: 'The commercial real estate prices in Delhi NCR are known to be skyrocketing, and although it is...',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Tips to Lease your Warehouse in Delhi NCR in No Time',
      excerpt: 'Delhi NCR is rapidly becoming a logistics hub with its expanding infrastructure and rapid...',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c1590f?w=500&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Upcoming Industrial Corridors around Delhi NCR',
      excerpt: 'The expanding industrial corridors have transformed the way businesses operate within the National...',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Commercial Property Registration: Details, Documents, Process and Charges',
      excerpt: 'Purchasing a commercial space in India is regarded as a significant milestone, a kind of success tha...',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?w=500&h=300&fit=crop'
    }
  ];

  return (
    <section className="w-full bg-white py-16 px-4 border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <h2 className="text-center text-[28px] md:text-[32px] mb-12">
          <span className="text-[#c82021] font-normal">Explore Delhi NCR Real Estate</span>{' '}
          <span className="text-[#333] font-medium">Blogs</span>
        </h2>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <div 
              key={blog.id} 
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
                <h3 className="text-[#333] font-semibold text-[15px] leading-snug mb-3 group-hover:text-blue-600 transition-colors">
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
          <a href="#" className="text-blue-600 font-medium text-[15px] hover:underline inline-flex items-center">
            See all Blog <ArrowRight size={16} className="ml-1" />
          </a>
        </div>

      </div>
    </section>
  );
}
