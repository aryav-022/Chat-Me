import { useContext, createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export default function UserProvider({ children }) {
    const [user, setUser] = useLocalStorage(null);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}