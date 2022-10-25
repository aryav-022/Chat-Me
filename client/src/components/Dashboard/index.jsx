import Sidebar from "../Sidebar";
import ChatScreen from "../ChatScreen";
import io from 'socket.io-client';

export const socket = io("http://localhost:8000");

export default function Dashboard({ openDrawer }) {
    return (
        <div className="flex overflow-hidden h-screen w-screen">
            <Sidebar openDrawer={openDrawer} />
            <ChatScreen />
        </div>
    )
}
