import { useContext, createContext } from "react";
import Dashboard from "./components/Dashboard";
import Authentication from "./components/Authentication";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { GoogleOAuthProvider } from '@react-oauth/google';

const TokenContext = createContext();

export function useToken() {
  return useContext(TokenContext);
}

export default function App() {
  const [token, setToken] = useLocalStorage('token', null);

  return (
    // TokenProvider is a wrapper for the entire app
    // Provides token from localstorage - useLocalStorage()
    <TokenContext.Provider value={[token, setToken]}>
      <div className="App">
        {/* If token is present user is logged in, move to dashboard */}
        {/* Else go to auth page to login */}
        { token ? <Dashboard /> : <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}><Authentication /></GoogleOAuthProvider> }
      </div>
    </TokenContext.Provider>
  )
}
