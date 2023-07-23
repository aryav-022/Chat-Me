import { useContext, createContext, useState, useEffect } from "react";
import { useSocket } from "./SocketProvider";

const OnlineUsersContext = createContext();

export function useOnlineUsers() {
    return useContext(OnlineUsersContext);
}

/*
    Flow
    1. User opens the chat page
    2. Online users are displayed using onlineUsers
    3. Whenever a user comes online, the event 'online' is emitted
    4. The event 'online' is listened to in this component
    5. onlineUsers is updated with the new list of online users
*/
export default function OnlineUsersProvider({ children }) {
    const socket = useSocket();
    const [onlineUsers, setOnlineUsers] = useState(['you']);

    // To bind the event listener to the socket
    // useEffect is used to prevent multiple event listeners
    useEffect(() => {
        // whenever the event 'online' is emitted, setOnlineUsers is called
        socket.on('online', setOnlineUsers);
        
        return () => socket.off('online', setOnlineUsers);
    }, [])

    return (
        <OnlineUsersContext.Provider value={onlineUsers}>
            {children}
        </OnlineUsersContext.Provider>
    )
}