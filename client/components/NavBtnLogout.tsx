import { useAuth0 } from '@auth0/auth0-react'

export default function NavBtnLogout() {
  const { logout } = useAuth0()
  const handleOnClick = () => {
    sessionStorage.setItem('userId', '')
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    })
  }
  return (
    <button className="px-1" onClick={handleOnClick} aria-label="Log out">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
        />
      </svg>
    </button>
  )
}
