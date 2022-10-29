import { useRef } from 'react';
import defaultImage from '../../assets/user.png';
import { useOnlineUsers } from '../../contexts/OnlineUsersProvider';
import { useRoom } from '../../contexts/RoomProvider';

export default function ChatCard({ index, name, img, lastChat, setTab }) {
    const [room, setRoom] = useRoom();
    const onlineUsers = useOnlineUsers();
    const imgRef = useRef();

    const active = room === index;
    
    function removeAnimation() {
        imgRef.current.classList.remove('animate-pulse');
    }

    function setDefaultImage() {
        imgRef.current.src = defaultImage;
    }

    function openRoom() {
        if (setTab) setTab(0);
        setRoom(index);
    }

    return (
        <li className={`bordered ${active ? "bg-primary" : ""}`} onClick={openRoom}><a className="py-2">
            <div className={`avatar ${onlineUsers.includes(index) ? "online" : ""}`}>
                <div className="w-14 h-14 rounded-full">
                    <img src={img} className="bg-gray-600 animate-pulse object-contain" onLoad={removeAnimation} ref={imgRef} onError={setDefaultImage} />
                </div>
            </div>
            <div>
                <div className={`font-bold truncate w-64 ${active ? "text-white" : ""}`}>{name}</div>
                <div className={`text-sm ${active ? "" : "opacity-50"} truncate w-64`}>{lastChat}</div>
            </div>
        </a></li>
    )
}

ChatCard.defaultProps = {
    setTab: false
}