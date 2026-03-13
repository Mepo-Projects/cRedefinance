import nodemailer from 'nodemailer';

export const config = {
  runtime: 'nodejs',
};

function validatePayload(payload: Record<string, unknown>) {
  const errors: Record<string, string> = {};

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const role = typeof payload.role === 'string' ? payload.role.trim() : '';
  const company = typeof payload.company === 'string' ? payload.company.trim() : '';
  const linkedin = typeof payload.linkedin === 'string' ? payload.linkedin.trim() : '';

  if (!name || name.length < 2) errors.name = 'Enter your full name.';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.';
  if (!role || role.length < 2) errors.role = 'Enter your role.';
  if (!company || company.length < 2) errors.company = 'Enter your company name.';
  if (!linkedin) errors.linkedin = 'Enter your LinkedIn URL.';

  return {
    values: { name, email, role, company, linkedin },
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}

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

  const { values, errors, isValid } = validatePayload(payload);

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
      subject: `New founding client application — ${values.name} @ ${values.company}`,
      text: [
        'New founding client application',
        '',
        `Submitted: ${submittedAt}`,
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        `Role: ${values.role}`,
        `Company: ${values.company}`,
        `LinkedIn: ${values.linkedin}`,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2 style="margin-bottom: 16px;">New founding client application</h2>
          <p><strong>Submitted:</strong> ${submittedAt}</p>
          <p><strong>Name:</strong> ${values.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${values.email}">${values.email}</a></p>
          <p><strong>Role:</strong> ${values.role}</p>
          <p><strong>Company:</strong> ${values.company}</p>
          <p><strong>LinkedIn:</strong> <a href="${values.linkedin}">${values.linkedin}</a></p>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Failed to send founding offer email.', error);
    return res.status(500).json({
      message: 'We could not submit your application right now.',
    });
  }
}
