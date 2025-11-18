import { useState } from 'react'
import { MessageBubble } from './MessageBubble'

type Message = {
  id: number
  text: string
  sender: 'me' | 'them'
  createdAt?: string
}

const initialMessages: Message[] = [
  { id: 1, text: 'Hey, what are you doing? ', sender: 'them', createdAt: '10:01' },
  { id: 2, text: 'Hi, just creating a messages app', sender: 'me', createdAt: '10:02' },
  { id: 3, text: 'Nice, can’t wait to see it!', sender: 'them', createdAt: '10:03' },
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
    <div className="min-h-screen flex bg-[#10002B] text-white">
      {/* Sidebar (can be wired later) */}
      <aside className="hidden md:flex md:w-64 bg-[#240046] border-r border-[#3C096C] p-4">
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-4">Chats</h2>
          <p className="text-xs opacity-70">
            Friends list will go here later.
          </p>
        </div>
      </aside>

      {/* Main chat area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 bg-[#3C096C] border-b border-[#5A189A]">
          <div>
            <h1 className="font-semibold text-sm md:text-base">DevConnect</h1>
            <p className="text-xs opacity-70">Messaging app</p>
          </div>
          <span className="text-xs opacity-70">Display Messages MVP</span>
        </header>

        {/* Messages list */}
        <section className="flex-1 p-4 space-y-1 overflow-y-auto">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </section>

        <form
           onSubmit={handleSubmit}
           className="flex gap-2 p-3 bg-[#240046] border-t border-[#3C096C]"
>
          <input
           className="flex-1 rounded-full px-3 py-2 bg-[#10002B] border border-[#5A189A] text-sm focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
           placeholder="Type a message…"
           value={newMessage}
           onChange={(e) => setNewMessage(e.target.value)}
  />
          <button
           type="submit"
           className="px-4 py-2 rounded-full bg-[#7B2CBF] hover:bg-[#9D4EDD] text-sm font-medium"
  >
           Send
  </button>
</form>

      </main>
    </div>
  )
}
