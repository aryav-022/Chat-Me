import { useRef, useEffect } from 'react';
import defaultImage from '../../assets/user.png';
import { socket } from '../Dashboard';

export default function ChatCard({ current, index }) {
    const [currentChat, setCurrentChat] = current;
    const imgRef = useRef();
    const avatarRef = useRef();

    useEffect(() => {
        socket.on('online', id => {
            if (id === index) avatarRef.current.classList.add('online');
        })
    
        socket.on('offline', id => {
            if (id === index) avatarRef.current.classList.remove('online');
        })
        
        return () => {
            socket.off('online', id => {
                if (id === index) avatarRef.current.classList.add('online');
            })
        
            socket.off('offline', id => {
                if (id === index) avatarRef.current.classList.remove('online');
            })
        }
    }, [])

    const active = currentChat === index;    
    
    function removeAnimation() {
        imgRef.current.classList.remove('animate-pulse');
    }

    function setDefaultImage() {
        imgRef.current.src = defaultImage;
    }

    return (
        <li className={`bordered ${active ? "bg-primary" : ""}`} onClick={() => setCurrentChat(index)}><a className="py-2">
            <div className="avatar" ref={avatarRef}>
                <div className="w-14 h-14 rounded-full">
                    <img src="https://placeimg.com/192/192/people" className="bg-gray-600 animate-pulse object-contain" onLoad={removeAnimation} ref={imgRef} onError={setDefaultImage} />
                </div>
            </div>
            <div>
                <div className={`font-bold truncate w-64 ${active ? "text-white" : ""}`}>Hart Hagerty</div>
                <div className={`text-sm ${active ? "" : "opacity-50"} truncate w-64`}>Hello, you are making this winderfull app using daisy ui wow! lets see how good it is against this  long text</div>
            </div>
        </a></li>
    )
}
