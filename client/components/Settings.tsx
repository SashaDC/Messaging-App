import { useGetUserById } from '../hooks/useUsers'
import { useContextAuthId } from './App'
// In here we'll edit and display stuff similar to discord like user data
// CSS stuff maybe?
export default function Settings() {
  const id = useContextAuthId()
  const { isLoading, isError, error, data: user } = useGetUserById(id)
  console.log(id)
  console.log(user)
  if (isLoading) {
    return <p>loading...</p>
  }
  if (isError) {
    return <p>{error.message}</p>
  }
  return (
    <div className="flex min-h-screen bg-[#10002B] text-white">
      <aside className="flex hidden flex-col border-r border-[#3C096C] bg-[#240046] p-4 md:flex md:w-64"></aside>
      <main className="flex flex-1 flex-col">
        <section className="flex-1 space-y-1 overflow-y-auto p-4"></section>
        <div>
          <img src={user?.pfp} alt={`${user?.username}'s pfp`} />
          <p>{user?.email}</p>
          <p>{user?.username}</p>
          <p>{user?.bio}</p>
        </div>
        {/* Message input */}
      </main>
    </div>
  )
}
