import { NextResponse } from 'next/server';

// WhatsApp Business API configuration
const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL || 'https://graph.facebook.com/v18.0';
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const RECIPIENT_PHONE_NUMBER = process.env.WHATSAPP_RECIPIENT_PHONE_NUMBER;

export async function POST(request) {
  try {
    // Kiểm tra cấu hình WhatsApp
    if (!WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_ACCESS_TOKEN || !RECIPIENT_PHONE_NUMBER) {
      console.error('Missing WhatsApp configuration');
      return NextResponse.json({
        success: false,
        error: 'WhatsApp configuration is missing'
      }, { status: 500 });
    }

    const formData = await request.json();
    
    // Tạo nội dung tin nhắn
    const message = `🔔 *THÔNG BÁO FORM MỚI*\n\n` +
      `👤 *Họ tên:* ${formData.name}\n` +
      `📞 *Điện thoại:* ${formData.phone}\n` +
      `🏢 *Công ty:* ${formData.company}\n` +
      `📧 *Email:* ${formData.email}\n` +
      `📋 *Nhu cầu:* ${formData.requirements}\n` +
      `📝 *Chi tiết:* ${formData.requirementDetails || 'Không có'}\n` +
      `⏰ *Thời gian:* ${new Date().toLocaleString('vi-VN')}`;

    // Gửi tin nhắn WhatsApp
    const whatsappResponse = await fetch(
      `${WHATSAPP_API_URL}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: RECIPIENT_PHONE_NUMBER,
          type: 'text',
          text: {
            body: message
          }
        })
      }
    );

    const whatsappResult = await whatsappResponse.json();

    if (whatsappResponse.ok) {
      const response = NextResponse.json({
        success: true,
        message: 'Thông báo WhatsApp đã được gửi thành công!',
        messageId: whatsappResult.messages?.[0]?.id
      });
      
      response.headers.set('Content-Type', 'application/json; charset=utf-8');
      return response;
    } else {
      console.error('WhatsApp API error:', whatsappResult);
      const response = NextResponse.json({
        success: false,
        error: 'Không thể gửi thông báo WhatsApp',
        details: whatsappResult
      }, { status: 500 });
      
      response.headers.set('Content-Type', 'application/json; charset=utf-8');
      return response;
    }

  } catch (error) {
    console.error('WhatsApp notification error:', error);
    const response = NextResponse.json({
      success: false,
      error: 'Lỗi server khi gửi thông báo WhatsApp'
    }, { status: 500 });
    
    response.headers.set('Content-Type', 'application/json; charset=utf-8');
    return response;
  }
}

// GET endpoint để test cấu hình WhatsApp
export async function GET() {
  try {
    const config = {
      hasPhoneNumberId: !!WHATSAPP_PHONE_NUMBER_ID,
      hasAccessToken: !!WHATSAPP_ACCESS_TOKEN,
      hasRecipientNumber: !!RECIPIENT_PHONE_NUMBER,
      apiUrl: WHATSAPP_API_URL
    };

    const response = NextResponse.json({
      success: true,
      message: 'WhatsApp configuration status',
      config
    });
    
    response.headers.set('Content-Type', 'application/json; charset=utf-8');
    return response;
  } catch (error) {
    console.error('WhatsApp config check error:', error);
    const response = NextResponse.json({
      success: false,
      error: 'Lỗi khi kiểm tra cấu hình WhatsApp'
    }, { status: 500 });
    
    response.headers.set('Content-Type', 'application/json; charset=utf-8');
    return response;
  }
}