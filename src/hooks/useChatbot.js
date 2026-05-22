import { useCallback, useEffect, useRef, useState } from 'react'
import { WELCOME_MESSAGE } from '@/lib/chatbot/constants.js'
import { streamChat } from '@/lib/chatbot/streamChat.js'

function createId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function formatTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(() => [
    {
      id: 'welcome',
      role: WELCOME_MESSAGE.role,
      content: WELCOME_MESSAGE.content,
      createdAt: formatTime(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)

  const toggle = useCallback(() => setIsOpen((v) => !v), [])
  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    return () => abortRef.current?.abort()
  }, [])

  const sendMessage = useCallback(
    async (text) => {
      const content = text?.trim()
      if (!content || isLoading) return

      setError(null)
      const userMsg = {
        id: createId(),
        role: 'user',
        content,
        createdAt: formatTime(),
      }

      const assistantId = createId()
      const apiMessages = [
        ...messages
          .filter((m) => m.id !== 'welcome')
          .map((m) => ({ role: m.role, content: m.content })),
        { role: 'user', content },
      ]

      setMessages((prev) => [...prev, userMsg])
      setIsLoading(true)

      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      let streamed = ''

      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: 'assistant',
          content: '',
          createdAt: formatTime(),
          streaming: true,
        },
      ])

      try {
        await streamChat({
          messages: apiMessages,
          signal: controller.signal,
          onStart: () => {},
          onDelta: (chunk) => {
            streamed += chunk
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId ? { ...m, content: streamed } : m,
              ),
            )
          },
        })

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: streamed || m.content, streaming: false }
              : m,
          ),
        )
      } catch (err) {
        if (err.name === 'AbortError') return
        const fallback =
          err.message ||
          'Unable to reach our assistant right now. Email neurotank2.5@gmail.com or visit /contact.'
        setError(fallback)
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: fallback,
                  streaming: false,
                  isError: true,
                }
              : m,
          ),
        )
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, messages],
  )

  return {
    isOpen,
    toggle,
    close,
    messages,
    isLoading,
    error,
    sendMessage,
    setError,
  }
}
