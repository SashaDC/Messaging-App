import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App.tsx'
import { ChatWindow } from './components/ChatWindow.tsx'
import Settings from './components/Settings.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<ChatWindow />} />
    <Route path="/settings" element={<Settings />} />
  </Route>,
)
