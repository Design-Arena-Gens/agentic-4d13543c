// In-memory storage for demo purposes
// In production, use a proper database like MongoDB, PostgreSQL, or Supabase

interface Message {
  id: string
  platform: string
  userId: string
  userMessage: string
  agentResponse: string
  timestamp: Date
  intent?: string
}

interface Stats {
  totalMessages: number
  activeConversations: number
  conversions: number
}

class Storage {
  private messages: Message[] = []
  private conversations: Map<string, Message[]> = new Map()
  private stats: Stats = {
    totalMessages: 0,
    activeConversations: 0,
    conversions: 0
  }

  addMessage(message: Omit<Message, 'id' | 'timestamp'>): Message {
    const newMessage: Message = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    }

    this.messages.push(newMessage)
    this.stats.totalMessages++

    // Track conversation
    const conversationKey = `${message.platform}_${message.userId}`
    if (!this.conversations.has(conversationKey)) {
      this.conversations.set(conversationKey, [])
      this.stats.activeConversations++
    }
    this.conversations.get(conversationKey)!.push(newMessage)

    // Track conversions based on intent
    if (message.intent === 'purchase_intent') {
      this.stats.conversions++
    }

    // Keep only last 1000 messages in memory
    if (this.messages.length > 1000) {
      this.messages = this.messages.slice(-1000)
    }

    return newMessage
  }

  getMessages(limit: number = 50): Message[] {
    return this.messages.slice(-limit).reverse()
  }

  getConversation(platform: string, userId: string): Message[] {
    const conversationKey = `${platform}_${userId}`
    return this.conversations.get(conversationKey) || []
  }

  getStats(): Stats {
    return { ...this.stats }
  }

  clearOldConversations() {
    // Clear conversations older than 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

    this.conversations.forEach((messages, key) => {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage && lastMessage.timestamp < oneDayAgo) {
        this.conversations.delete(key)
        this.stats.activeConversations--
      }
    })
  }
}

export const storage = new Storage()

// Clean old conversations every hour
setInterval(() => {
  storage.clearOldConversations()
}, 60 * 60 * 1000)
