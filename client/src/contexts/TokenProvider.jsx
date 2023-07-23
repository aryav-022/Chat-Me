import { useContext, createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const TokenContext = createContext();

export function useToken() {
    return useContext(TokenContext);
}

// Gets token from localstorage and provides to its children
export default function TokenProvider({ children }) {
    const [token, setToken] = useLocalStorage('token', null);

    return (
        <TokenContext.Provider value={[token, setToken]}>
            {children}
        </TokenContext.Provider>
    )
}