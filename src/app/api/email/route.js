import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email configuration
const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com';
const EMAIL_PORT = process.env.EMAIL_PORT || 587;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM || EMAIL_USER;
const EMAIL_TO = process.env.EMAIL_TO;

export async function POST(request) {
  try {
    // Kiểm tra cấu hình Email
    if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
      console.error('Missing Email configuration');
      return NextResponse.json({
        success: false,
        error: 'Email configuration is missing'
      }, { status: 500 });
    }

    const formData = await request.json();
    
    // Tạo transporter
    const transporter = nodemailer.createTransporter({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Tạo nội dung email HTML
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #2563eb; text-align: center; margin-bottom: 30px;">🔔 THÔNG BÁO FORM MỚI</h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #374151; margin-top: 0;">Thông tin khách hàng:</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563; width: 120px;">👤 Họ tên:</td>
              <td style="padding: 8px 0; color: #111827;">${formData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">📞 Điện thoại:</td>
              <td style="padding: 8px 0; color: #111827;">${formData.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">🏢 Công ty:</td>
              <td style="padding: 8px 0; color: #111827;">${formData.company}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">📧 Email:</td>
              <td style="padding: 8px 0; color: #111827;">
                <a href="mailto:${formData.email}" style="color: #2563eb; text-decoration: none;">${formData.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">📋 Nhu cầu:</td>
              <td style="padding: 8px 0; color: #111827;">${formData.requirements}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563; vertical-align: top;">📝 Chi tiết:</td>
              <td style="padding: 8px 0; color: #111827;">${formData.requirementDetails || 'Không có'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">⏰ Thời gian:</td>
              <td style="padding: 8px 0; color: #111827;">${new Date().toLocaleString('vi-VN')}</td>
            </tr>
          </table>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">Thông báo từ PromoGame Website</p>
        </div>
      </div>
    `;

    // Tạo nội dung text thuần
    const textContent = `
THÔNG BÁO FORM MỚI\n\n` +
      `Họ tên: ${formData.name}\n` +
      `Điện thoại: ${formData.phone}\n` +
      `Công ty: ${formData.company}\n` +
      `Email: ${formData.email}\n` +
      `Nhu cầu: ${formData.requirements}\n` +
      `Chi tiết: ${formData.requirementDetails || 'Không có'}\n` +
      `Thời gian: ${new Date().toLocaleString('vi-VN')}\n\n` +
      `---\nThông báo từ PromoGame Website`;

    // Cấu hình email
    const mailOptions = {
      from: `"PromoGame Notifications" <${EMAIL_FROM}>`,
      to: EMAIL_TO,
      subject: `🔔 Form mới từ ${formData.name} - ${formData.company}`,
      text: textContent,
      html: htmlContent,
    };

    // Gửi email
    const emailResult = await transporter.sendMail(mailOptions);

    const response = NextResponse.json({
      success: true,
      message: 'Email thông báo đã được gửi thành công!',
      messageId: emailResult.messageId
    });
    
    response.headers.set('Content-Type', 'application/json; charset=utf-8');
    return response;

  } catch (error) {
    console.error('Email notification error:', error);
    const response = NextResponse.json({
      success: false,
      error: 'Lỗi server khi gửi email thông báo',
      details: error.message
    }, { status: 500 });
    
    response.headers.set('Content-Type', 'application/json; charset=utf-8');
    return response;
  }
}

// GET endpoint để test cấu hình Email
export async function GET() {
  try {
    const config = {
      hasEmailUser: !!EMAIL_USER,
      hasEmailPass: !!EMAIL_PASS,
      hasEmailTo: !!EMAIL_TO,
      emailHost: EMAIL_HOST,
      emailPort: EMAIL_PORT,
      emailFrom: EMAIL_FROM
    };

    if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
      const response = NextResponse.json({
        success: false,
        message: 'Email configuration is incomplete',
        config
      }, { status: 500 });
      
      response.headers.set('Content-Type', 'application/json; charset=utf-8');
      return response;
    }

    // Test connection
    const transporter = nodemailer.createTransporter({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: false,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    await transporter.verify();

    const response = NextResponse.json({
      success: true,
      message: 'Email configuration is working',
      config
    });
    
    response.headers.set('Content-Type', 'application/json; charset=utf-8');
    return response;

  } catch (error) {
    console.error('Email config check error:', error);
    const response = NextResponse.json({
      success: false,
      error: 'Lỗi khi kiểm tra cấu hình email',
      details: error.message
    }, { status: 500 });
    
    response.headers.set('Content-Type', 'application/json; charset=utf-8');
    return response;
  }
}