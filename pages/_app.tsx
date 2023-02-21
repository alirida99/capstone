import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../context/AuthContext'
import { useRouter } from 'next/router'
import ProtectedRoute from '../src/common/ProtectedRoute/ProtectedRoute'

const noAuthRequired = ['/', '/logIn', '/signUp', '/admins/adminsLogin']

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <AuthContextProvider>
        <Component {...pageProps} />
        {/* {noAuthRequired.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        )} */}
      </AuthContextProvider>
    </>
  )
}

export default MyApp