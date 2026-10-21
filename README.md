# Satev Group website

Source code for the Satev Group website at [satev.tech](https://satev.tech).

## Local development

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Run `npm run build`, `npm run lint`, and `npm test` before deployment.

## Configuration

Copy `.env.example` to a local `.env` file and configure the server-only email settings. Do not commit API keys or other credentials. Production environment variables belong in the deployment platform, not this repository.

The contact API under `app/api/inquiries/` validates submissions and uses Resend to deliver inquiries to the company mailbox. Verify the sending domain and receiving mailbox before going live.
