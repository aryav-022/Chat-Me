import { useContext, createContext, useState } from "react";

const RoomContext = createContext();

export function useRoom() {
    return useContext(RoomContext);
}

export default function RoomProvider({ children }) {
    const [room, setRoom] = useState(null);

    return (
        <RoomContext.Provider value={[room, setRoom]}>
            {children}
        </RoomContext.Provider>
    )
}