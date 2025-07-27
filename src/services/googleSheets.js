/**
 * Google Sheets API Service
 * Tích hợp với Google Sheets để gửi và quản lý dữ liệu
 */

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

class GoogleSheetsService {
  constructor() {
    this.doc = null;
    this.sheet = null;
    this.isInitialized = false;
  }

  /**
   * Khởi tạo kết nối với Google Sheets
   * @param {string} spreadsheetId - ID của Google Spreadsheet
   * @param {string} sheetName - Tên của sheet (mặc định là sheet đầu tiên)
   */
  async initialize(spreadsheetId, sheetName = null) {
    try {
      // Kiểm tra các biến môi trường cần thiết
      const serviceAccountEmail = process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL;
      const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
      
      if (!serviceAccountEmail || !privateKey) {
        throw new Error('Thiếu thông tin xác thực Google Service Account');
      }

      // Tạo JWT auth
      const serviceAccountAuth = new JWT({
        email: serviceAccountEmail,
        key: privateKey,
        scopes: [
          'https://www.googleapis.com/auth/spreadsheets',
          'https://www.googleapis.com/auth/drive.file',
        ],
      });

      // Khởi tạo document
      this.doc = new GoogleSpreadsheet(spreadsheetId, serviceAccountAuth);
      await this.doc.loadInfo();

      // Chọn sheet
      if (sheetName) {
        this.sheet = this.doc.sheetsByTitle[sheetName];
        if (!this.sheet) {
          throw new Error(`Không tìm thấy sheet với tên: ${sheetName}`);
        }
      } else {
        this.sheet = this.doc.sheetsByIndex[0];
      }

      // Kiểm tra và tạo headers nếu cần
      try {
        await this.sheet.loadHeaderRow();
      } catch (error) {
        if (error.message.includes('No values in the header row')) {
          // Tự động tạo headers mặc định cho cả GoogleSheetsForm và BasicInfoForm
          const defaultHeaders = ['name', 'email', 'phone', 'company', 'message', 'requirements', 'requirementDetails', 'timestamp', 'date', 'time'];
          await this.sheet.setHeaderRow(defaultHeaders);
          console.log('✅ Đã tạo headers mặc định:', defaultHeaders);
          await this.sheet.loadHeaderRow();
        } else {
          throw error;
        }
      }
      
      this.isInitialized = true;
      
      console.log('✅ Kết nối Google Sheets thành công!');
      return true;
    } catch (error) {
      console.error('❌ Lỗi kết nối Google Sheets:', error);
      throw error;
    }
  }

  /**
   * Thêm dữ liệu mới vào sheet
   * @param {Object} data - Dữ liệu cần thêm
   */
  async addRow(data) {
    if (!this.isInitialized) {
      throw new Error('Service chưa được khởi tạo');
    }

    try {
      // Thêm timestamp
      const rowData = {
        ...data,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString('vi-VN'),
        time: new Date().toLocaleTimeString('vi-VN')
      };

      const row = await this.sheet.addRow(rowData);
      console.log('✅ Đã thêm dữ liệu vào Google Sheets:', rowData);
      return row;
    } catch (error) {
      console.error('❌ Lỗi thêm dữ liệu:', error);
      throw error;
    }
  }

  /**
   * Lấy tất cả dữ liệu từ sheet
   */
  async getAllRows() {
    if (!this.isInitialized) {
      throw new Error('Service chưa được khởi tạo');
    }

    try {
      const rows = await this.sheet.getRows();
      return rows.map(row => row.toObject());
    } catch (error) {
      console.error('❌ Lỗi lấy dữ liệu:', error);
      throw error;
    }
  }

  /**
   * Cập nhật header của sheet
   * @param {Array} headers - Mảng các tên cột
   */
  async updateHeaders(headers) {
    if (!this.isInitialized) {
      throw new Error('Service chưa được khởi tạo');
    }

    try {
      await this.sheet.setHeaderRow(headers);
      console.log('✅ Đã cập nhật headers:', headers);
    } catch (error) {
      console.error('❌ Lỗi cập nhật headers:', error);
      throw error;
    }
  }

  /**
   * Lấy thông tin về spreadsheet
   */
  getSpreadsheetInfo() {
    if (!this.doc) {
      return null;
    }

    return {
      title: this.doc.title,
      sheetCount: this.doc.sheetCount,
      currentSheet: this.sheet?.title,
      headers: this.sheet?.headerValues
    };
  }
}

// Export singleton instance
const googleSheetsService = new GoogleSheetsService();
export default googleSheetsService;

// Export class cho trường hợp cần tạo multiple instances
export { GoogleSheetsService };