import Layout from './Layout'

function App() {
  // TEMPORARY: Skip all auth and just show the main app layout
  return <Layout />
}

export default App

// import { useEffect, useRef } from 'react'
// import { useAuth0 } from '@auth0/auth0-react'

// import Layout from './Layout'
// import { HomePage } from './HomePage'
// import { useValidateUser } from '../hooks/useUsers'
// import { UserData } from '../../models/user'

// function App() {
//   const {
//     getAccessTokenSilently,
//     isAuthenticated,
//     loginWithRedirect,
//     isLoading,
//     user,
//   } = useAuth0()

//   const validateUser = useValidateUser()

//   const userIsValidated = useRef<boolean>(
//     localStorage.getItem('userIsValid') === 'true'
//   )

//   const handleLoginClick = async () => {
//     if (!isAuthenticated) {
//       await loginWithRedirect()
//     }
//   }

//   useEffect(() => {
//     const handleDatabase = async () => {
//       if (user && user.email && user.nickname && user.sub) {
//         const userData: UserData = {
//           email: user.email,
//           username: user.nickname,
//           id: user.sub,
//         }

//         if (user.picture) {
//           userData.pfp = user.picture
//         }

//         try {
//           const token = await getAccessTokenSilently()
//           validateUser.mutate({
//             token,
//             user: userData,
//           })
//           userIsValidated.current = true
//           localStorage.setItem('userIsValid', 'true')
//         } catch (err) {
//           console.error('Failed to validate user', err)
//         }
//       }
//     }

//     handleDatabase()
//   }, [user, getAccessTokenSilently, validateUser])

//   // Still loading Auth0 state
//   if (isLoading) {
//     return <p>Loading...</p>
//   }

//   // Show landing/login page if not authed or not validated
//   if (!isAuthenticated || !userIsValidated.current) {
//     return <HomePage onLoginClick={handleLoginClick} />
//   }

//   // Show main app layout (this should contain your Outlet + pages)
//   if (isAuthenticated && userIsValidated.current) {
//     return <Layout />
//   }

//   // Fallback (should basically never hit)
//   return null
// }

// export default App
