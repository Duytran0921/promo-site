import React, { useState, useEffect } from 'react';
import { 
  getImageUrl, 
  setImageUrl, 
  clearImageUrl, 
  getCurrentImageConfig,
  defaultImageConfig 
} from '../configs/imageConfig';

/**
 * Demo component để test và quản lý Image URL configuration
 * Cho phép user set/get URL từ localStorage hoặc sử dụng default config
 */
const ImageConfigDemo = () => {
  const [currentConfig, setCurrentConfig] = useState({});
  const [labelUrl, setLabelUrl] = useState('');
  const [valueImgUrl, setValueImgUrl] = useState('');
  const [message, setMessage] = useState('');

  // Load current config khi component mount
  useEffect(() => {
    refreshConfig();
  }, []);

  const refreshConfig = () => {
    const config = getCurrentImageConfig();
    setCurrentConfig(config);
    setLabelUrl('');
    setValueImgUrl('');
  };

  const handleSetLabelUrl = () => {
    if (labelUrl.trim()) {
      const success = setImageUrl('label', labelUrl.trim());
      if (success) {
        setMessage(`✅ Label URL đã được lưu: ${labelUrl.trim()}`);
        refreshConfig();
      } else {
        setMessage('❌ Lỗi khi lưu Label URL');
      }
    } else {
      setMessage('⚠️ Vui lòng nhập Label URL');
    }
  };

  const handleSetValueImgUrl = () => {
    if (valueImgUrl.trim()) {
      const success = setImageUrl('valueImg', valueImgUrl.trim());
      if (success) {
        setMessage(`✅ Value Image URL đã được lưu: ${valueImgUrl.trim()}`);
        refreshConfig();
      } else {
        setMessage('❌ Lỗi khi lưu Value Image URL');
      }
    } else {
      setMessage('⚠️ Vui lòng nhập Value Image URL');
    }
  };

  const handleClearLabelUrl = () => {
    const success = clearImageUrl('label');
    if (success) {
      setMessage('🗑️ Label URL đã được xóa khỏi localStorage');
      refreshConfig();
    } else {
      setMessage('❌ Lỗi khi xóa Label URL');
    }
  };

  const handleClearValueImgUrl = () => {
    const success = clearImageUrl('valueImg');
    if (success) {
      setMessage('🗑️ Value Image URL đã được xóa khỏi localStorage');
      refreshConfig();
    } else {
      setMessage('❌ Lỗi khi xóa Value Image URL');
    }
  };

  const generateExampleUrls = () => {
    const examples = [];
    for (let i = 1; i <= 3; i++) {
      examples.push({
        cardIndex: i,
        labelUrl: currentConfig.labelBaseUrl ? `${currentConfig.labelBaseUrl}_${i}` : 'N/A',
        valueUrl: currentConfig.valueImgBaseUrl ? `${currentConfig.valueImgBaseUrl}_${i + 3}` : 'N/A'
      });
    }
    return examples;
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px'
    }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>🖼️ Image URL Configuration Demo</h2>
      
      {/* Current Configuration Display */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '15px', 
        borderRadius: '6px', 
        marginBottom: '20px',
        border: '1px solid #ddd'
      }}>
        <h3 style={{ color: '#555', marginTop: '0' }}>📋 Current Configuration</h3>
        <div style={{ marginBottom: '10px' }}>
          <strong>Label Base URL:</strong> 
          <code style={{ backgroundColor: '#f0f0f0', padding: '2px 6px', marginLeft: '8px' }}>
            {currentConfig.labelBaseUrl || 'Not set'}
          </code>
        </div>
        <div>
          <strong>Value Image Base URL:</strong> 
          <code style={{ backgroundColor: '#f0f0f0', padding: '2px 6px', marginLeft: '8px' }}>
            {currentConfig.valueImgBaseUrl || 'Not set'}
          </code>
        </div>
      </div>

      {/* Default Configuration Display */}
      <div style={{ 
        backgroundColor: '#e8f4fd', 
        padding: '15px', 
        borderRadius: '6px', 
        marginBottom: '20px',
        border: '1px solid #b3d9ff'
      }}>
        <h3 style={{ color: '#0066cc', marginTop: '0' }}>🏠 Default Configuration (Fallback)</h3>
        <div style={{ marginBottom: '10px' }}>
          <strong>Default Label URL:</strong> 
          <code style={{ backgroundColor: '#d4edda', padding: '2px 6px', marginLeft: '8px' }}>
            {defaultImageConfig.labelBaseUrl}
          </code>
        </div>
        <div>
          <strong>Default Value Image URL:</strong> 
          <code style={{ backgroundColor: '#d4edda', padding: '2px 6px', marginLeft: '8px' }}>
            {defaultImageConfig.valueImgBaseUrl}
          </code>
        </div>
      </div>

      {/* URL Input Controls */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '15px', 
        borderRadius: '6px', 
        marginBottom: '20px',
        border: '1px solid #ddd'
      }}>
        <h3 style={{ color: '#555', marginTop: '0' }}>⚙️ Set Custom URLs (localStorage)</h3>
        
        {/* Label URL Input */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Label Base URL:
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={labelUrl}
              onChange={(e) => setLabelUrl(e.target.value)}
              placeholder="https://example.com/images/label"
              style={{ 
                flex: 1, 
                padding: '8px', 
                border: '1px solid #ccc', 
                borderRadius: '4px' 
              }}
            />
            <button 
              onClick={handleSetLabelUrl}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              💾 Save
            </button>
            <button 
              onClick={handleClearLabelUrl}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#dc3545', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        {/* Value Image URL Input */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Value Image Base URL:
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={valueImgUrl}
              onChange={(e) => setValueImgUrl(e.target.value)}
              placeholder="https://example.com/images/value"
              style={{ 
                flex: 1, 
                padding: '8px', 
                border: '1px solid #ccc', 
                borderRadius: '4px' 
              }}
            />
            <button 
              onClick={handleSetValueImgUrl}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              💾 Save
            </button>
            <button 
              onClick={handleClearValueImgUrl}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#dc3545', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              🗑️ Clear
            </button>
          </div>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div style={{ 
          backgroundColor: '#d1ecf1', 
          color: '#0c5460',
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '20px',
          border: '1px solid #bee5eb'
        }}>
          {message}
        </div>
      )}

      {/* Example URLs Generated */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '15px', 
        borderRadius: '6px', 
        border: '1px solid #ddd'
      }}>
        <h3 style={{ color: '#555', marginTop: '0' }}>🎯 Example Generated URLs</h3>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>
          Đây là các URL sẽ được tạo ra cho từng card trong game:
        </p>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Card Index</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Label URL (index-based)</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Value Image URL (value-based)</th>
              </tr>
            </thead>
            <tbody>
              {generateExampleUrls().map((example, idx) => (
                <tr key={idx}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{example.cardIndex}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    <code style={{ fontSize: '12px', backgroundColor: '#f0f0f0', padding: '2px 4px' }}>
                      {example.labelUrl}
                    </code>
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    <code style={{ fontSize: '12px', backgroundColor: '#f0f0f0', padding: '2px 4px' }}>
                      {example.valueUrl}
                    </code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          backgroundColor: '#fff3cd', 
          border: '1px solid #ffeaa7',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          <strong>💡 Lưu ý:</strong> 
          <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
            <li>Label URL dựa trên <strong>index</strong> của card (vị trí trong grid)</li>
            <li>Value Image URL dựa trên <strong>value</strong> của card (giá trị được generate random)</li>
            <li>Ưu tiên lấy từ localStorage, nếu không có sẽ fallback về default config</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageConfigDemo;