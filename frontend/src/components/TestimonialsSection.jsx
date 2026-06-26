import React, { useState, useEffect } from 'react';
import { Quote, Star } from 'lucide-react';

export default function TestimonialsSection({ hideTitle = false }) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching testimonials:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="w-full bg-[#f8f9fa] py-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        
        {!hideTitle && (
          <h2 className="text-center text-[28px] md:text-[32px] mb-12">
            <span className="text-[#707B87] font-normal">What Our Clients</span>{' '}
            <span className="text-[#333] font-medium">Say</span>
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-3 text-center py-10 text-gray-500">Loading testimonials...</div>
          ) : testimonials.map((testimonial) => (
            <div 
              key={testimonial._id} 
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group"
            >
              <div className="absolute top-6 right-6 text-gray-100 group-hover:text-gray-200 transition-colors">
                <Quote size={48} />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#f5a623] text-[#f5a623]" />
                ))}
              </div>

              <p className="text-[#444] text-[15px] leading-relaxed mb-8 relative z-10 italic">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4 mt-auto border-t border-gray-50 pt-6">
                <img 
                  src={testimonial.image || 'https://via.placeholder.com/150'} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                />
                <div>
                  <h4 className="text-[#111] font-bold text-[15px]">{testimonial.name}</h4>
                  <p className="text-gray-500 text-[13px]">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
