# Nebula

Embeddable FAQ chatbot. A client logs in, types their own Q&A pairs, pastes a script tag on their site, and visitors get answers from that FAQ (or “Please contact us”).

Phase 2–4 (inquiry dashboard, analytics, extra branding) stay out until this loop is selling.

## Local setup

1. Accept Clerk Marketplace terms: [vercel.com/sulo/~/integrations/accept-terms/clerk](https://vercel.com/sulo/~/integrations/accept-terms/clerk?source=cli) then rerun:

```
npx vercel integration add clerk --plan hobby_2025_08 --no-claim
npx vercel integration add supabase --plan free --no-claim
npx vercel integration add stripe --plan sandbox --no-claim
npx vercel env pull --yes
```

Or paste keys by hand into `.env.local`:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

GROQ_API_KEY=
GROQ_MODEL=openai/gpt-oss-20b

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID=

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

2. In the Supabase SQL editor, run `supabase/schema.sql`.
3. Create a Groq API key at [console.groq.com](https://console.groq.com).
4. Stripe: test mode is enough. If `STRIPE_PRICE_ID` is empty, checkout creates a $29/mo price automatically. For webhooks locally: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.
5. `npm install` then `npm run dev`.

Dashboard FAQ + widget settings are gated on an active Stripe subscription (test card `4242…` works). After checkout, you land on billing with `session_id` so access unlocks even before the webhook fires.

## Routes

- `/` landing
- `/templates` Folio, DSGVO-ready website templates for the German market (`/templates/impressum`, `/templates/datenschutz`)
- `/sign-in` `/sign-up` Clerk
- `/dashboard` FAQ table
- `/dashboard/settings` name, color, script tag
- `/dashboard/billing` $29/mo Checkout
- `/widget.js` embed script (`data-client="nb_…"`)
- `POST /api/chat` `{ publicKey, message }`
