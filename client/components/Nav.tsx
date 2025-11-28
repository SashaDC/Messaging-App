import NavSettingsButton from './NavSettingsButton'
import NavLogoutButton from './NavLogoutButton'
import NavFriendButton from './NavFriendButton'
import NavButtonChat from './NavButtonChat'

export default function Nav() {
  return (
    <nav className="flex w-full justify-end px-2">
      <NavButtonChat />
      <NavFriendButton />
      <NavSettingsButton />
      <NavLogoutButton />
    </nav>
  )
}
