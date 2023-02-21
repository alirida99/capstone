import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../context/AuthContext'
import { useRouter } from 'next/router'
import ProtectedRoute from '../src/common/ProtectedRoute/ProtectedRoute'
import { useState } from 'react'
import AppContext from '../src/components/AppContext/AppContext';

const noAuthRequired = ['/', '/logIn', '/signUp', '/admins/adminsLogin']

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [session, setSession] = useState()

  return (
    // <>
    <AppContext.Provider value={{ session, setSession }}>
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
    </AppContext.Provider>
    // </>
  )
}

export default MyApp