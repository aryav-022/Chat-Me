import Message from './Message';
import { useEffect, useRef } from 'react';
import { socket } from "../Dashboard";
import { useChat } from '../../contexts/ChatProvider';
import { useRoom } from '../../contexts/RoomProvider';

export default function ChatSection() {
    const id = 7011142551;
    const [room, setRoom] = useRoom();
    const [chat, updateChat] = useChat();

    const chatSectionRef = useRef();
    const newMsgRef = useRef();

    useEffect(() => {
        function broadcastMessage(message) {
            const { sender, msg } = message;
            updateChat({ room, sender, msg });
        }

        socket.on('receive-message', broadcastMessage);

        return () => socket.off('receive-message', broadcastMessage);
    })

    let newMsg = { amount: 3 };
    // let newMsg = null;

    useEffect(() => {
        const messages = chatSectionRef.current.children;
        messages[messages.length - 1].scrollIntoView(false);
    }, [chat])

    useEffect(() => {
        const messages = chatSectionRef.current.children;
        if (newMsg) newMsgRef.current.scrollIntoView(true);
        else messages[messages.length - 1].scrollIntoView(false);
    }, [])

    return (
        <ul className='overflow-y-scroll h-chat-section-height max-h-chat-section-height flex flex-col py-2 px-4' ref={chatSectionRef}>
            {newMsg && <div className="divider" ref={newMsgRef}>{newMsg.amount} new messages</div>}
            {
                chat !== undefined && chat[room] !== undefined ? 
                chat[room].map(message => {
                    return (<Message sent={message.sender === id} msg={message.msg} />)
                }) : null
            }
        </ul>
    )
}
