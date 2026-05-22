import { handleChatWebRequest } from '../server/chat/handler.mjs'

export const config = {
  runtime: 'nodejs',
  maxDuration: 30,
}

export default async function handler(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  return handleChatWebRequest(request)
}
