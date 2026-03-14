import { Resend } from 'resend'
import type { ReactElement } from 'react'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendEmailOptions {
  to: string | string[]
  subject: string
  react: ReactElement
  from?: string
}

export async function sendEmail({ to, subject, react, from }: SendEmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: from ?? process.env.RESEND_FROM_EMAIL!,
      to: Array.isArray(to) ? to : [to],
      subject,
      react,
    })

    if (error) {
      console.error('[resend] send error', error)
      throw new Error(error.message)
    }

    return data
  } catch (error) {
    console.error('[resend] sendEmail failed', error)
    throw error
  }
}
