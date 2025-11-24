import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App.tsx'
import { ChatWindow } from './components/ChatWindow.tsx'
import { FriendshipPage } from './components/FriendshipPage.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<App />}>
    {/* default page: chat */}
    <Route index element={<ChatWindow />} />

    {/* /friends page: friendship page */}
    <Route path="friends" element={<FriendshipPage />} />
  </Route>
)
