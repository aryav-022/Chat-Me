import Message from './Message';
import { useEffect, useRef } from 'react';
import { useChat } from '../../contexts/ChatProvider';
import { useRoom } from '../../contexts/RoomProvider';
import { useToken } from '../../App';

export default function ChatSection() {
    const [token, setToken] = useToken();
    const { name, email } = JSON.parse(window.atob(token.split('.')[1]));

    const [room, setRoom] = useRoom();
    const [chat, updateChat] = useChat();

    const chatSectionRef = useRef();

    let newMsg = { amount: 0 };

    useEffect(() => {
        const messages = chatSectionRef.current.children;
        if (messages && messages[messages.length - 1]) messages[messages.length - 1].scrollIntoView(false);
    }, [chat])
    
    return (
        <ul className='overflow-y-scroll h-chat-section-height max-h-chat-section-height flex flex-col py-2 px-4' ref={chatSectionRef}>
            {
                chat !== undefined && chat[room] !== undefined ?
                    chat[room].map(message => {
                        return (<Message sent={message.sender === email} msg={message.msg} />)
                    }) : null
            }
        </ul>
    )
}
