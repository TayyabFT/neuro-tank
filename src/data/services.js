import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineGlobeAlt,
  HiOutlineCalendarDays,
  HiOutlineLifebuoy,
  HiOutlineCircleStack,
  HiOutlineSparkles,
  HiOutlineBolt,
  HiOutlineCpuChip,
} from 'react-icons/hi2'

export const SERVICES = [
  {
    id: 'whatsapp',
    icon: HiOutlineChatBubbleLeftRight,
    title: 'WhatsApp AI Chatbots',
    short: 'Instant 24/7 replies on the channel your customers already use.',
    description:
      'Turn WhatsApp into your highest-converting sales channel. Our AI agents qualify leads, answer FAQs, send catalogs and book appointments — all inside the chat, in under 3 seconds.',
    bullets: [
      'Reply in <3s, 24/7 — never miss an enquiry',
      'Catalog, brochures, voice notes, payments',
      'Multi-language, human handoff, full transcripts',
    ],
    accent: 'from-emerald-400 via-cyan-400 to-violet-500',
  },
  {
    id: 'website-ai',
    icon: HiOutlineGlobeAlt,
    title: 'Website AI Assistants',
    short: 'A friendly AI concierge embedded on every page of your site.',
    description:
      'Drop-in AI assistants trained on your services, pricing, and brand voice. They guide visitors, collect leads, and route hot prospects to your team in real time.',
    bullets: [
      'Trained on your docs, FAQs and offers',
      'Captures qualified leads to CRM',
      'Pixel-perfect on any framework',
    ],
    accent: 'from-cyan-400 via-blue-500 to-violet-600',
  },
  {
    id: 'booking',
    icon: HiOutlineCalendarDays,
    title: 'AI Appointment & Booking',
    short: 'End-to-end booking flows that fill your calendar overnight.',
    description:
      'From restaurants to clinics, our AI checks availability, books appointments, sends reminders, and reschedules — connected to Google Calendar, Calendly, and your in-house systems.',
    bullets: [
      'Two-way calendar sync',
      'Automatic reminders & no-show recovery',
      'Industry-specific scripts',
    ],
    accent: 'from-violet-400 via-fuchsia-500 to-pink-500',
  },
  {
    id: 'support',
    icon: HiOutlineLifebuoy,
    title: 'AI Customer Support',
    short: 'Resolve 80% of tickets without a human in the loop.',
    description:
      'AI support agents trained on your knowledge base handle returns, status questions, and troubleshooting — escalating only the right tickets to humans.',
    bullets: [
      '80% deflection rate average',
      'Knowledge-base auto-sync',
      'Sentiment & escalation analytics',
    ],
    accent: 'from-fuchsia-400 via-pink-500 to-rose-500',
  },
  {
    id: 'crm',
    icon: HiOutlineCircleStack,
    title: 'CRM Automation',
    short: 'Auto-update your CRM, score leads, and trigger campaigns.',
    description:
      'Connect HubSpot, Salesforce, Zoho, GoHighLevel or Airtable. We automate lead scoring, follow-ups, deal stages, and personalized email/SMS sequences.',
    bullets: [
      'Native integrations with 40+ CRMs',
      'AI-powered lead scoring',
      'Triggered follow-up sequences',
    ],
    accent: 'from-sky-400 via-cyan-500 to-emerald-500',
  },
  {
    id: 'lead-gen',
    icon: HiOutlineSparkles,
    title: 'Lead Generation Systems',
    short: 'AI-built outbound machines that find and warm up buyers.',
    description:
      'Apollo + AI enrichment + multi-channel outreach. Our systems source ideal prospects, personalize at scale, and hand off warm leads to your sales team.',
    bullets: [
      'Cold email, LinkedIn, WhatsApp outreach',
      '100% AI-personalized first lines',
      'Inbox warming & deliverability',
    ],
    accent: 'from-amber-400 via-orange-500 to-rose-500',
  },
  {
    id: 'sales-agent',
    icon: HiOutlineBolt,
    title: 'AI Sales Agents',
    short: 'Voice & chat agents that close like a top-1% salesperson.',
    description:
      'Autonomous sales agents that call, qualify, demo, handle objections, and book closes. Backed by real-time speech and your top-performer playbooks.',
    bullets: [
      'Voice cloning + real-time speech',
      'Trained on your top closer\'s calls',
      'Books meetings straight into calendar',
    ],
    accent: 'from-violet-500 via-indigo-500 to-cyan-500',
  },
  {
    id: 'custom',
    icon: HiOutlineCpuChip,
    title: 'Custom AI Automation',
    short: 'A bespoke AI stack designed around your unique workflow.',
    description:
      'From document processing to internal copilots, we architect end-to-end AI automations tailored to your stack — built with the same care as a product.',
    bullets: [
      'Discovery → architecture → build → train',
      'Full ownership, no lock-in',
      'Lifetime optimization included',
    ],
    accent: 'from-cyan-400 via-violet-500 to-fuchsia-500',
  },
]
