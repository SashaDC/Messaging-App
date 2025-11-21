import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App.tsx'
import { ChatWindow } from './components/ChatWindow.tsx'
import EditUserFrame from './components/EditUserFrame.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<ChatWindow />} />
    <Route path="profile/edit" element={<EditUserFrame />} />
  </Route>,
)
