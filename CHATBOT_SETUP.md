# Neuro Tank AI Chatbot Setup

The site includes a company-only AI assistant powered by **Groq** with a local knowledge base. The API key stays on the server — never in the browser.

## 1. Get a Groq API key

1. Sign up at [console.groq.com](https://console.groq.com)
2. Create an API key
3. Add it to your environment file

## 2. Environment variables

Copy from `.env.example` into **`.env`** (same file you use for EmailJS):

```env
GROQ_API_KEY=gsk_your_key_here
GROQ_MODEL=llama-3.1-8b-instant
```

**Important:** Do **not** use `VITE_` prefix for `GROQ_API_KEY`. Vite would expose it to the client bundle.

Restart the dev server after changing `.env`:

```bash
npm run dev
```

## 3. Local development

`vite.config.js` registers a dev middleware at `POST /api/chat` that:

- Loads knowledge from `server/chat/knowledge.json`
- Retrieves relevant chunks for each question
- Calls Groq with a strict system prompt
- Streams SSE responses to the widget

## 4. Production (Vercel recommended)

Deploy with the included serverless function:

- `api/chat.js` → `POST /api/chat`

Set `GROQ_API_KEY` and optional `GROQ_MODEL` in the Vercel project **Environment Variables**.

Static-only hosting (no serverless) will **not** run the chat API unless you proxy `/api/chat` to a backend.

## 5. Knowledge base

Edit `server/chat/knowledge.json` to update:

- Services, pricing, FAQs, contact info
- Industries, onboarding, integrations

The bot is instructed to answer **only** from this knowledge. Off-topic questions receive a fixed refusal message.

## 6. Security

- Input sanitization and length limits
- Prompt-injection pattern blocking
- Rate limiting (25 requests / minute / IP)
- No system prompt or API keys sent to the client

## 7. Troubleshooting

| Issue | Fix |
|-------|-----|
| "Chat service is not configured" | Add `GROQ_API_KEY` to `.env` and restart dev server |
| 429 Too many requests | Wait 60 seconds |
| Works locally but not in production | Set env vars on Vercel; confirm `api/chat` is deployed |
| Wrong answers | Update `server/chat/knowledge.json` chunks |
