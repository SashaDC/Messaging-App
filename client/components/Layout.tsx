import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <>
      <header></header>
      <Outlet />
      <footer></footer>
    </>
  )
}
