import Message from './Message';
import { useEffect, useRef } from 'react';
import { useChat } from '../../contexts/ChatProvider';
import { useRoom } from '../../contexts/RoomProvider';
import { useToken } from '../../App';

export default function ChatSection() {
    // Decode Token
    const [token, setToken] = useToken();
    const { name, email } = JSON.parse(window.atob(token.split('.')[1]));

    // Get Room Information
    const [room, setRoom] = useRoom();
    // Get Chats
    const [chat, updateChat] = useChat();

    const chatSectionRef = useRef();

    // Future Feature for Unread Messages
    let newMsg = { amount: 0 };

    // Rendering whenever chat is updated
    // For auto scroll only
    // Chat is updated using state variable's render only
    useEffect(() => {
        const messages = chatSectionRef.current.children;
        if (messages && messages[messages.length - 1]) messages[messages.length - 1].scrollIntoView(false);
    }, [chat])
    
    return (
        <ul className='overflow-y-scroll flex-grow flex flex-col py-2 px-4' ref={chatSectionRef}>
            {
                chat !== undefined && chat[room] !== undefined ?
                    chat[room].map((message, index) => {
                        return (<Message sent={message.sender === email} msg={message.msg} key={index} />)
                    }) : null
            }
        </ul>
    )
}
