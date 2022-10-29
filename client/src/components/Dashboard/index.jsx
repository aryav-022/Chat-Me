import SocketProvider from "../../contexts/SocketProvider";
import Sidebar from "../Sidebar";
import ChatScreen from "../ChatScreen";
import OnlineUsersProvider from "../../contexts/OnlineUsersProvider";
import ChatProvider from "../../contexts/ChatProvider";
import RoomProvider from "../../contexts/RoomProvider";
import ContactsProvider from "../../contexts/ContactsProvider";

export default function Dashboard({ openDrawer }) {
    return (
        <SocketProvider>
            <ChatProvider>
                <ContactsProvider>
                    <OnlineUsersProvider>
                        <RoomProvider>
                            <div className="flex overflow-hidden h-screen w-screen">
                                <Sidebar openDrawer={openDrawer} />
                                <ChatScreen />
                            </div>
                        </RoomProvider>
                    </OnlineUsersProvider>
                </ContactsProvider>
            </ChatProvider>
        </SocketProvider>
    )
}
