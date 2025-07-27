import { NextResponse } from 'next/server';
import googleSheetsService from '../../../services/googleSheets';

// Cấu hình spreadsheet ID - có thể đặt trong env
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || 'Form Submissions';

/**
 * POST /api/sheets
 * Gửi dữ liệu form lên Google Sheets
 */
export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate dữ liệu đầu vào
    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: 'Dữ liệu không hợp lệ' },
        { status: 400 }
      );
    }

    // Khởi tạo service nếu chưa có
    if (!googleSheetsService.isInitialized) {
      await googleSheetsService.initialize(SPREADSHEET_ID, SHEET_NAME);
    }

    // Thêm dữ liệu vào sheet
    const result = await googleSheetsService.addRow(data);
    
    const response = NextResponse.json({
      success: true,
      message: 'Dữ liệu đã được gửi thành công!',
      data: {
        rowNumber: result.rowNumber,
        timestamp: new Date().toISOString()
      }
    });
    
    // Đảm bảo encoding UTF-8 cho tiếng Việt
    response.headers.set('Content-Type', 'application/json; charset=utf-8');
    return response;

  } catch (error) {
    console.error('❌ API Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Có lỗi xảy ra khi gửi dữ liệu',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/sheets
 * Lấy dữ liệu từ Google Sheets
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    // Khởi tạo service nếu chưa có
    if (!googleSheetsService.isInitialized) {
      await googleSheetsService.initialize(SPREADSHEET_ID, SHEET_NAME);
    }

    if (action === 'info') {
      // Lấy thông tin spreadsheet
      const info = googleSheetsService.getSpreadsheetInfo();
      return NextResponse.json({ success: true, data: info });
    } else {
      // Lấy tất cả dữ liệu
      const rows = await googleSheetsService.getAllRows();
      const response = NextResponse.json({ 
        success: true, 
        data: rows,
        count: rows.length
      });
      
      // Đảm bảo encoding UTF-8 cho tiếng Việt
      response.headers.set('Content-Type', 'application/json; charset=utf-8');
      return response;
    }

  } catch (error) {
    console.error('❌ API Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Có lỗi xảy ra khi lấy dữ liệu',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/sheets
 * Cập nhật headers của sheet
 */
export async function PUT(request) {
  try {
    const { headers } = await request.json();
    
    if (!headers || !Array.isArray(headers)) {
      return NextResponse.json(
        { error: 'Headers phải là một mảng' },
        { status: 400 }
      );
    }

    // Khởi tạo service nếu chưa có
    if (!googleSheetsService.isInitialized) {
      await googleSheetsService.initialize(SPREADSHEET_ID, SHEET_NAME);
    }

    await googleSheetsService.updateHeaders(headers);
    
    const response = NextResponse.json({
      success: true,
      message: 'Headers đã được cập nhật thành công!',
      headers
    });
    
    // Đảm bảo encoding UTF-8 cho tiếng Việt
    response.headers.set('Content-Type', 'application/json; charset=utf-8');
    return response;

  } catch (error) {
    console.error('❌ API Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Có lỗi xảy ra khi cập nhật headers',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}