export const CHAT_API_URL = '/api/chat'

export const REFUSAL_HINT =
  'I am only trained to answer questions related to our company, services, pricing, and automation solutions.'

export const SUGGESTED_PROMPTS = [
  { id: 'pricing', label: 'Ask about pricing', message: 'What are your pricing plans?' },
  { id: 'services', label: 'Our services', message: 'What AI automation services do you offer?' },
  { id: 'consultation', label: 'Book consultation', message: 'How do I book a free consultation?' },
  { id: 'industries', label: 'Industries we serve', message: 'Which industries do you specialize in?' },
]

export const WELCOME_MESSAGE = {
  role: 'assistant',
  content:
    "Hi — I'm Neuro Tank's AI assistant. Ask me about our services, pricing, WhatsApp & website chatbots, integrations, or how to book a consultation.",
}
