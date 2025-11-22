import { useState } from 'react'
import { Link } from 'react-router'
import { MessageBubble } from './MessageBubble'
import LogoutButton from './LogoutButton'
import { FriendList } from './FriendList'
import { useContextAuthId } from './App'
import { deleteMessage } from '../apis/messages'
import { deleteUser } from '../apis/users'

type Message = {
  id: number
  text: string
  sender: 'me' | 'them'
  createdAt?: string
}

type Friend = {
  id: number
  name: string
  avatarUrl?: string
}

const friends: Friend[] = [
  { id: 1, name: 'Sasha' },
  { id: 2, name: 'Lucas' },
  { id: 3, name: 'Jennifer' },
]

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
<<<<<<< HEAD
  deleteUser("auth0|123")
=======
  // const testing = deleteMessage(1, 2)
  // console.log(testing)
>>>>>>> dev

  // Example of how to get current user id from context
  const { currentUserId } = useContextAuthId()
  console.log(currentUserId)
  // Who you're currently chatting with
  const [activeFriendId, setActiveFriendId] = useState<number>(friends[0].id)

  // Messages per friend
  const [messagesByFriend, setMessagesByFriend] = useState(
    initialMessagesByFriend,
  )

  // Messages FOR the selected friend
  const messages = messagesByFriend[activeFriendId] ?? []

  // Input
  const [newMessage, setNewMessage] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const trimmed = newMessage.trim()
    if (!trimmed) return
    //-------------
    // Need to send message data to database
    //-------------
    const newMsg: Message = {
      id: Date.now(),
      text: trimmed,
      sender: 'me',
      createdAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    // Add message into correct friend's list
    setMessagesByFriend((prev) => ({
      ...prev,
      [activeFriendId]: [...prev[activeFriendId], newMsg],
    }))

    setNewMessage('')
  }

  const activeFriendName = friends.find((f) => f.id === activeFriendId)?.name

  return (
    <div className="flex min-h-screen bg-[#10002B] text-white">
      {/* Friends Sidebar */}
      <aside className="flex hidden flex-col border-r border-[#3C096C] bg-[#240046] p-4 md:flex md:w-64">
        <FriendList
          friends={friends}
          activeFriendId={activeFriendId}
          onSelectFriend={setActiveFriendId}
        />
        <nav>
          <Link to={'settings'} className="inline-flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              {' '}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />{' '}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />{' '}
            </svg>
          </Link>
          <LogoutButton />
        </nav>
      </aside>
      {/* Main chat area */}
      <main className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-[#5A189A] bg-[#3C096C] px-4">
          <div>
            <h1 className="text-sm font-semibold md:text-base">
              {activeFriendName}
            </h1>
            <p className="text-xs opacity-70">Chatting on DevConnect</p>
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
      </main>
    </div>
  )
}
