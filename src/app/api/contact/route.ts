import { NextResponse } from 'next/server'
import { Resend } from 'resend'

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

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('Missing environment variable: RESEND_API_KEY')
  }
  return new Resend(apiKey)
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

    // Send email using Resend
    try {
      const resend = getResendClient()
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
      const toEmail = 'fabiankivipa@yahoo.com'

      const emailSubject = trimmedSubject
        ? `New Contact Form Submission — ${trimmedSubject}`
        : 'New Contact Form Submission — Fabian IT Solutions'

      const emailBody = `
New contact form submission from Fabian IT Solutions website:

Name: ${trimmedName}
Email: ${trimmedEmail}
${trimmedSubject ? `Subject: ${trimmedSubject}` : ''}
Timestamp: ${new Date().toISOString()}

Message:
${trimmedMessage}
      `.trim()

      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: emailSubject,
        text: emailBody,
        replyTo: trimmedEmail,
      })
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      return NextResponse.json(
        {
          ok: false,
          error:
            emailError instanceof Error && emailError.message.includes('RESEND_API_KEY')
              ? 'Email service not configured. Please contact support directly.'
              : 'Failed to send email. Please try again later or contact us directly.',
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)

    return NextResponse.json(
      { ok: false, error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}
