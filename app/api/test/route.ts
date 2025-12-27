import { NextRequest, NextResponse } from 'next/server'
import { aiAgent } from '@/lib/ai-agent'
import { storage } from '@/lib/storage'

export async function POST(request: NextRequest) {
  try {
    const { platform, message } = await request.json()

    if (!platform || !message) {
      return NextResponse.json(
        { error: 'Platform and message are required' },
        { status: 400 }
      )
    }

    // Generate test response
    const agentResponse = await aiAgent.generateResponse({
      platform,
      userMessage: message,
      conversationHistory: []
    })

    const intent = await aiAgent.analyzeIntent(message)

    // Store test message
    storage.addMessage({
      platform,
      userId: 'test_user',
      userMessage: message,
      agentResponse,
      intent
    })

    return NextResponse.json({
      success: true,
      userMessage: message,
      agentResponse,
      intent
    })
  } catch (error) {
    console.error('Test API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
