/// <reference types="node" />
import nodemailer from 'nodemailer';
import {
  WAITLIST_NOTIFICATION_SUBJECT,
  validateWaitlistPayload,
} from '../src/lib/waitlist.js';

export const config = {
  runtime: 'nodejs',
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const notificationTo = process.env.NOTIFICATION_TO;

  if (!gmailUser || !gmailAppPassword || !notificationTo) {
    console.error('Email env vars are missing.');
    return res.status(500).json({ message: 'Email is not configured yet.' });
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

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  const submittedAt = new Date().toISOString();

  try {
    await transporter.sendMail({
      from: `Redefinance <${gmailUser}>`,
      to: notificationTo,
      replyTo: values.email,
      subject: WAITLIST_NOTIFICATION_SUBJECT,
      text: [
        'New waitlist application',
        '',
        `Submitted: ${submittedAt}`,
        `Name: ${values.name}`,
        `Company: ${values.companyName}`,
        `Email: ${values.email}`,
        `LinkedIn: ${values.linkedin}`,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2 style="margin-bottom: 16px;">New waitlist application</h2>
          <p><strong>Submitted:</strong> ${submittedAt}</p>
          <p><strong>Name:</strong> ${values.name}</p>
          <p><strong>Company:</strong> ${values.companyName}</p>
          <p><strong>Email:</strong> <a href="mailto:${values.email}">${values.email}</a></p>
          <p><strong>LinkedIn:</strong> <a href="${values.linkedin}">${values.linkedin}</a></p>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Failed to send waitlist email.', error);
    return res.status(500).json({
      message: 'We could not submit your application right now.',
    });
  }
}
