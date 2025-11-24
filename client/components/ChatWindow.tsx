import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { MessageBubble } from './MessageBubble'
import LogoutButton from './LogoutButton'
import type { ChatOutletContext } from '../../models/outletContext'
import SettingsButton from './SettingsButton'
import type { Message } from '../../models/message'

// Dummy messages grouped by friend ID
const initialMessagesByFriend: Record<number, Message[]> = {
  1: [
    { id: 1, text: 'Hey Sasha!', sender: 'me', createdAt: '10:01' },
    { id: 2, text: 'How are you?', sender: 'me', createdAt: '10:02' },
  ],
  2: [{ id: 3, text: 'Kia ora Lucas!', sender: 'me', createdAt: '11:15' }],
  3: [{ id: 4, text: 'Hi Jennifer', sender: 'me', createdAt: '09:30' }],
}

export function ChatWindow() {
  const { friends, activeFriendId } = useOutletContext<ChatOutletContext>()

  const [messagesByFriend, setMessagesByFriend] = useState(
    initialMessagesByFriend,
  )

  const messages = messagesByFriend[activeFriendId] ?? []

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

    setMessagesByFriend((prev) => ({
      ...prev,
      [activeFriendId]: [...(prev[activeFriendId] ?? []), newMsg],
    }))

    setNewMessage('')
  }

  const activeFriendName =
    friends.find((f) => f.id === activeFriendId)?.name ?? 'Friend'

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-[#5A189A] bg-[#3C096C] px-4">
        <div>
          <h1 className="text-sm font-semibold md:text-base">
            {activeFriendName}
          </h1>
          <p className="text-xs opacity-70">Chatting on DevConnect</p>
        </div>
        <div>
          {' '}
          <SettingsButton />
          <LogoutButton />
        </div>
      </header>

      {/* Messages list */}
      <section className="flex-1 space-y-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </section>

      {/* Message input */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-t border-[#3C096C] bg-[#240046] p-3"
      >
        <input
          className="flex-1 rounded-full border border-[#5A189A] bg-[#10002B] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
          placeholder={`Message ${activeFriendName}…`}
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
    </div>
  )
}
