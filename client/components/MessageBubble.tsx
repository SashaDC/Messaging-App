import { Message } from '../../models/message'

type MessageBubbleProps = {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isMe = message.sender === 'me'

  return (
    <div className={`mb-2 flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
      {/* Bubble */}
      <div
        className={`
          w-fit max-w-xs break-words rounded-2xl px-3 py-2 text-sm md:max-w-md
          ${
            isMe
              ? 'rounded-br-sm bg-[#9D4EDD] text-white'
              : 'rounded-bl-sm bg-[#C77DFF] text-black'
          }
        `}
      >
        {/* Image */}
        {message.image && (
          <img
            src={message.image}
            alt="message"
            className="w-full rounded-lg"
          />
        )}
        {/* Text */}
        {message.text && <p className="break-words">{message.text}</p>}
        {/* Text with image - add padding */}
        {message.image && message.text && <p className="pb-1"></p>}
      </div>

      {/* Time under bubble, like Insta */}
      {message.createdAt && (
        <p className="mt-1 text-[10px] opacity-60">{message.createdAt}</p>
      )}
    </div>
  )
}
