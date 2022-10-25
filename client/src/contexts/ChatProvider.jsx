import { useContext, createContext, useState } from "react";

const ChatContext = createContext();

export function useChat() {
    return useContext(ChatContext);
}

export default function ChatProvider({children}) {
    const [currentChat, setCurrentChat] = useState(null);
    
    return (
        <ChatContext.Provider value={[currentChat, setCurrentChat]}>
            {children}
        </ChatContext.Provider>
    )
}