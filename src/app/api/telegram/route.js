import { NextResponse } from 'next/server';

// Telegram Bot API configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

export async function POST(request) {
  try {
    // Kiểm tra cấu hình Telegram
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Missing Telegram configuration');
      return NextResponse.json({
        success: false,
        error: 'Telegram configuration is missing'
      }, { status: 500 });
    }

    const formData = await request.json();
    
    // Tạo nội dung tin nhắn với Telegram formatting
    const message = `🔔 *THÔNG BÁO FORM MỚI*\n\n` +
      `👤 *Họ tên:* ${formData.name}\n` +
      `📞 *Điện thoại:* ${formData.phone}\n` +
      `🏢 *Công ty:* ${formData.company}\n` +
      `📧 *Email:* ${formData.email}\n` +
      `📋 *Nhu cầu:* ${formData.requirements}\n` +
      `📝 *Chi tiết:* ${formData.requirementDetails || 'Không có'}\n` +
      `⏰ *Thời gian:* ${new Date().toLocaleString('vi-VN')}`;

    // Gửi tin nhắn Telegram
    const telegramResponse = await fetch(
      `${TELEGRAM_API_URL}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      }
    );

    const telegramResult = await telegramResponse.json();

    if (telegramResponse.ok && telegramResult.ok) {
      const response = NextResponse.json({
        success: true,
        message: 'Thông báo Telegram đã được gửi thành công!',
        messageId: telegramResult.result.message_id
      });
      
      response.headers.set('Content-Type', 'application/json; charset=utf-8');
      return response;
    } else {
      console.error('Telegram API error:', telegramResult);
      const response = NextResponse.json({
        success: false,
        error: 'Không thể gửi thông báo Telegram',
        details: telegramResult
      }, { status: 500 });
      
      response.headers.set('Content-Type', 'application/json; charset=utf-8');
      return response;
    }

  } catch (error) {
    console.error('Telegram notification error:', error);
    const response = NextResponse.json({
      success: false,
      error: 'Lỗi server khi gửi thông báo Telegram'
    }, { status: 500 });
    
    response.headers.set('Content-Type', 'application/json; charset=utf-8');
    return response;
  }
}

// GET endpoint để test cấu hình Telegram
export async function GET() {
  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      const response = NextResponse.json({
        success: false,
        error: 'Telegram configuration is missing',
        config: {
          hasBotToken: !!TELEGRAM_BOT_TOKEN,
          hasChatId: !!TELEGRAM_CHAT_ID
        }
      }, { status: 500 });
      
      response.headers.set('Content-Type', 'application/json; charset=utf-8');
      return response;
    }

    // Test bot bằng cách gọi getMe API
    const testResponse = await fetch(`${TELEGRAM_API_URL}/getMe`);
    const testResult = await testResponse.json();

    if (testResponse.ok && testResult.ok) {
      const response = NextResponse.json({
        success: true,
        message: 'Telegram bot configuration is working',
        botInfo: {
          id: testResult.result.id,
          username: testResult.result.username,
          first_name: testResult.result.first_name
        },
        config: {
          hasBotToken: true,
          hasChatId: true,
          chatId: TELEGRAM_CHAT_ID
        }
      });
      
      response.headers.set('Content-Type', 'application/json; charset=utf-8');
      return response;
    } else {
      const response = NextResponse.json({
        success: false,
        error: 'Invalid Telegram bot token',
        details: testResult
      }, { status: 500 });
      
      response.headers.set('Content-Type', 'application/json; charset=utf-8');
      return response;
    }

  } catch (error) {
    console.error('Telegram config check error:', error);
    const response = NextResponse.json({
      success: false,
      error: 'Lỗi khi kiểm tra cấu hình Telegram'
    }, { status: 500 });
    
    response.headers.set('Content-Type', 'application/json; charset=utf-8');
    return response;
  }
}