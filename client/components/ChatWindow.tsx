import Nav from './Nav'
import ChatFriendList from './ChatFriendList'
import { MessageBubble } from './MessageBubble'
import { useState, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
import type { ChatOutletContext } from '../../models/outletContext'
import { useMessages } from '../hooks/useMessages'
import BackArrow from './BackArrow'
import { useEffect } from 'react'

export function ChatWindow() {
  const { friends, activeFriendId, currentUserId, setActiveFriendId } =
    useOutletContext<ChatOutletContext>()
  const { messages, sendMessage } = useMessages(activeFriendId, currentUserId)
  const [newMessage, setNewMessage] = useState('')
  const [phHideChatWindow, setHideChat] = useState<boolean>(true)
  const [phHideChatList, setHideChatList] = useState<boolean>(false)
  const [imageData, setImageData] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const activeFriendName =
    friends.find((f) => f.relationshipId === activeFriendId)?.name ?? 'Friend'

  // image paste events
  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (!items) return

    for (const item of items) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile()
        if (file) {
          convertToBase64(file)
        }
      }
    }
  }

  // image upload button
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      convertToBase64(file)
    }
  }

  // Convert image to base64
  const convertToBase64 = (file: File) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')!

        // Resize to max 400x400
        const maxSize = 400
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width
            width = maxSize
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height
            height = maxSize
          }
        }

        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)

        // Compress to 0.7 quality JPEG
        const compressed = canvas.toDataURL('image/jpeg', 0.7)
        setImageData(compressed)
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (activeFriendId) {
      const trimmed = newMessage.trim()
      if (!trimmed && !imageData) return

      sendMessage(
        activeFriendId,
        currentUserId,
        trimmed,
        imageData || undefined,
      )
      setNewMessage('')
      setImageData(null)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  //This sets which friend the user is chatting to. It also controls and also controls
  //whether phone users see chat window or friend list
  const handleSelectChat = (id: number) => {
    setActiveFriendId(id)
    setHideChat(false)
    setHideChatList(true)
  }

  const handleReturnClick = () => {
    setHideChat(true)
    setHideChatList(false)
  }

  const setToBottom = () => {
    useEffect(() => {
      const element = document.getElementById("message");
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    })
  }

  return (
    <div className="flex h-screen bg-[#10002B] text-white">
      <aside
        className={`border-r border-[#3C096C] bg-[#240046] md:flex md:w-64 ${phHideChatList ? 'hidden' : null} `}
      >
        <div className="pr-2 pt-2 md:hidden">
          <Nav />
        </div>

        {/* List of friends with friend search.  */}
        <ChatFriendList
          friends={friends}
          activeFriendId={
            activeFriendId
              ? activeFriendId
              : friends.length > 0
                ? friends[0].relationshipId
                : 0
          }
          onSelectFriend={handleSelectChat}
        />
      </aside>
      {/* Main content area where ChatWindow / FriendshipPage render. Hidden initially on small devices */}
      <main className={`${phHideChatWindow ? 'hidden' : null} flex-1 md:block`}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <header className="flex h-16 items-center justify-between border-b border-[#5A189A] bg-[#3C096C] px-4">
            <div className="md:hidden">
              <BackArrow handleClick={handleReturnClick} />
            </div>
            <div>
              <h1 className="text-sm font-semibold md:text-base">
                {activeFriendName}
              </h1>
              <p className="text-xs opacity-70">Chatting on DevConnect</p>
            </div>
            <div className=" hidden bg-[#3C096C] p-2 px-4 text-right md:block">
              <Nav />
            </div>
          </header>

          {/* Messages */}
          <section className="w-full flex-1 space-y-1 p-4 overflow-y-auto" id="message" onLoad={setToBottom()}>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
          </section>

          {imageData && (
            <div className="border-t border-[#3C096C] bg-[#240046] p-3">
              <div className="flex items-center gap-2">
                <img
                  src={imageData}
                  alt="preview"
                  className="h-16 w-16 rounded object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImageData(null)}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Remove image
                </button>
              </div>
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex gap-1 overflow-x-hidden border-t border-[#3C096C] bg-[#240046] p-2 sm:gap-2 sm:p-3"
          >
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileInput}
              style={{ display: 'none' }}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-shrink-0 rounded-full bg-[#5A189A] px-2 py-2 text-sm font-medium hover:bg-[#7B2CBF] sm:px-3"
            >
              📎
            </button>

            <input
              className="min-w-0 flex-1 rounded-full border border-[#5A189A] bg-[#10002B] px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#7B2CBF] sm:px-3 sm:py-2 sm:text-sm"
              placeholder={`Message ${activeFriendName}…`}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onPaste={handlePaste}
            />

            <button
              type="submit"
              className="flex-shrink-0 rounded-full bg-[#7B2CBF] px-2 py-2 text-xs font-medium hover:bg-[#9D4EDD] sm:px-4 sm:text-sm"
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
