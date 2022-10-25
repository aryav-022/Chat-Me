import Message from './Message';
import { useEffect, useRef } from 'react';
import { socket } from "../Dashboard";

export default function ChatSection(props) {
    const chatSectionRef = useRef();
    const newMsgRef = useRef();
    
    useEffect(() => {
        function broadcastMessage(msg) {
            props.setMessages(messages => {
                const updatedMessages = [...messages, {sent: false, msg: msg}];
                return updatedMessages;
            })
        }

        socket.on('receive-message', broadcastMessage);
        
        return () => socket.off('receive-message', broadcastMessage);
    })

    let newMsg = { amount: 3 };
    // let newMsg = null;

    useEffect(() => {
        const messages = chatSectionRef.current.children;
        messages[messages.length - 1].scrollIntoView(false);
    }, [props.messages])

    useEffect(() => {
        const messages = chatSectionRef.current.children;
        if (newMsg) newMsgRef.current.scrollIntoView(true);
        else messages[messages.length - 1].scrollIntoView(false);
    }, [])

    return (
        <ul className='overflow-y-scroll h-chat-section-height max-h-chat-section-height flex flex-col py-2 px-4' ref={chatSectionRef}>
            <Message sent={true} />
            <Message />
            <Message />
            <Message />
            {newMsg &&
                <>
                    <div className="divider" ref={newMsgRef}>{newMsg.amount} new messages</div>
                    <Message sent={true} />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message sent={true} />
                </>
            }
            {
                props.messages.map(message => {
                    return ( <Message sent={message.sent} msg={message.msg} key={props.messages.indexOf(message)} /> )
                })
            }
        </ul>
    )
}
