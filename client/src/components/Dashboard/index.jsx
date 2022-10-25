import Sidebar from "../Sidebar";
import ChatScreen from "../ChatScreen";
import io from 'socket.io-client';
import OnlineUsersProvider from "../../contexts/OnlineUsersProvider"

export const socket = io("http://localhost:8000");

export default function Dashboard({ openDrawer }) {
    return (
        <OnlineUsersProvider>
            <div className="flex overflow-hidden h-screen w-screen">
                <Sidebar openDrawer={openDrawer} />
                <ChatScreen />
            </div>
        </OnlineUsersProvider>
    )
}