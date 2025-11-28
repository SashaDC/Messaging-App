import Nav from './Nav'
import ChatFriendList from './ChatFriendList'
import { MessageBubble } from './MessageBubble'
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import type { ChatOutletContext } from '../../models/outletContext'
import { useMessages } from '../hooks/useMessages'

export function ChatWindow() {
  const { friends, activeFriendId, currentUserId, setActiveFriendId } =
    useOutletContext<ChatOutletContext>()
  const { messages, sendMessage } = useMessages(activeFriendId, currentUserId)
  const [newMessage, setNewMessage] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (activeFriendId) {
      const trimmed = newMessage.trim()
      if (!trimmed) return

      sendMessage(activeFriendId, currentUserId, trimmed)
      setNewMessage('')
    }
  }

  const activeFriendName =
    friends.find((f) => f.relationshipId === activeFriendId)?.name ?? 'Friend'

  return (
    <div className="flex min-h-screen bg-[#10002B] text-white">
      {/* List of friends with friend search */}
      <ChatFriendList
        friends={friends}
        activeFriendId={
          activeFriendId
            ? activeFriendId
            : friends.length > 0
              ? friends[0].relationshipId
              : 0
        }
        onSelectFriend={setActiveFriendId}
      />

      {/* Main content area where ChatWindow / FriendshipPage render */}
      <main className="flex-1">
        <div className="flex h-full flex-col">
          {/* Header */}
          <header className="flex h-16 items-center justify-between border-b border-[#5A189A] bg-[#3C096C] px-4">
            <div>
              <h1 className="text-sm font-semibold md:text-base">
                {activeFriendName}
              </h1>
              <p className="text-xs opacity-70">Chatting on DevConnect</p>
            </div>
            <div className=" bg-[#3C096C] p-2 px-4 text-right">
              <Nav />
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
      </main>
    </div>
  )
}
