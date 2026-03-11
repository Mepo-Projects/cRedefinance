import { Resend } from 'resend';
import {
  WAITLIST_NOTIFICATION_SUBJECT,
  validateWaitlistPayload,
} from '../src/lib/waitlist';

export const config = {
  runtime: 'nodejs',
};

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildWaitlistEmailText(
  values: {
    name: string;
    companyName: string;
    email: string;
    linkedin: string;
  },
  submittedAt: string,
) {
  return [
    'New waitlist application',
    '',
    `Submitted: ${submittedAt}`,
    `Name: ${values.name}`,
    `Company Name: ${values.companyName}`,
    `Email: ${values.email}`,
    `LinkedIn: ${values.linkedin}`,
  ].join('\n');
}

function buildWaitlistEmailHtml(
  values: {
    name: string;
    companyName: string;
    email: string;
    linkedin: string;
  },
  submittedAt: string,
) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="margin-bottom: 16px;">New waitlist application</h2>
      <p><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
      <p><strong>Name:</strong> ${escapeHtml(values.name)}</p>
      <p><strong>Company Name:</strong> ${escapeHtml(values.companyName)}</p>
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(values.email)}">${escapeHtml(values.email)}</a></p>
      <p><strong>LinkedIn:</strong> <a href="${escapeHtml(values.linkedin)}">${escapeHtml(values.linkedin)}</a></p>
    </div>
  `;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const notificationTo = process.env.WAITLIST_NOTIFICATION_TO;
  const fromEmail = process.env.WAITLIST_FROM_EMAIL;
  const fromName = process.env.WAITLIST_FROM_NAME || 'Redefinance Credit';

  if (!resendApiKey || !notificationTo || !fromEmail) {
    console.error('Waitlist env vars are missing.');
    return res.status(500).json({
      message: 'Waitlist email is not configured yet.',
    });
  }

  let payload: Record<string, unknown>;

  try {
    payload =
      typeof req.body === 'string' ? JSON.parse(req.body) : (req.body ?? {});
  } catch {
    return res.status(400).json({ message: 'Invalid request body.' });
  }

  const { values, errors, isValid } = validateWaitlistPayload(payload);

  if (values.website) {
    return res.status(200).json({ ok: true });
  }

  if (!isValid) {
    return res.status(400).json({
      message: 'Please review the highlighted fields and try again.',
      errors,
    });
  }

  const submittedAt = new Date().toISOString();
  const resend = new Resend(resendApiKey);

  try {
    const { error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [notificationTo],
      replyTo: values.email,
      subject: WAITLIST_NOTIFICATION_SUBJECT,
      text: buildWaitlistEmailText(values, submittedAt),
      html: buildWaitlistEmailHtml(values, submittedAt),
    });

    if (error) {
      console.error('Resend returned an error for waitlist email.', error);
      return res.status(502).json({
        message: 'We could not submit your application right now.',
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Unexpected waitlist email failure.', error);
    return res.status(500).json({
      message: 'We could not submit your application right now.',
    });
  }
}
