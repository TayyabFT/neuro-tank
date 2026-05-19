import emailjs from '@emailjs/browser'

const SERVICE_ID         = import.meta.env.VITE_EMAILJS_SERVICE_ID
const ADMIN_TEMPLATE_ID  = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID
const CLIENT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CLIENT_TEMPLATE_ID
const PUBLIC_KEY         = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export const EMAIL_CONFIGURED = Boolean(
  SERVICE_ID && ADMIN_TEMPLATE_ID && CLIENT_TEMPLATE_ID && PUBLIC_KEY,
)

const ADMIN_INBOX = 'neurotank2.5@gmail.com'

/**
 * Sends two emails when a contact form is submitted:
 *  1. Notification email -> neurotank2.5@gmail.com (admin)
 *  2. Confirmation email -> the client (the person who filled the form)
 */
export async function sendContactEmails(data) {
  if (!EMAIL_CONFIGURED) {
    throw new Error(
      'Email service not configured. Add EmailJS keys to your .env file. See EMAIL_SETUP.md.',
    )
  }

  const params = {
    // person who filled the form
    name: (data.name || '').trim(),
    email: (data.email || '').trim(),
    company: (data.company || '').trim() || 'Not provided',
    service: data.service || 'Not specified',
    budget: data.budget || 'Not specified',
    message: (data.message || '').trim() || 'No additional message.',
    submitted_at: new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
    }),
    // routing
    to_email: ADMIN_INBOX,
    reply_to: (data.email || '').trim(),
    company_name: 'Neuro Tank',
    company_email: ADMIN_INBOX,
    company_phone: '+92 345 1109384',
    company_location: 'Lahore, Pakistan',
  }

  // Both go in parallel; admin email is critical, client confirmation is best-effort
  const [adminResult, clientResult] = await Promise.allSettled([
    emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, params, { publicKey: PUBLIC_KEY }),
    emailjs.send(SERVICE_ID, CLIENT_TEMPLATE_ID, params, { publicKey: PUBLIC_KEY }),
  ])

  if (adminResult.status === 'rejected') {
    throw adminResult.reason instanceof Error
      ? adminResult.reason
      : new Error('Failed to send notification email.')
  }

  return {
    adminSent: true,
    clientSent: clientResult.status === 'fulfilled',
  }
}
