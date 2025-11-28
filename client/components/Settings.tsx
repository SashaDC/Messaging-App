import EditUserPage from './EditUserPage'
import Nav from './Nav'
// In here we'll edit and display stuff similar to discord like user data.
// Make buttons to switch what we're looking at on the main sections.
// CSS background customization stuff maybe?
export default function Settings() {
  return (
    <div className="flex flex-1 flex-col bg-[#3C096C]">
      <div className="block flex-auto border border-[#10002B] bg-[#240046] p-4 ">
        <Nav />
      </div>
      <main>
        <EditUserPage />
      </main>
    </div>
  )
}
