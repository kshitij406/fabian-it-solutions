'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
  honeypot: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        honeypot: '',
      })
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'An error occurred'
      )
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name <span className="text-destructive">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-border/40 bg-background px-4 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email <span className="text-destructive">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-border/40 bg-background px-4 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full rounded-md border border-border/40 bg-background px-4 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message <span className="text-destructive">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full rounded-md border border-border/40 bg-background px-4 py-3 text-sm leading-relaxed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      {status === 'error' && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          {errorMessage || 'Failed to send message. Please try again.'}
        </div>
      )}

      {status === 'success' && (
        <div className="rounded-md border border-green-500/40 bg-green-500/10 p-4 text-sm text-green-700 dark:text-green-400">
          Thank you! Your message has been sent successfully.
        </div>
      )}

      <Button
        type="submit"
        disabled={status === 'loading'}
        size="lg"
        className="w-full h-12"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
