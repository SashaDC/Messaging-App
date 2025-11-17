interface Props {
  handleOnClick: () => void
  text: string
}

export default function Button({ handleOnClick, text }: Props) {
  return (
    <button
      className="rounded-2xl border-4 border-[#fafafb] bg-[#10002B] font-semibold text-white hover:bg-[#3C096C] sm:min-h-12 sm:p-2 sm:text-sm md:min-h-16 md:p-4 md:text-base lg:min-h-20 lg:p-6 lg:text-lg"
      onClick={handleOnClick}
    >
      {text}
    </button>
  )
}
