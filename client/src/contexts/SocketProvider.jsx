import { useContext, createContext } from "react";
import { useToken } from "../App";
import io from 'socket.io-client';

const SocketContext = createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export default function SocketProvider({ children }) {
    const [token, setToken] = useToken();
    const { name, email } = JSON.parse(window.atob(token.split('.')[1]));

    const socket = io(
        "http://localhost:8000",
        { query: { id: email } }
    );

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}