'use client'
import React, { useState } from 'react';
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaBuilding, FaBriefcase, FaChevronDown } from 'react-icons/fa';

const BasicInfoForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    company: '',
    industry: '',
    customIndustry: '',
    position: '',
    email: '',
    requirements: '',
    requirementDetails: ''
  });

  const industryOptions = [
    'Đơn vị triển khai Zalo Miniapp',
    'Đơn vị triển khai phần mềm',
    'Đơn vị triển khai CDP / CRM',
    'Marketing / Agency',
    'Loyalty platform',
    'Doanh nghiệp Thương mại điện tử',
    'Doanh nghiệp Bán lẻ',
    'Ngân hàng / Tài chính',
    'Giáo dục / Đào tạo',
    'Bất động sản',
    'F&B (nhà hàng, cafe)',
    'Sự kiện / Giải trí',
    'Khác'
  ];

  const requirementOptions = [
    'Công cụ tạo và quản lý Minigame cho Zalo Mini-app/Web-app',
    'Thiết kế game cho sự kiện'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý submit form ở đây
    console.log('Form data:', formData);
    alert('Cảm ơn bạn đã gửi thông tin! Chúng tôi sẽ liên hệ sớm nhất.');
    
    // Reset form
    setFormData({
      fullName: '',
      phone: '',
      company: '',
      industry: '',
      customIndustry: '',
      position: '',
      email: '',
      requirements: '',
      requirementDetails: ''
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-70 z-[9998] transition-all duration-300"
        style={{
          visibility: isOpen ? 'visible' : 'hidden',
          opacity: isOpen ? 1 : 0
        }}
        onClick={onClose}
      ></div>

      {/* Modal Form */}
      <div 
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-8 w-[95%] max-w-2xl max-h-[95vh] overflow-y-auto z-[9999] shadow-2xl transition-all duration-300"
        style={{
          visibility: isOpen ? 'visible' : 'hidden',
          opacity: isOpen ? 1 : 0
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900">
            Thông Tin Liên Hệ
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Họ và tên */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaUser className="mr-2 text-blue-600" />
              Họ và tên *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-sm"
              placeholder="Nhập họ và tên của bạn"
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaPhone className="mr-2 text-blue-600" />
              Số điện thoại *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-sm"
              placeholder="Nhập số điện thoại"
            />
          </div>

          {/* Tên công ty */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaBuilding className="mr-2 text-blue-600" />
              Tên công ty *
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-sm"
              placeholder="Nhập tên công ty"
            />
          </div>

          {/* Ngành nghề */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaBriefcase className="mr-2 text-blue-600" />
              Ngành nghề *
            </label>
            <div className="relative">
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-sm appearance-none bg-white pr-10"
              >
                <option value="">Chọn ngành nghề</option>
                {industryOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            
            {/* Custom industry input */}
            {formData.industry === 'Khác' && (
              <input
                type="text"
                name="customIndustry"
                value={formData.customIndustry}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-sm mt-3"
                placeholder="Vui lòng nhập ngành nghề của bạn"
              />
            )}
          </div>

          {/* Chức vụ */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaBriefcase className="mr-2 text-blue-600" />
              Chức vụ *
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-sm"
              placeholder="Nhập chức vụ của bạn"
            />
          </div>

          {/* Email công ty */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaEnvelope className="mr-2 text-blue-600" />
              Email công ty *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-sm"
              placeholder="Nhập email công ty"
            />
          </div>

          {/* Nhu cầu */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaBriefcase className="mr-2 text-blue-600" />
              Nhu cầu *
            </label>
            <div className="relative">
              <select
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-sm appearance-none bg-white pr-10"
              >
                <option value="">Chọn nhu cầu</option>
                {requirementOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Chi tiết nhu cầu */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Chi tiết nhu cầu
            </label>
            <textarea
              name="requirementDetails"
              value={formData.requirementDetails}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-sm resize-vertical min-h-[100px]"
              placeholder="Mô tả chi tiết nhu cầu của bạn..."
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-end pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              Gửi thông tin
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BasicInfoForm;