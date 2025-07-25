'use client';

import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

/**
 * Custom hook để tương tác với Google Sheets API
 * Cung cấp các function để gửi, lấy và quản lý dữ liệu
 */
export function useGoogleSheets() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  /**
   * Gửi dữ liệu lên Google Sheets
   * @param {Object} formData - Dữ liệu cần gửi
   * @param {Object} options - Tùy chọn (showToast, onSuccess, onError)
   */
  const submitData = useCallback(async (formData, options = {}) => {
    const { showToast = true, onSuccess, onError } = options;
    
    setIsLoading(true);
    setError(null);

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
        if (showToast) {
          toast.success('✅ Dữ liệu đã được gửi thành công!');
        }
        if (onSuccess) {
          onSuccess(result);
        }
        return result;
      } else {
        throw new Error(result.error || 'Có lỗi xảy ra');
      }
    } catch (err) {
      const errorMessage = err.message || 'Có lỗi xảy ra khi gửi dữ liệu';
      setError(errorMessage);
      
      if (showToast) {
        toast.error(`❌ ${errorMessage}`);
      }
      if (onError) {
        onError(err);
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Lấy dữ liệu từ Google Sheets
   * @param {Object} options - Tùy chọn (showToast, onSuccess, onError)
   */
  const fetchData = useCallback(async (options = {}) => {
    const { showToast = true, onSuccess, onError } = options;
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/sheets');
      const result = await response.json();

      if (result.success) {
        setData(result.data);
        if (showToast) {
          toast.success(`📊 Đã tải ${result.count} bản ghi`);
        }
        if (onSuccess) {
          onSuccess(result);
        }
        return result.data;
      } else {
        throw new Error(result.error || 'Có lỗi xảy ra');
      }
    } catch (err) {
      const errorMessage = err.message || 'Có lỗi xảy ra khi tải dữ liệu';
      setError(errorMessage);
      
      if (showToast) {
        toast.error(`❌ ${errorMessage}`);
      }
      if (onError) {
        onError(err);
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Lấy thông tin về spreadsheet
   * @param {Object} options - Tùy chọn (showToast, onSuccess, onError)
   */
  const getSpreadsheetInfo = useCallback(async (options = {}) => {
    const { showToast = false, onSuccess, onError } = options;
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/sheets?action=info');
      const result = await response.json();

      if (result.success) {
        if (showToast) {
          toast.success('📋 Đã tải thông tin spreadsheet');
        }
        if (onSuccess) {
          onSuccess(result);
        }
        return result.data;
      } else {
        throw new Error(result.error || 'Có lỗi xảy ra');
      }
    } catch (err) {
      const errorMessage = err.message || 'Có lỗi xảy ra khi tải thông tin';
      setError(errorMessage);
      
      if (showToast) {
        toast.error(`❌ ${errorMessage}`);
      }
      if (onError) {
        onError(err);
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Thiết lập headers cho sheet
   * @param {Array} headers - Mảng tên cột
   * @param {Object} options - Tùy chọn (showToast, onSuccess, onError)
   */
  const setupHeaders = useCallback(async (headers, options = {}) => {
    const { showToast = true, onSuccess, onError } = options;
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/sheets', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ headers }),
      });

      const result = await response.json();

      if (result.success) {
        if (showToast) {
          toast.success('✅ Headers đã được thiết lập!');
        }
        if (onSuccess) {
          onSuccess(result);
        }
        return result;
      } else {
        throw new Error(result.error || 'Có lỗi xảy ra');
      }
    } catch (err) {
      const errorMessage = err.message || 'Có lỗi xảy ra khi thiết lập headers';
      setError(errorMessage);
      
      if (showToast) {
        toast.error(`❌ ${errorMessage}`);
      }
      if (onError) {
        onError(err);
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Reset error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Reset data state
   */
  const clearData = useCallback(() => {
    setData([]);
  }, []);

  return {
    // State
    isLoading,
    data,
    error,
    
    // Actions
    submitData,
    fetchData,
    getSpreadsheetInfo,
    setupHeaders,
    clearError,
    clearData,
    
    // Computed
    hasData: data.length > 0,
    dataCount: data.length,
  };
}

/**
 * Hook đơn giản chỉ để gửi form data
 * @param {Object} defaultOptions - Tùy chọn mặc định
 */
export function useFormSubmission(defaultOptions = {}) {
  const { submitData, isLoading, error } = useGoogleSheets();
  
  const submit = useCallback(async (formData, options = {}) => {
    return submitData(formData, { ...defaultOptions, ...options });
  }, [submitData, defaultOptions]);

  return {
    submit,
    isSubmitting: isLoading,
    error,
  };
}

/**
 * Hook để quản lý dữ liệu từ Google Sheets
 * @param {boolean} autoFetch - Tự động fetch dữ liệu khi mount
 */
export function useSheetData(autoFetch = false) {
  const { fetchData, data, isLoading, error, clearData } = useGoogleSheets();
  
  // Auto fetch on mount if enabled
  React.useEffect(() => {
    if (autoFetch) {
      fetchData({ showToast: false });
    }
  }, [autoFetch, fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
    clearData,
    hasData: data.length > 0,
    count: data.length,
  };
}