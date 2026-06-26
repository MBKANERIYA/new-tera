import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
  const [openId, setOpenId] = useState(1);

  const faqs = [
    {
      id: 1,
      question: "How do I list my commercial property on Teralease?",
      answer: "Listing your property is simple. Click on the 'Post Property' button in the header, create an account, and fill in the details of your industrial, warehouse, or commercial space. Once submitted, our team will verify the listing before it goes live."
    },
    {
      id: 2,
      question: "Is there a fee to search for properties?",
      answer: "No, searching for properties on Teralease is completely free for buyers and tenants. You can browse all our premium listings, use advanced filters, and contact agents without any subscription charges."
    },
    {
      id: 3,
      question: "What types of properties are listed on the platform?",
      answer: "Teralease specializes in commercial real estate. Our primary categories include Industrial Plots, Factory Sheds, Warehouse Spaces, Godowns, Commercial Office Spaces, Retail Shops, and Commercial Land in the Delhi NCR region."
    },
    {
      id: 4,
      question: "Are the property listings verified?",
      answer: "Yes, we have a stringent verification process. Our backend team verifies ownership and broker credentials before approving properties to ensure our platform maintains a high standard of trust and quality."
    },
    {
      id: 5,
      question: "How can I contact a property owner or broker?",
      answer: "When you find a property you are interested in, click 'View Property Details'. On the details page, you will find a 'Send Inquiry' form and a button to view the agent/owner's phone number directly."
    },
    {
      id: 6,
      question: "Can I edit my property listing after posting?",
      answer: "Yes. You can log into your User Dashboard, go to 'Manage Properties', and click the edit icon next to your listing. Any major changes might require a quick re-verification by our admin team."
    },
    {
      id: 7,
      question: "What is the difference between Lease and Sub-Lease?",
      answer: "A Lease is a direct rental agreement with the property owner. A Sub-Lease occurs when a current tenant rents out a portion or all of their leased space to a third party. Teralease supports both types of transactions."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#e0e0e0] py-3 px-4 text-sm text-[#333]">
        <div className="max-w-[1200px] mx-auto flex items-center">
          <Link to="/" className="text-black hover:underline font-medium">Home</Link>
          <span className="mx-2 text-[#999]">&gt;</span>
          <span className="text-[#666]">Frequently Asked Questions</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="w-full bg-[#111111] py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565651583091-a67b458db49b?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent"></div>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-semibold tracking-wide mb-4 backdrop-blur-sm">
            Support Center
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Frequently Asked <span className="text-[#B3BCC5]">Questions</span>
          </h1>
          <p className="text-gray-400 text-[15px] md:text-[17px] max-w-2xl leading-relaxed">
            Find answers to common questions about listing properties, searching for spaces, and managing your Teralease account.
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-[900px] mx-auto px-4 py-16 flex-1 w-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className="border-b border-gray-100 last:border-b-0"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none"
              >
                <span className={`text-[16px] font-medium ${openId === faq.id ? 'text-black' : 'text-[#444]'}`}>
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 ml-4 rounded-full p-1.5 transition-colors ${openId === faq.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {openId === faq.id ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openId === faq.id ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-[#666] text-[15px] leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support Banner */}
        <div className="mt-12 bg-[#2D3748] rounded-xl p-8 flex flex-col md:flex-row items-center justify-between text-white shadow-md">
          <div>
            <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
            <p className="text-gray-300 text-[14px]">Our support team is here to help you with your commercial real estate needs.</p>
          </div>
          <Link to="/contact-us" className="mt-4 md:mt-0 whitespace-nowrap bg-white text-black px-6 py-2.5 rounded-md font-semibold hover:bg-gray-100 transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
