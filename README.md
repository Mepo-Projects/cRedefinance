
  # Untitled

  This is a code bundle for Untitled. The original project is available at https://www.figma.com/design/TvxlGF5UWsWCx7PMce3mT9/Untitled.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Waitlist Email Setup

  The waitlist form posts to `/api/waitlist`, which is designed for Vercel Functions and sends notification emails with Resend.

  Set these environment variables in Vercel:

  - `RESEND_API_KEY`
  - `WAITLIST_NOTIFICATION_TO`
  - `WAITLIST_FROM_EMAIL`
  - `WAITLIST_FROM_NAME`

  A starter template is included in `.env.example`.
  
