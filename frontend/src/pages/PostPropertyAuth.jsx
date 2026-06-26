import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PostPropertyAuth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  
  useEffect(() => {
    const user = localStorage.getItem('property_user');
    if (user) {
      navigate('/user/dashboard');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    location: '',
    password: '',
    confirmPassword: '',
    userType: 'Owner',
    purpose: 'Sell'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleContinue = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      
      const payload = isLogin ? {
        loginId: formData.mobile || formData.email, // Use whichever is filled or handle better later
        password: formData.password
      } : formData;

      const response = await fetch(`${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Save user to localStorage
        localStorage.setItem('property_user', JSON.stringify(data.user));
        // Redirect to the user dashboard
        navigate('/user/dashboard');
      } else {
        setError(data.message || 'Authentication failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f6f9]">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-[1000px] w-full flex flex-col md:flex-row items-center gap-10 lg:gap-20">
          
          {/* Left Side Content */}
          <div className="flex-1 w-full md:max-w-[400px]">
            <h1 className="text-[32px] md:text-[38px] text-[#424242] leading-[1.2] mb-8 font-light">
              Sell or Rent Your Property <br/>
              Online for <span className="text-[#2a5b9e] font-medium">FREE!</span>
            </h1>

            <div className="space-y-4">
              {[
                'Advertise for FREE',
                'List Your Property in Minutes',
                'Zero Brokerage',
                'Get shortlisted Buyers & Tenants'
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-full px-5 py-3 shadow-sm w-max pr-10">
                  <div className="bg-[#2a5b9e] rounded-full w-5 h-5 flex items-center justify-center text-white shrink-0">
                    <ArrowRight size={12} strokeWidth={3} />
                  </div>
                  <span className="text-[15px] text-[#424242] font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Form Card */}
          <div className="flex-1 w-full max-w-[550px] bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8">
            <div className="mb-8">
              <h2 className="text-[22px] font-normal text-[#333] mb-2 relative inline-block">
                {isLogin ? 'Welcome Back' : "Let's get you started"}
                <div className="absolute -bottom-2 left-0 w-12 h-[3px] bg-[#da251d]"></div>
              </h2>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleContinue} className="space-y-6">
              
              {!isLogin && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full border border-gray-300 rounded p-3 text-[14px] text-gray-700 focus:outline-none focus:border-[#2a5b9e] focus:ring-1 focus:ring-[#2a5b9e] transition-all"
                      required={!isLogin}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  {/* Mobile */}
                  <div className="flex">
                    <div className="border border-gray-300 border-r-0 rounded-l p-3 text-[14px] text-gray-600 bg-gray-50 shrink-0">
                      IND +91
                    </div>
                    <input 
                      type="tel" 
                      placeholder="Mobile Number" 
                      className="w-full border border-gray-300 rounded-r p-3 text-[14px] text-gray-700 focus:outline-none focus:border-[#2a5b9e] focus:ring-1 focus:ring-[#2a5b9e] transition-all"
                      required={!isLogin}
                      value={formData.mobile}
                      onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <div className={`grid grid-cols-1 ${!isLogin ? 'md:grid-cols-2' : ''} gap-5`}>
                {/* Email or Login ID */}
                <div>
                  <input 
                    type={isLogin ? "text" : "email"} 
                    placeholder={isLogin ? "Email or Mobile Number" : "Email ID"} 
                    className="w-full border border-gray-300 rounded p-3 text-[14px] text-gray-700 focus:outline-none focus:border-[#2a5b9e] focus:ring-1 focus:ring-[#2a5b9e] transition-all"
                    required
                    value={isLogin ? formData.mobile : formData.email} // In login mode, we map the input to formData.mobile conceptually, but we can just use formData.mobile directly for logic
                    onChange={(e) => {
                      if (isLogin) {
                        setFormData({...formData, mobile: e.target.value, email: e.target.value});
                      } else {
                        setFormData({...formData, email: e.target.value});
                      }
                    }}
                  />
                </div>

                {/* Location */}
                {!isLogin && (
                  <div>
                    <input 
                      type="text" 
                      placeholder="Choose your location" 
                      className="w-full border border-gray-300 rounded p-3 text-[14px] text-gray-700 focus:outline-none focus:border-[#2a5b9e] focus:ring-1 focus:ring-[#2a5b9e] transition-all"
                      required={!isLogin}
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                )}
              </div>

              {/* Password Fields */}
              <div className={`grid grid-cols-1 ${!isLogin ? 'md:grid-cols-2' : ''} gap-5`}>
                <div>
                  <input 
                    type="password" 
                    placeholder="Password" 
                    className="w-full border border-gray-300 rounded p-3 text-[14px] text-gray-700 focus:outline-none focus:border-[#2a5b9e] focus:ring-1 focus:ring-[#2a5b9e] transition-all"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
                {!isLogin && (
                  <div>
                    <input 
                      type="password" 
                      placeholder="Confirm Password" 
                      className="w-full border border-gray-300 rounded p-3 text-[14px] text-gray-700 focus:outline-none focus:border-[#2a5b9e] focus:ring-1 focus:ring-[#2a5b9e] transition-all"
                      required={!isLogin}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                  </div>
                )}
              </div>

              {/* Radio Groups - Only show in Register mode */}
              {!isLogin && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                  {/* You are */}
                  <div>
                    <p className="text-[14px] text-gray-700 font-medium mb-3">You are</p>
                    <div className="flex gap-2">
                      {['Owner', 'Agent', 'Builder'].map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({...formData, userType: type})}
                          className={`px-4 py-1.5 rounded-full text-[13px] border transition-all ${
                            formData.userType === type 
                              ? 'border-[#2a5b9e] bg-[#f0f4f8] text-[#2a5b9e] font-medium shadow-sm' 
                              : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* You are here to */}
                  <div>
                    <p className="text-[14px] text-gray-700 font-medium mb-3">You are here to</p>
                    <div className="flex gap-2">
                      {['Sell', 'Rent/Lease', 'PG'].map(purpose => (
                        <button
                          key={purpose}
                          type="button"
                          onClick={() => setFormData({...formData, purpose: purpose})}
                          className={`px-4 py-1.5 rounded-full text-[13px] border transition-all ${
                            formData.purpose === purpose 
                              ? 'border-[#2a5b9e] bg-[#f0f4f8] text-[#2a5b9e] font-medium shadow-sm' 
                              : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {purpose}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4 flex flex-col items-center space-y-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-gradient-to-r from-[#2a5b9e] to-[#3876c4] hover:from-[#1d4275] hover:to-[#2a5b9e] text-white font-medium px-12 py-3 rounded-full transition-all shadow-md hover:shadow-lg text-[15px] min-w-[200px] flex justify-center items-center"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    isLogin ? 'Login to Continue' : 'Create Account'
                  )}
                </button>

                {/* Toggle Login/Register */}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                  }}
                  className="text-[14px] text-gray-600 hover:text-[#da251d] transition-colors font-medium"
                >
                  {isLogin 
                    ? "New here? Register to post property" 
                    : "Already registered? Login to continue"
                  }
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
