import { NextResponse } from 'next/server'
import { getWriteClient } from '@/sanity/lib/write-client'

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5 // 5 requests per minute per IP

function getRateLimitKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'
  return ip
}

function checkRateLimit(key: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(key)

  if (!record || now > record.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }

  record.count++
  return true
}

// Clean up old entries periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetAt) {
        rateLimitMap.delete(key)
      }
    }
  }, RATE_LIMIT_WINDOW)
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request)
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, subject, message, honeypot } = body

    // Honeypot validation
    if (honeypot && honeypot.trim() !== '') {
      return NextResponse.json(
        { ok: false, error: 'Spam detected' },
        { status: 400 }
      )
    }

    // Field validation with trimming
    const trimmedName = name?.trim() || ''
    const trimmedEmail = email?.trim() || ''
    const trimmedSubject = subject?.trim() || ''
    const trimmedMessage = message?.trim() || ''

    if (trimmedName.length < 2) {
      return NextResponse.json(
        { ok: false, error: 'Name must be at least 2 characters' },
        { status: 400 }
      )
    }

    if (trimmedName.length > 100) {
      return NextResponse.json(
        { ok: false, error: 'Name must be less than 100 characters' },
        { status: 400 }
      )
    }

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid email address' },
        { status: 400 }
      )
    }

    if (trimmedEmail.length > 255) {
      return NextResponse.json(
        { ok: false, error: 'Email must be less than 255 characters' },
        { status: 400 }
      )
    }

    if (trimmedSubject.length > 200) {
      return NextResponse.json(
        { ok: false, error: 'Subject must be less than 200 characters' },
        { status: 400 }
      )
    }

    if (trimmedMessage.length < 10) {
      return NextResponse.json(
        { ok: false, error: 'Message must be at least 10 characters' },
        { status: 400 }
      )
    }

    if (trimmedMessage.length > 5000) {
      return NextResponse.json(
        { ok: false, error: 'Message must be less than 5000 characters' },
        { status: 400 }
      )
    }

    // Create contact message in Sanity
    const contactMessage = {
      _type: 'contactMessage',
      name: trimmedName,
      email: trimmedEmail,
      subject: trimmedSubject,
      message: trimmedMessage,
      status: 'new',
      createdAt: new Date().toISOString(),
    }

    await getWriteClient().create(contactMessage)

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)
    
    // Check if it's a missing token error
    if (error instanceof Error && error.message.includes('SANITY_API_WRITE_TOKEN')) {
      return NextResponse.json(
        { ok: false, error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { ok: false, error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}
