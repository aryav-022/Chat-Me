import { useContext, createContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToken } from "../App";
import { useSocket } from "./SocketProvider";

const ChatContext = createContext();

export function useChat() {
    return useContext(ChatContext);
}

export default function ChatProvider({ children }) {
    const [token, setToken] = useToken();
    const { name, email } = JSON.parse(window.atob(token.split('.')[1]));
    
    const socket = useSocket();

    const [chat, setChat] = useLocalStorage(email + "-chats", {});

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
            const updatedChats = {...chats};
            if (updatedChats[room]) updatedChats[room] = [...updatedChats[room], { sender: sender, msg: msg }];
            else updatedChats[room] = [{ sender: sender, msg: msg }];
            return updatedChats;
        })
    }

    useEffect(() => {
        function broadcastMessage(message) {
            const { room, sender, msg } = message;
            updateChat({ room, sender, msg });
        }

        socket.on('receive-message', broadcastMessage);

        return () => socket.off('receive-message', broadcastMessage);
    }, [])


    return (
        <ChatContext.Provider value={[chat, updateChat]}>
            {children}
        </ChatContext.Provider>
    )
}