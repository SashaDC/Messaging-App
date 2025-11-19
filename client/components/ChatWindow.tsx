import { useState } from 'react'
import { MessageBubble } from './MessageBubble'
import LogoutButton from './LogoutButton'

type Message = {
  id: number
  text: string
  sender: 'me' | 'them'
  createdAt?: string
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: 'Hey, what are you doing? ',
    sender: 'them',
    createdAt: '10:01',
  },
  {
    id: 2,
    text: 'Hi, just creating a messages app',
    sender: 'me',
    createdAt: '10:02',
  },
  {
    id: 3,
    text: 'Nice, can’t wait to see it!',
    sender: 'them',
    createdAt: '10:03',
  },
]

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const trimmed = newMessage.trim()
    if (!trimmed) return

    const newMsg: Message = {
      id: Date.now(),
      text: trimmed,
      sender: 'me',
      createdAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    setMessages((prev) => [...prev, newMsg])
    setNewMessage('')
  }

  return (
    <div className="flex min-h-screen bg-[#10002B] text-white">
      {/* Sidebar (can be wired later) */}
      <aside className="hidden border-r border-[#3C096C] bg-[#240046] p-4 md:flex md:w-64">
        <div className="w-full">
          <h2 className="mb-4 text-lg font-semibold">Chats</h2>
          <p className="text-xs opacity-70">Friends list will go here later.</p>
        </div>
      </aside>

      {/* Main chat area */}
      <main className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-[#5A189A] bg-[#3C096C] px-4">
          <div>
            <h1 className="text-sm font-semibold md:text-base">DevConnect</h1>
            <p className="text-xs opacity-70">Messaging app</p>
          </div>
          <span className="text-xs opacity-70">Display Messages MVP</span>
          <LogoutButton />
        </header>

        {/* Messages list */}
        <section className="flex-1 space-y-1 overflow-y-auto p-4">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </section>

        <form
          onSubmit={handleSubmit}
          className="flex gap-2 border-t border-[#3C096C] bg-[#240046] p-3"
        >
          <input
            className="flex-1 rounded-full border border-[#5A189A] bg-[#10002B] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
            placeholder="Type a message…"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className="rounded-full bg-[#7B2CBF] px-4 py-2 text-sm font-medium hover:bg-[#9D4EDD]"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  )
}
