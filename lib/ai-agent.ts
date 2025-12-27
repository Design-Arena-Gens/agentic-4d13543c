import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'demo-key'
})

interface ConversationContext {
  platform: string
  userMessage: string
  conversationHistory?: Array<{ role: string; content: string }>
}

export class AIAgent {
  private systemPrompt = `আপনি একজন দক্ষ বাংলা ভাষায় কথা বলা বিক্রয় সহায়ক এজেন্ট। আপনার উদ্দেশ্য:

1. গ্রাহকদের সাথে বন্ধুত্বপূর্ণ এবং পেশাদার ভাবে কথা বলা
2. তাদের প্রশ্নের সঠিক এবং সহায়ক উত্তর প্রদান করা
3. পণ্য বা সেবা সম্পর্কে বিস্তারিত তথ্য দেওয়া
4. গ্রাহকদের ক্রয় সিদ্ধান্ত নিতে সাহায্য করা
5. উপযুক্ত সময়ে কল টু একশন (CTA) প্রদান করা যেমন:
   - "অর্ডার করতে চান? আমাকে জানান!"
   - "আরও বিস্তারিত জানতে চাইলে আমাকে জিজ্ঞাসা করুন"
   - "এখনই অর্ডার করুন এবং বিশেষ ছাড় পান!"

নির্দেশনা:
- সবসময় বাংলায় উত্তর দিন
- সংক্ষিপ্ত এবং পরিষ্কার উত্তর দিন
- গ্রাহকের আগ্রহ বুঝে উপযুক্ত পরামর্শ দিন
- ইতিবাচক এবং সহায়ক মনোভাব বজায় রাখুন
- পণ্যের মূল্য, বৈশিষ্ট্য এবং সুবিধা তুলে ধরুন
- যদি কোনো তথ্য জানা না থাকে, সৎভাবে বলুন এবং সাহায্য করার প্রস্তাব দিন`

