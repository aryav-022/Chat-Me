import SocketProvider from "../../contexts/SocketProvider";
import Sidebar from "../Sidebar";
import ChatScreen from "../ChatScreen";
import OnlineUsersProvider from "../../contexts/OnlineUsersProvider";
import ChatProvider from "../../contexts/ChatProvider";
import RoomProvider from "../../contexts/RoomProvider";
import ContactsProvider from "../../contexts/ContactsProvider";
import { useRef } from "react";
import { useToken } from "../../App";

/*
    Parent Page to main app
    Wraps everything with various Context Providers
*/
export default function Dashboard() {
	const [token, setToken] = useToken();

	const checkboxRef = useRef();

	// Sets "checked = true" for checkbox using checkboxRef
	function openDrawer() {
		checkboxRef.current.checked = true;
    }

	// Function to logout user (removes token from local storage)
	function logout() {
		setToken(null);
		localStorage.removeItem("token");
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
								<div className="drawer-side w-80">
									<label htmlFor="my-drawer" className="drawer-overlay"></label>
									<ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
										<li>
											<button
												className="flex justify-between"
												onClick={() => (checkboxRef.current.checked = false)}
											>
												<span>Return</span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													height="1em"
													viewBox="0 0 320 512"
												>
													<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
												</svg>
											</button>
											<button className="flex justify-between" onClick={logout}>
												<span>Log Out</span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													height="1em"
													viewBox="0 0 512 512"
												>
													<style></style>
													<path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
												</svg>
											</button>
										</li>
									</ul>
								</div>
							</div>
						</RoomProvider>
					</OnlineUsersProvider>
				</ContactsProvider>
			</ChatProvider>
		</SocketProvider>
	);
}
