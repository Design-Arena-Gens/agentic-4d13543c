import { NextResponse } from 'next/server'
import { storage } from '@/lib/storage'

export async function GET() {
  try {
    const logs = storage.getMessages(50)
    return NextResponse.json({ logs })
  } catch (error) {
    console.error('Logs API error:', error)
    return NextResponse.json({ logs: [] }, { status: 200 })
  }
}
