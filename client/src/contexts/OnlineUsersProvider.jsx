import { useContext, createContext, useState, useEffect } from "react";
import { socket } from "../components/Dashboard";

const OnlineUsersContext = createContext();

export function useOnlineUsers() {
    return useContext(OnlineUsersContext);
}

export default function OnlineUsersProvider({ children }) {
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        socket.on('online', id => {
            console.log(id);
            setOnlineUsers(users => {
                const updatedUsers = [...users, id];
                return updatedUsers;
            })
        })

        socket.on('offline', id => {
            console.log(id);
            setOnlineUsers(users => {
                const updatedUsers = users.filter(user => { return user !== id; });
                return updatedUsers;
            })
        })

        return () => socket.removeAllListeners();
    }, [])

    return (
        <OnlineUsersContext.Provider value={onlineUsers}>
            {children}
        </OnlineUsersContext.Provider>
    )
}