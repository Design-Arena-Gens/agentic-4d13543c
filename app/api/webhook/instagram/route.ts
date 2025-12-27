import { NextRequest, NextResponse } from 'next/server'
import { aiAgent } from '@/lib/ai-agent'
import { storage } from '@/lib/storage'

export async function GET(request: NextRequest) {
  // Webhook verification for Instagram
  const searchParams = request.nextUrl.searchParams
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === process.env.FB_VERIFY_TOKEN) {
    console.log('Instagram webhook verified')
    return new NextResponse(challenge, { status: 200 })
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Check if this is an Instagram message event
    if (body.object === 'instagram') {
      for (const entry of body.entry || []) {
        for (const messagingEvent of entry.messaging || []) {
          if (messagingEvent.message && messagingEvent.message.text) {
            const senderId = messagingEvent.sender.id
            const messageText = messagingEvent.message.text

            // Get conversation history
            const conversationHistory = storage.getConversation('instagram', senderId)
              .slice(-5)
              .map(msg => [
                { role: 'user', content: msg.userMessage },
                { role: 'assistant', content: msg.agentResponse }
              ])
              .flat()

            // Generate AI response
            const agentResponse = await aiAgent.generateResponse({
              platform: 'instagram',
              userMessage: messageText,
              conversationHistory
            })

            // Analyze intent
            const intent = await aiAgent.analyzeIntent(messageText)

            // Store message
            storage.addMessage({
              platform: 'instagram',
              userId: senderId,
              userMessage: messageText,
              agentResponse,
              intent
            })

            // Send response via Instagram API
            await sendInstagramMessage(senderId, agentResponse)
          }
        }
      }
    }

    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error('Instagram webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function sendInstagramMessage(recipientId: string, message: string) {
  if (!process.env.IG_ACCESS_TOKEN) {
    console.log('Instagram not configured, skipping send')
    return
  }

  try {
    const response = await fetch(
      'https://graph.facebook.com/v18.0/me/messages',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipient: { id: recipientId },
          message: { text: message },
          access_token: process.env.IG_ACCESS_TOKEN
        })
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error('Instagram API error:', error)
    }
  } catch (error) {
    console.error('Failed to send Instagram message:', error)
  }
}
