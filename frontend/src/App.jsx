import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import PropertyDetails from './pages/PropertyDetails';
import PropertyCollection from './pages/PropertyCollection';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminPostProperty from './pages/AdminPostProperty';
import PostPropertyAuth from './pages/PostPropertyAuth';
import UserDashboard from './pages/UserDashboard';
import UserPostProperty from './pages/UserPostProperty';
import UserManageProperties from './pages/UserManageProperties';
import UserEnquiries from './pages/UserEnquiries';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/properties" element={<PropertyCollection />} />
        <Route path="/post-property" element={<PostPropertyAuth />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/post-property" element={<UserPostProperty />} />
        <Route path="/user/edit-property/:id" element={<UserPostProperty />} />
        <Route path="/user/manage-properties" element={<UserManageProperties />} />
        <Route path="/user/enquiries" element={<UserEnquiries />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/create" element={<AdminPostProperty />} />
        <Route path="/admin/edit/:id" element={<AdminPostProperty />} />
      </Routes>
    </BrowserRouter>
  );
}
