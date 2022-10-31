import SocketProvider from "../../contexts/SocketProvider";
import Sidebar from "../Sidebar";
import ChatScreen from "../ChatScreen";
import OnlineUsersProvider from "../../contexts/OnlineUsersProvider";
import ChatProvider from "../../contexts/ChatProvider";
import RoomProvider from "../../contexts/RoomProvider";
import ContactsProvider from "../../contexts/ContactsProvider";
import { useRef } from "react";

export default function Dashboard() {
    const checkboxRef = useRef();

    function openDrawer() {
        checkboxRef.current.checked = true;
    }

    return (
        <SocketProvider>
            <ChatProvider>
                <ContactsProvider>
                    <OnlineUsersProvider>
                        <RoomProvider>
                            <div className="drawer">
                                <input id="my-drawer" type="checkbox" className="drawer-toggle" ref={checkboxRef} />
                                <div className="drawer-content">

                                    <div className="flex overflow-hidden h-screen w-screen">
                                        <Sidebar openDrawer={openDrawer} />
                                        <ChatScreen />
                                    </div>

                                </div>
                                <div className="drawer-side">
                                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                                        <li><a>Sidebar Item 1</a></li>
                                        <li><a>Sidebar Item 2</a></li>
                                    </ul>
                                </div>
                            </div>
                        </RoomProvider>
                    </OnlineUsersProvider>
                </ContactsProvider>
            </ChatProvider>
        </SocketProvider>
    )
}
