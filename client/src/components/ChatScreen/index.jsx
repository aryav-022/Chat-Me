import { useRef } from 'react';
import UserCard from '../UserCard';
import dashboardDefault from "../../assets/dashboard_default.svg";
import ChatSection from './ChatSection';
import { useSocket } from "../../contexts/SocketProvider";
import { useChat } from '../../contexts/ChatProvider';
import { useRoom } from '../../contexts/RoomProvider';
import { useToken } from '../../App';
import { useContacts } from '../../contexts/ContactsProvider';

export default function ChatScreen() {
  const [token, setToken] = useToken();
  const { name, email } = JSON.parse(window.atob(token.split('.')[1]));

  const socket = useSocket();

  const [room, setRoom] = useRoom();
  const [chat, updateChat] = useChat();
  const { contacts } = useContacts();

  const inputRef = useRef();

  function sendMessage() {
    const msg = inputRef.current.value;
    if (!msg) return;

    socket.emit('send-message', msg, [room]);

    inputRef.current.value = null;

    updateChat({ room: room, sender: email, msg });
  }

  function checkEnter(e) {
    if (e.key === 'Enter' || e.keyCode === 13) sendMessage();
  }

  let title = "Unsaved";
  if (contacts.find(contact => contact.email === room) && contacts.find(contact => contact.email === room).name) title = contacts.find(contact => contact.email === room).name;

  // let members = room;
  // if (title === "Unsaved") members = "";

  return (
    <div className="w-chat-screen-width h-screen flex flex-col border-l border-gray-700">
      {
        room !== null ?
          <>
            <UserCard openDrawer={() => { }} obj={{ name: title, members: room }} online={false} />
            <ChatSection />
            <div className="form-control w-full">
              <div className="input-group flex">
                <input type="text" placeholder="Type here" required className="input input-bordered grow" autoFocus ref={inputRef} onKeyDown={checkEnter} />
                <button className="btn btn-square" onClick={sendMessage}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 rotate-[-30deg]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </> :
          <>
            <img src={dashboardDefault} alt="" className='h-1/2 w-1/2 mx-auto my-16' />
            <div className='text-white text-4xl text-center'>Chat Me Web</div>
            <div className='text-gray-400 mx-auto flex w-fit my-16'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              End-to-End Encrypted
            </div>
          </>
      }
    </div>
  )
}