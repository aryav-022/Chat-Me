import { useContext, createContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToken } from "../App";
import { useSocket } from "./SocketProvider";

const ChatContext = createContext();

export function useChat() {
    return useContext(ChatContext);
}

/*
    Flow
    1. User sends a message
    2. Message is added to chat using updateChat
    3. Message is sent to server
    4. Server emits a 'receive-message' event to all users except the sender
    5. Client receives the event and updates the chat
*/
export default function ChatProvider({ children }) {
    const [token, setToken] = useToken();
    const { name, email } = JSON.parse(window.atob(token.split('.')[1]));
    
    // Socket Instance
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

    // Adds message to chat
    function updateChat(message) {
        const { room, sender, msg } = message;

        setChat(chats => {
            const updatedChats = {...chats};
            if (updatedChats[room]) updatedChats[room] = [...updatedChats[room], { sender: sender, msg: msg }];
            else updatedChats[room] = [{ sender: sender, msg: msg }];
            return updatedChats;
        })
    }

    // Binding socket events
    // When a message is received, update chat
    // useEffect is used to bind the event only once
    useEffect(() => {
        function broadcastMessage(message) {
            const { room, sender, msg } = message;
            updateChat({ room, sender, msg });
        }

        // This event is emitted by server when a message is received
        socket.on('receive-message', broadcastMessage);

        return () => socket.off('receive-message', broadcastMessage);
    }, [])


    return (
        // Giving access to chat and updateChat to all children
        // As when a message is sent, chat needs to be updated and no server event is emitted
        <ChatContext.Provider value={[chat, updateChat]}>
            {children}
        </ChatContext.Provider>
    )
}