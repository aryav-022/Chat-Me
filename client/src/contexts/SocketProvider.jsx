import { useContext, createContext } from "react";
import { useToken } from "../App";
import io from 'socket.io-client';

const SocketContext = createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export default function SocketProvider({ children }) {
    // Get the token
    const [token, setToken] = useToken();

    // Decode the token
    const { name, email } = JSON.parse(window.atob(token.split('.')[1]));

    // Establish socket.io connection with server with decoded info
    const socket = io(
        import.meta.env.VITE_SERVER_ADDRESS,
        { query: { id: email, token } }
    );

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}