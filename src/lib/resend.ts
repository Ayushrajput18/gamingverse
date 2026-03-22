import { Resend } from 'resend'

const globalForResend = globalThis as unknown as { resend: Resend }

export const resend =
  globalForResend.resend ??
  new Resend(process.env.RESEND_API_KEY || 're_dummy')

if (process.env.NODE_ENV !== 'production') {
  globalForResend.resend = resend
}

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'receipts@gamingversestudios.com'
