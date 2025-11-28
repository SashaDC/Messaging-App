import NavBtnEditProfile from './NavBtnEditProfile'
import NavBtnLogout from './NavBtnLogout'
import NavBtnManageFriends from './NavBtnManageFriends'
import NavBtnChat from './NavBtnChat'

export default function Nav() {
  return (
    <nav className="flex w-full justify-end px-2">
      <NavBtnChat />
      <NavBtnManageFriends />
      <NavBtnEditProfile />
      <NavBtnLogout />
    </nav>
  )
}
