import { useContext, createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ChatContext = createContext();

export function useChat() {
    return useContext(ChatContext);
}

export default function ChatProvider({ children }) {
    const id = 7011142551;
    const [chat, setChat] = useLocalStorage(id + "-chats", {});

    /*
        Message Structure
        {
            8888888888: [
                {
                    sender: 7011142551,
                    msg: "Text Message"
                },
                {
                    sender: 8888888888,
                    msg: "Text Message"
                },
                {
                    sender: 8888888888,
                    msg: "Text Message"
                }
            ],
            1010101010: [
                {
                    sender: 7011142551,
                    msg: "Text Message"
                },
                {
                    sender: 1010101010,
                    msg: "Text Message"
                },
                {
                    sender: 1010101010,
                    msg: "Text Message"
                }
            ]
        }
    */

    function updateChat(message) {
        const { room, sender, msg } = message;

        setChat(chats => {
            const updatedChats = { ...chats };
            if (chats[room]) updatedChats[room] = [...chats[room], { sender: sender, msg: msg }];
            else updatedChats[room] = [{ sender: sender, msg: msg }];
            return updatedChats;
        })
    }



    return (
        <ChatContext.Provider value={[chat, updateChat]}>
            {children}
        </ChatContext.Provider>
    )
}