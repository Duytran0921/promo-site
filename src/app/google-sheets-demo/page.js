import GoogleSheetsForm from '../../components/GoogleSheetsForm';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Google Sheets API Demo - PromoGame',
  description: 'Demo tích hợp Google Sheets API để quản lý dữ liệu form và content website',
};

export default function GoogleSheetsDemoPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              📊 Google Sheets API Integration
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Demo tích hợp Google Sheets API để gửi dữ liệu form, quản lý content website, 
              và đồng bộ dữ liệu real-time với Google Spreadsheets.
            </p>
          </div>

          {/* Main Content */}
          <GoogleSheetsForm />

          {/* Features Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              🚀 Tính năng chính
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Form Submission
                </h3>
                <p className="text-gray-600">
                  Gửi dữ liệu form trực tiếp lên Google Sheets với validation 
                  và xử lý lỗi hoàn chỉnh.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Real-time Sync
                </h3>
                <p className="text-gray-600">
                  Đồng bộ dữ liệu real-time giữa website và Google Sheets, 
                  cập nhật tức thì.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Data Management
                </h3>
                <p className="text-gray-600">
                  Quản lý content website thông qua Google Sheets, 
                  dễ dàng chỉnh sửa và cập nhật.
                </p>
              </div>
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              💡 Ứng dụng thực tế
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                  <span className="mr-2">📋</span>
                  Quản lý Form Submissions
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Contact forms</li>
                  <li>• Registration forms</li>
                  <li>• Survey responses</li>
                  <li>• Feedback collection</li>
                  <li>• Lead generation</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                  <span className="mr-2">🎮</span>
                  Game Data Management
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Player scores & statistics</li>
                  <li>• Game configurations</li>
                  <li>• Leaderboards</li>
                  <li>• User progress tracking</li>
                  <li>• Analytics data</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                  <span className="mr-2">📰</span>
                  Content Management
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Blog posts & articles</li>
                  <li>• Product catalogs</li>
                  <li>• FAQ management</li>
                  <li>• Testimonials</li>
                  <li>• Dynamic content</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                  <span className="mr-2">📈</span>
                  Analytics & Reporting
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• User behavior tracking</li>
                  <li>• Performance metrics</li>
                  <li>• Custom reports</li>
                  <li>• Data visualization</li>
                  <li>• Business intelligence</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Info */}
          <div className="mt-16">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                🔧 Thông tin kỹ thuật
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-700">
                    📦 Dependencies
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• google-spreadsheet: ^4.1.5</li>
                    <li>• google-auth-library: ^10.1.0</li>
                    <li>• googleapis: ^154.0.0</li>
                    <li>• react-hot-toast: ^2.4.1</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-700">
                    🛠️ API Endpoints
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• POST /api/sheets - Gửi dữ liệu</li>
                    <li>• GET /api/sheets - Lấy dữ liệu</li>
                    <li>• PUT /api/sheets - Cập nhật headers</li>
                    <li>• GET /api/sheets?action=info - Thông tin sheet</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </>
  );
}