import { Link } from 'react-router'
import EditUserPage from './EditUserPage'
import Nav from './Nav'
// In here we'll edit and display stuff similar to discord like user data.
// Make buttons to switch what we're looking at on the main sections.
// CSS background customization stuff maybe?
export default function Settings() {
  return (
    <>
      <div className="block flex-auto border border-[#10002B] bg-[#240046] p-4 md:hidden lg:hidden">
        <Nav />{' '}
      </div>
      <div className="flex min-h-screen bg-[#10002B] text-white">
        <aside className="flex hidden flex-col border-r border-[#3C096C] bg-[#240046] p-4 md:flex md:w-64">
          <Link to={'/'} className="inline-flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
          </Link>
        </aside>
        <main className="flex flex-1 flex-col bg-[#3C096C]">
          <EditUserPage />
        </main>
      </div>
    </>
  )
}
