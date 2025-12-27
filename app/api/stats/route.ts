import { NextResponse } from 'next/server'
import { storage } from '@/lib/storage'

export async function GET() {
  try {
    const stats = storage.getStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Stats API error:', error)
    return NextResponse.json(
      { totalMessages: 0, activeConversations: 0, conversions: 0 },
      { status: 200 }
    )
  }
}
