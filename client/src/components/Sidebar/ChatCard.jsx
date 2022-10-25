import { useRef } from 'react';
import defaultImage from '../../assets/user.png';
import { useOnlineUsers } from '../../contexts/OnlineUsersProvider';
import { useRoom } from '../../contexts/RoomProvider';

export default function ChatCard({ index }) {
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

    return (
        <li className={`bordered ${active ? "bg-primary" : ""}`} onClick={() => setRoom(index)}><a className="py-2">
            <div className={`avatar ${onlineUsers.includes(index) ? "online" : ""}`}>
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
