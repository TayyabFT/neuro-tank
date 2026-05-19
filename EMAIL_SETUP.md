# Email setup (EmailJS) — 5-minute one-time guide

Your contact form is wired up to send **two beautifully designed emails** every time a visitor submits it:

1. **Admin notification** → `neurotank2.5@gmail.com` (you, with all form data + a “Reply to {{name}}” button)
2. **Client confirmation** → the person who filled the form (impressive branded thank-you with “what happens next” steps)

We use **EmailJS** because:
- ✅ 100% free (200 emails / month — plenty)
- ✅ No backend / server needed — works from the React app
- ✅ Connects Gmail via secure Google OAuth (no need to expose your password)
- ✅ Full HTML template control (the designs you have in `email-templates/`)

> **About your password (``):** We can’t put it in the code — it would be exposed in the browser bundle and Gmail blocks browser-SMTP anyway. EmailJS solves this safely: you sign in to Google **once** in EmailJS’s secure popup, and from then on EmailJS sends mail on your behalf. Your password never touches our app.

---

## Step 1 — Create a free EmailJS account

1. Open <https://dashboard.emailjs.com/sign-up>
2. Sign up (you can sign up with Google using the same `neurotank2.5@gmail.com` to keep things simple)
3. Verify your email if prompted

## Step 2 — Connect your Gmail as an “Email Service”

1. In the EmailJS dashboard, click **Email Services → Add New Service**
2. Choose **Gmail**
3. Click **Connect Account** → sign in with `neurotank2.5@gmail.com` → allow access
4. Give it a name (e.g. `Neuro Tank Gmail`) and click **Create Service**
5. **Copy the Service ID** (looks like `service_xxxxxxx`) — you’ll need it in Step 5

## Step 3 — Create the **Admin notification** template

1. Go to **Email Templates → Create New Template**
2. Name it `Neuro Tank · Admin notification`
3. In the **Content** tab, switch to **HTML** mode (top-right toggle), then paste the entire contents of
   👉 `email-templates/admin-notification.html`
4. In the **Settings** tab (top of the editor) set:

   | Field | Value |
   |---|---|
   | Subject | `New lead from {{name}} — Neuro Tank` |
   | From name | `Neuro Tank Website` |
   | From email | `Use Default Email Address` (your Gmail) |
   | To email | `{{to_email}}` |
   | Reply to | `{{reply_to}}` |

5. Click **Save**, then **copy the Template ID** (looks like `template_xxxxx`)

## Step 4 — Create the **Client confirmation** template

1. **Email Templates → Create New Template** again
2. Name it `Neuro Tank · Client confirmation`
3. In **Content → HTML**, paste the contents of
   👉 `email-templates/client-confirmation.html`
4. In **Settings**:

   | Field | Value |
   |---|---|
   | Subject | `We've got your request, {{name}} — Neuro Tank` |
   | From name | `Neuro Tank` |
   | From email | `Use Default Email Address` (your Gmail) |
   | To email | `{{email}}` |
   | Reply to | `{{company_email}}` |   

5. Click **Save** and **copy this Template ID** too

## Step 5 — Grab your **Public Key**

1. In the EmailJS dashboard, click **Account → General**
2. Copy the **Public Key** (it's safe to expose in the browser)

## Step 6 — Add the 4 values to your `.env` file

**Important:** Vite reads `.env` only — **not** `.env.example`.

In the project root (`neuro-tank` folder), create a file named exactly:

```
.env
```

Copy the 4 lines from `.env.example` and replace with your real IDs:

```env
VITE_EMAILJS_SERVICE_ID=service_cnnu5r4
VITE_EMAILJS_ADMIN_TEMPLATE_ID=template_g4euubg
VITE_EMAILJS_CLIENT_TEMPLATE_ID=template_1gnyocd
VITE_EMAILJS_PUBLIC_KEY=VquLlhizxDQz5ewO_
```

(No quotes around values. No spaces around `=`.)

## Step 7 — Restart the dev server (required)

```bash
npm run dev
```

Vite only reads `.env` on startup, so a restart is required. After that, fill out the contact form and within seconds:
- You'll get the **admin notification** in `neurotank2.5@gmail.com`
- The form submitter will get the **branded confirmation**

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Form shows _"Email service not configured"_ | `.env` file is missing or the keys are placeholders — re-check Step 6 and **restart `npm run dev`** |
| 412 / unauthorized error | Open EmailJS → **Account → Security** → make sure “Allow EmailJS API for non-browser apps” is **off**, and your domain is in the allowed list (or use the wildcard during dev) |
| Email lands in spam | Open the mail once and click “Not spam” — happens with all new senders. Or add SPF/DKIM to your domain (only needed when you connect a custom domain instead of Gmail) |
| Variable shows as `{{name}}` literally in the email | The template wasn’t saved in HTML mode — re-paste in the **HTML** tab |

You only do this setup **once**. After that everything is automatic.
