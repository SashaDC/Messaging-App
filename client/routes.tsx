import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App.tsx'
import ValidateLogin from './components/ValidateLogin.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<App />} />
    <Route path="validateLogin" element={<ValidateLogin />} />
  </Route>,
)
