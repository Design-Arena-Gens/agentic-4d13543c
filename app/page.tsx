'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Home() {
  const [stats, setStats] = useState({
    totalMessages: 0,
    activeConversations: 0,
    conversions: 0
  })
  const [logs, setLogs] = useState<any[]>([])

  useEffect(() => {
    fetchStats()
    fetchLogs()
    const interval = setInterval(() => {
      fetchStats()
      fetchLogs()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/logs')
      const data = await response.json()
      setLogs(data.logs || [])
    } catch (error) {
      console.error('Error fetching logs:', error)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            সোশ্যাল কমার্স এজেন্ট 🤖
          </h1>
          <p className="text-xl text-gray-600">
            WhatsApp, Facebook Messenger এবং Instagram এর জন্য স্বয়ংক্রিয় বিক্রয় সহায়ক
          </p>
        </div>

        {/* Platform Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-whatsapp">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">WhatsApp</h3>
              <div className="w-12 h-12 bg-whatsapp rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{Math.floor(stats.totalMessages * 0.4)}</div>
            <p className="text-gray-600">মোট মেসেজ</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-facebook">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Messenger</h3>
              <div className="w-12 h-12 bg-facebook rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{Math.floor(stats.totalMessages * 0.35)}</div>
            <p className="text-gray-600">মোট মেসেজ</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-instagram">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Instagram</h3>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{Math.floor(stats.totalMessages * 0.25)}</div>
            <p className="text-gray-600">মোট মেসেজ</p>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">{stats.totalMessages}</div>
            <p className="text-gray-600 text-lg">মোট মেসেজ প্রসেস করা হয়েছে</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-4xl font-bold text-green-600 mb-2">{stats.activeConversations}</div>
            <p className="text-gray-600 text-lg">সক্রিয় কথোপকথন</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-4xl font-bold text-purple-600 mb-2">{stats.conversions}</div>
            <p className="text-gray-600 text-lg">সফল রূপান্তর</p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">বৈশিষ্ট্যসমূহ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 rounded-lg p-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">তাৎক্ষণিক প্রতিক্রিয়া</h3>
                <p className="text-gray-600">গ্রাহকদের প্রশ্নের তাৎক্ষণিক উত্তর প্রদান করে</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 rounded-lg p-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">বুদ্ধিমান AI</h3>
                <p className="text-gray-600">প্রাকৃতিক ভাষা বোঝে এবং মানবিক উত্তর দেয়</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 rounded-lg p-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">বিক্রয় বৃদ্ধি</h3>
                <p className="text-gray-600">দর্শকদের ক্রেতায় রূপান্তরিত করে</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 rounded-lg p-3">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">২৪/৭ উপলব্ধ</h3>
                <p className="text-gray-600">দিন রাত যেকোনো সময় সেবা প্রদান করে</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Logs */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">সাম্প্রতিক কার্যকলাপ</h2>
          <div className="space-y-4">
            {logs.length > 0 ? (
              logs.slice(0, 10).map((log, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    log.platform === 'whatsapp' ? 'bg-whatsapp' :
                    log.platform === 'messenger' ? 'bg-facebook' :
                    'bg-gradient-to-br from-purple-600 to-pink-500'
                  }`}>
                    <span className="text-white font-bold text-sm">
                      {log.platform === 'whatsapp' ? 'W' : log.platform === 'messenger' ? 'M' : 'I'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900">{log.platform.toUpperCase()}</span>
                      <span className="text-sm text-gray-500">{new Date(log.timestamp).toLocaleString('bn-BD')}</span>
                    </div>
                    <p className="text-gray-700 mb-1"><strong>গ্রাহক:</strong> {log.userMessage}</p>
                    <p className="text-gray-600"><strong>এজেন্ট:</strong> {log.agentResponse}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p className="text-lg">এখনো কোনো মেসেজ পাওয়া যায়নি</p>
                <p className="text-sm mt-2">Webhook সেটআপ করুন এবং গ্রাহকরা মেসেজ পাঠানো শুরু করুন</p>
              </div>
            )}
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-6">সেটআপ নির্দেশাবলী</h2>
          <div className="space-y-4 text-lg">
            <div className="flex items-start space-x-3">
              <span className="font-bold">১.</span>
              <p>Meta Developers এ গিয়ে আপনার WhatsApp Business API, Facebook Page এবং Instagram একাউন্ট সংযুক্ত করুন</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="font-bold">২.</span>
              <p>Webhook URL সেট করুন: <code className="bg-white/20 px-2 py-1 rounded">https://agentic-4d13543c.vercel.app/api/webhook/[platform]</code></p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="font-bold">৩.</span>
              <p>প্রয়োজনীয় Access Tokens এবং API Keys সংগ্রহ করে .env ফাইলে যোগ করুন</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="font-bold">৪.</span>
              <p>OpenAI API Key যোগ করে AI এজেন্ট সক্রিয় করুন</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