  async generateResponse(context: ConversationContext): Promise<string> {
    try {
      const messages: any[] = [
        { role: 'system', content: this.systemPrompt }
      ]

      if (context.conversationHistory && context.conversationHistory.length > 0) {
        messages.push(...context.conversationHistory)
      }

      messages.push({ role: 'user', content: context.userMessage })

      // Demo mode - return smart responses without API call
      if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'demo-key') {
        return this.getDemoResponse(context.userMessage)
      }

      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      })

      return completion.choices[0]?.message?.content || 'দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না।'
    } catch (error) {
      console.error('AI Agent Error:', error)
      return this.getDemoResponse(context.userMessage)
    }
  }

  private getDemoResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase()

    // Greeting responses
    if (lowerMessage.includes('হাই') || lowerMessage.includes('হ্যালো') || lowerMessage.includes('আসসালামু') || lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
      return 'আসসালামু আলাইকুম! আপনাকে স্বাগতম। আমি আপনার বিক্রয় সহায়ক। আপনি কীভাবে সাহায্য করতে পারি? আমাদের পণ্য সম্পর্কে জানতে চান নাকি অর্ডার করতে চান? 😊'
    }

    // Price inquiries
    if (lowerMessage.includes('দাম') || lowerMessage.includes('মূল্য') || lowerMessage.includes('কত') || lowerMessage.includes('price')) {
      return 'আমাদের পণ্যের দাম খুবই প্রতিযোগিতামূলক! আপনি কোন পণ্য সম্পর্কে জানতে চান? আমি আপনাকে বিস্তারিত তথ্য এবং বর্তমান অফার সম্পর্কে জানাতে পারি। 💰\n\nবিশেষ ছাড়: এই মাসে ২০% পর্যন্ত ছাড় পাবেন!'
    }

    // Product inquiries
    if (lowerMessage.includes('পণ্য') || lowerMessage.includes('প্রোডাক্ট') || lowerMessage.includes('product') || lowerMessage.includes('item')) {
      return 'আমাদের কাছে বিভিন্ন ধরনের উচ্চমানের পণ্য রয়েছে:\n\n✅ সর্বশেষ কালেকশন\n✅ গ্যারান্টি সহ\n✅ দ্রুত ডেলিভারি\n\nকোন ক্যাটাগরির পণ্য দেখতে চান? আমি আপনাকে সাহায্য করতে পারি! 🛍️'
    }

    // Delivery inquiries
    if (lowerMessage.includes('ডেলিভারি') || lowerMessage.includes('পৌঁছ') || lowerMessage.includes('delivery') || lowerMessage.includes('shipping')) {
      return 'আমরা দ্রুত এবং নিরাপদ ডেলিভারি প্রদান করি:\n\n🚚 ঢাকার ভিতরে: ১-২ দিন\n🚚 ঢাকার বাইরে: ২-৪ দিন\n\nহোম ডেলিভারি সুবিধা সহ। আপনি কোথায় ডেলিভারি নিতে চান?'
    }

    // Order placement
    if (lowerMessage.includes('অর্ডার') || lowerMessage.includes('কিনতে') || lowerMessage.includes('নিতে চাই') || lowerMessage.includes('order') || lowerMessage.includes('buy')) {
      return 'দুর্দান্ত! 🎉 আপনার অর্ডার নিশ্চিত করতে আমাকে নিম্নলিখিত তথ্য দিন:\n\n1️⃣ পণ্যের নাম এবং পরিমাণ\n2️⃣ আপনার সম্পূর্ণ নাম\n3️⃣ ফোন নম্বর\n4️⃣ ডেলিভারি ঠিকানা\n\nআমি তাৎক্ষণিক আপনার অর্ডার প্রসেস করব! 📦'
    }

    // Payment inquiries
    if (lowerMessage.includes('পেমেন্ট') || lowerMessage.includes('টাকা') || lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
      return 'পেমেন্ট পদ্ধতি:\n\n💳 ক্যাশ অন ডেলিভারি\n💳 বিকাশ/নগদ/রকেট\n💳 ব্যাংক ট্রান্সফার\n💳 কার্ড পেমেন্ট\n\nআপনার সুবিধামত যেকোনো পদ্ধতি ব্যবহার করতে পারেন। নিরাপদ এবং সহজ!'
    }

    // Return/Exchange inquiries
    if (lowerMessage.includes('রিটার্ন') || lowerMessage.includes('বদল') || lowerMessage.includes('ফেরত') || lowerMessage.includes('return') || lowerMessage.includes('exchange')) {
      return 'আমাদের রিটার্ন পলিসি:\n\n🔄 ৭ দিনের রিটার্ন গ্যারান্টি\n🔄 পণ্যে সমস্যা থাকলে বিনামূল্যে বদল\n🔄 সহজ রিটার্ন প্রক্রিয়া\n\nআপনার সন্তুষ্টি আমাদের প্রথম অগ্রাধিকার! 😊'
    }

    // Thank you responses
    if (lowerMessage.includes('ধন্যবাদ') || lowerMessage.includes('থ্যাংক') || lowerMessage.includes('thank')) {
      return 'আপনাকেও অসংখ্য ধন্যবাদ! 🙏 আমাদের সাথে যোগাযোগ করার জন্য। আর কোনো প্রশ্ন থাকলে যেকোনো সময় জিজ্ঞাসা করতে পারেন। আমরা সবসময় আপনার সেবায় আছি! 💚\n\nএখনই অর্ডার করুন এবং বিশেষ অফার পান! 🎁'
    }

    // Default intelligent response
    return `আপনার প্রশ্নটি বুঝতে পেরেছি! আমি আপনাকে সাহায্য করতে চাই। আমাদের পণ্য ও সেবা সম্পর্কে বিস্তারিত জানতে এবং অর্ডার করতে আমাকে আরও বলুন।

কিছু জিজ্ঞাসা করতে পারেন:
• পণ্যের দাম ও বৈশিষ্ট্য
• ডেলিভারি সময় ও পদ্ধতি
• পেমেন্ট অপশন
• অফার ও ছাড়

এখনই অর্ডার করুন! 🛒✨`
  }

  async analyzeIntent(message: string): Promise<string> {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes('অর্ডার') || lowerMessage.includes('কিনতে') || lowerMessage.includes('order') || lowerMessage.includes('buy')) {
      return 'purchase_intent'
    }
    if (lowerMessage.includes('দাম') || lowerMessage.includes('মূল্য') || lowerMessage.includes('price')) {
      return 'price_inquiry'
    }
    if (lowerMessage.includes('পণ্য') || lowerMessage.includes('product')) {
      return 'product_inquiry'
    }
    if (lowerMessage.includes('ডেলিভারি') || lowerMessage.includes('delivery')) {
      return 'delivery_inquiry'
    }

    return 'general_inquiry'
  }
}

export const aiAgent = new AIAgent()
