import { useAuth0 } from '@auth0/auth0-react'

export default function LogoutButton() {
  const { logout } = useAuth0()
  const handleOnClick = () => {
    logout()
  }
  return (
    <button
      className="rounded-2xl border-2 border-[#fafafb] bg-[#10002B] font-semibold text-white hover:bg-[#3C096C] sm:min-h-12 sm:p-2 sm:text-sm md:min-h-16 md:p-4 md:text-base"
      onClick={handleOnClick}
    >
      Sign out
    </button>
  )
}
