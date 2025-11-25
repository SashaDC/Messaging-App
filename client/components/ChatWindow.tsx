import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { MessageBubble } from './MessageBubble'
import LogoutButton from './LogoutButton'
import type { ChatOutletContext } from '../../models/outletContext'
import SettingsButton from './SettingsButton'
import { useMessages } from '../hooks/useMessages'
import { getMessages } from '../apis/messages'
import { Message } from '../../models/message'

// Start with empty messages
const emptyInitial: Record<number, Message[]> = {}

export function ChatWindow() {
  const { friends, activeFriendId, currentUserId } =
    useOutletContext<ChatOutletContext>()

  const [newMessage, setNewMessage] = useState('')
  const { messages, sendMessage } = useMessages(activeFriendId, currentUserId)

  useEffect(() => {
    async function load() {
      if (!currentUserId) return

      const userId = Number(currentUserId)
      if (isNaN(userId))
        return console.error('Invalid currentUserId:', currentUserId)

      try {
        const dbMessages = await getMessages(userId)

        // Group messages by friendshipId
        const grouped: Record<number, Message[]> = {}

        for (const msg of dbMessages) {
          const fid = msg.friendshipId

          if (!grouped[fid]) grouped[fid] = []

          grouped[fid].push(msg)
        }
      } catch (err) {
        console.error('Error loading DB messages:', err)
      }
    }

    load()
  }, [currentUserId])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const trimmed = newMessage.trim()
    if (!trimmed) return

    sendMessage(activeFriendId, currentUserId, trimmed)
    setNewMessage('')
  }

  const activeFriendName =
    friends.find((f) => f.relationshipId === activeFriendId)?.name ?? 'Friend'

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
          <SettingsButton />
          <LogoutButton />
        </div>
      </header>

      {/* Messages */}
      <section className="flex-1 space-y-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </section>

      {/* Input */}
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
