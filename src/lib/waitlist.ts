export type WaitlistFormValues = {
  name: string;
  companyName: string;
  email: string;
  linkedin: string;
  website: string;
};

export const WAITLIST_NOTIFICATION_SUBJECT =
  '[Redefinance Credit] New waitlist application';

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidFullName(value: string) {
  return value.trim().split(/\s+/).length >= 2;
}

export function isValidCompanyName(value: string) {
  return value.trim().length >= 2;
}

export function normalizeLinkedInUrl(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return '';
  }

  return trimmedValue.startsWith('http') ? trimmedValue : `https://${trimmedValue}`;
}

export function isValidLinkedInUrl(value: string) {
  try {
    const normalizedValue = normalizeLinkedInUrl(value);
    const url = new URL(normalizedValue);
    const hostname = url.hostname.replace(/^www\./, '').toLowerCase();
    const pathname = url.pathname.replace(/\/+$/, '');

    return hostname === 'linkedin.com' && pathname.length > 1;
  } catch {
    return false;
  }
}

export function normalizeWaitlistPayload(
  input: Partial<WaitlistFormValues>,
): WaitlistFormValues {
  return {
    name: String(input.name ?? '').trim(),
    companyName: String(input.companyName ?? '').trim(),
    email: String(input.email ?? '').trim(),
    linkedin: normalizeLinkedInUrl(String(input.linkedin ?? '')),
    website: String(input.website ?? '').trim(),
  };
}

export function validateWaitlistPayload(input: Partial<WaitlistFormValues>) {
  const values = normalizeWaitlistPayload(input);
  const errors: Partial<Record<keyof WaitlistFormValues, string>> = {};

  if (!isValidFullName(values.name)) {
    errors.name = 'Enter your first and last name.';
  }

  if (!isValidCompanyName(values.companyName)) {
    errors.companyName = 'Enter a valid company name.';
  }

  if (!emailPattern.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!isValidLinkedInUrl(values.linkedin)) {
    errors.linkedin = 'Enter a valid LinkedIn profile or company URL.';
  }

  return {
    values,
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}
