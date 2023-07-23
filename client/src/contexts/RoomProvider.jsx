import { useContext, createContext, useState } from "react";

const RoomContext = createContext();

export function useRoom() {
    return useContext(RoomContext);
}

// Just to keep track of the room aka the user you are chatting with
export default function RoomProvider({ children }) {
    const [room, setRoom] = useState(null);

    return (
        <RoomContext.Provider value={[room, setRoom]}>
            {children}
        </RoomContext.Provider>
    )
}