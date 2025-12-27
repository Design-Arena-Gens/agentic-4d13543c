import { NextRequest, NextResponse } from 'next/server'
import { aiAgent } from '@/lib/ai-agent'
import { storage } from '@/lib/storage'

export async function GET(request: NextRequest) {
  // Webhook verification for WhatsApp
  const searchParams = request.nextUrl.searchParams
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log('WhatsApp webhook verified')
    return new NextResponse(challenge, { status: 200 })
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Check if this is a message event
    if (body.object === 'whatsapp_business_account') {
      const entry = body.entry?.[0]
      const changes = entry?.changes?.[0]
      const value = changes?.value

      if (value?.messages && value.messages.length > 0) {
        const message = value.messages[0]
        const from = message.from
        const messageText = message.text?.body

        if (messageText) {
          // Get conversation history
          const conversationHistory = storage.getConversation('whatsapp', from)
            .slice(-5) // Last 5 messages
            .map(msg => [
              { role: 'user', content: msg.userMessage },
              { role: 'assistant', content: msg.agentResponse }
            ])
            .flat()

          // Generate AI response
          const agentResponse = await aiAgent.generateResponse({
            platform: 'whatsapp',
            userMessage: messageText,
            conversationHistory
          })

          // Analyze intent
          const intent = await aiAgent.analyzeIntent(messageText)

          // Store message
          storage.addMessage({
            platform: 'whatsapp',
            userId: from,
            userMessage: messageText,
            agentResponse,
            intent
          })

          // Send response via WhatsApp API
          await sendWhatsAppMessage(from, agentResponse)
        }
      }
    }

    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error('WhatsApp webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function sendWhatsAppMessage(to: string, message: string) {
  if (!process.env.WHATSAPP_TOKEN || !process.env.WHATSAPP_PHONE_NUMBER_ID) {
    console.log('WhatsApp not configured, skipping send')
    return
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to,
          type: 'text',
          text: { body: message }
        })
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error('WhatsApp API error:', error)
    }
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error)
  }
}
