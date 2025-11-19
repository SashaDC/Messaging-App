type Message = {
  id: number
  text: string
  sender: 'me' | 'them'
  createdAt?: string
}

type MessageBubbleProps = {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isMe = message.sender === 'me'

  return (
    <div
      className={`flex flex-col mb-2 ${
        isMe ? 'items-end' : 'items-start'
      }`}
    >
      {/* Bubble */}
      <div
        className={`
          max-w-xs md:max-w-md px-3 py-2 rounded-2xl text-sm
          ${isMe
            ? 'bg-[#9D4EDD] text-white rounded-br-sm'
            : 'bg-[#C77DFF] text-black rounded-bl-sm'}
        `}
      >
        <p>{message.text}</p>
      </div>

      {/* Time under bubble, like Insta */}
      {message.createdAt && (
        <p className="mt-1 text-[10px] opacity-60">
          {message.createdAt}
        </p>
      )}
    </div>
  )
}
