import { useContext, createContext, useState, useEffect } from "react";
import { useSocket } from "./SocketProvider";

const OnlineUsersContext = createContext();

export function useOnlineUsers() {
    return useContext(OnlineUsersContext);
}

export default function OnlineUsersProvider({ children }) {
    const socket = useSocket();
    const [onlineUsers, setOnlineUsers] = useState(['you']);

    useEffect(() => {
        socket.on('online', setOnlineUsers);
        
        return () => socket.off('online', setOnlineUsers);
    }, [])

    return (
        <OnlineUsersContext.Provider value={onlineUsers}>
            {children}
        </OnlineUsersContext.Provider>
    )
}