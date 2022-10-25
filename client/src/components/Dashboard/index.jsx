import Sidebar from "../Sidebar";
import ChatScreen from "../ChatScreen";
import io from 'socket.io-client';
import OnlineUsersProvider from "../../contexts/OnlineUsersProvider"
import ChatProvider from "../../contexts/ChatProvider"

export const socket = io(
    "http://localhost:8000",
    { query: { id: 7011142551 } }
);

export default function Dashboard({ openDrawer }) {
    return (
        <ChatProvider>
            <OnlineUsersProvider>
                <div className="flex overflow-hidden h-screen w-screen">
                    <Sidebar openDrawer={openDrawer} />
                    <ChatScreen info={null} />
                </div>
            </OnlineUsersProvider>
        </ChatProvider>
    )
}
