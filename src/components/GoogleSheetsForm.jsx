'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function GoogleSheetsForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [showData, setShowData] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/sheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('✅ Dữ liệu đã được gửi thành công!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          category: 'general'
        });
        // Refresh data nếu đang hiển thị
        if (showData) {
          fetchData();
        }
      } else {
        toast.error(`❌ ${result.error}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('❌ Có lỗi xảy ra khi gửi dữ liệu');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('/api/sheets');
      const result = await response.json();
      
      if (result.success) {
        setSubmissions(result.data);
        setShowData(true);
        toast.success(`📊 Đã tải ${result.count} bản ghi`);
      } else {
        toast.error(`❌ ${result.error}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('❌ Có lỗi xảy ra khi tải dữ liệu');
    }
  };

  const setupHeaders = async () => {
    try {
      const headers = ['name', 'email', 'phone', 'message', 'category', 'timestamp', 'date', 'time'];
      
      const response = await fetch('/api/sheets', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ headers }),
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success('✅ Headers đã được thiết lập!');
      } else {
        toast.error(`❌ ${result.error}`);
      }
    } catch (error) {
      console.error('Setup headers error:', error);
      toast.error('❌ Có lỗi xảy ra khi thiết lập headers');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          📝 Google Sheets API Demo
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              📋 Gửi dữ liệu lên Google Sheets
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ tên *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập họ tên của bạn"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0123456789"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Danh mục
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="general">Chung</option>
                  <option value="support">Hỗ trợ</option>
                  <option value="feedback">Phản hồi</option>
                  <option value="business">Kinh doanh</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tin nhắn *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tin nhắn của bạn..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                {isSubmitting ? '⏳ Đang gửi...' : '📤 Gửi dữ liệu'}
              </button>
            </form>
          </div>

          {/* Data Management Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              📊 Quản lý dữ liệu
            </h3>
            
            <div className="space-y-4">
              <button
                onClick={setupHeaders}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                🔧 Thiết lập Headers
              </button>
              
              <button
                onClick={fetchData}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                📥 Tải dữ liệu từ Sheets
              </button>
              
              {showData && (
                <div className="mt-6">
                  <h4 className="text-lg font-medium mb-3 text-gray-700">
                    📋 Dữ liệu từ Google Sheets ({submissions.length} bản ghi)
                  </h4>
                  
                  <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-md">
                    {submissions.length > 0 ? (
                      <div className="space-y-2 p-4">
                        {submissions.slice(-10).reverse().map((item, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded border">
                            <div className="text-sm">
                              <strong>{item.name}</strong> ({item.email})
                            </div>
                            <div className="text-xs text-gray-600">
                              {item.category} • {item.date} {item.time}
                            </div>
                            <div className="text-sm mt-1">{item.message}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        Chưa có dữ liệu
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h4 className="font-medium text-yellow-800 mb-2">📋 Hướng dẫn thiết lập:</h4>
          <ol className="text-sm text-yellow-700 space-y-1">
            <li>1. Tạo Google Service Account và tải file JSON credentials</li>
            <li>2. Thêm các biến môi trường vào file .env.local:</li>
            <li className="ml-4 font-mono text-xs bg-yellow-100 p-2 rounded">
              NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL=your-email@project.iam.gserviceaccount.com<br/>
              GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"<br/>
              GOOGLE_SPREADSHEET_ID=your-spreadsheet-id<br/>
              GOOGLE_SHEET_NAME="Form Submissions"
            </li>
            <li>3. Chia sẻ Google Spreadsheet với Service Account email</li>
            <li>4. Nhấn "Thiết lập Headers" để tạo cấu trúc bảng</li>
          </ol>
        </div>
      </div>
    </div>
  );
}