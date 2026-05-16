import { HiOutlineChatBubbleBottomCenterText, HiOutlineBeaker, HiOutlineCog6Tooth, HiOutlineRocketLaunch } from 'react-icons/hi2'

export const PROCESS_STEPS = [
  {
    id: '01',
    icon: HiOutlineChatBubbleBottomCenterText,
    title: 'Consultation',
    description: 'We map your workflow, identify the highest-leverage automations, and ship a tailored plan within 48 hours.',
    duration: '48 hours',
  },
  {
    id: '02',
    icon: HiOutlineBeaker,
    title: 'AI Development',
    description: 'Our team designs the AI agent, trains it on your brand voice and data, and builds a private staging environment.',
    duration: '1–2 weeks',
  },
  {
    id: '03',
    icon: HiOutlineCog6Tooth,
    title: 'Integration',
    description: 'We connect to your CRM, calendar, payment & messaging stack. End-to-end testing with your team.',
    duration: '3–5 days',
  },
  {
    id: '04',
    icon: HiOutlineRocketLaunch,
    title: 'Automation Launch',
    description: 'Go-live with monitoring dashboards. We continually fine-tune for accuracy, conversion and CSAT.',
    duration: 'Ongoing',
  },
]
