import { useRef } from 'react';
import UserCard from '../UserCard';
import dashboardDefault from "../../assets/dashboard_default.svg";
import ChatSection from './ChatSection';
import { useSocket } from "../../contexts/SocketProvider";
import { useChat } from '../../contexts/ChatProvider';
import { useRoom } from '../../contexts/RoomProvider';
import { useToken } from '../../App';
import { useContacts } from '../../contexts/ContactsProvider';
import userDefaultImage from "../../assets/user.png";

export default function ChatScreen() {
  // Decode token
  const [token, setToken] = useToken();
  const { name, email } = JSON.parse(window.atob(token.split('.')[1]));

  const socket = useSocket(); // Get socket instance

  const [room, setRoom] = useRoom(); // Get room data (person u r talking to)
  const [chat, updateChat] = useChat(); // Gets all the chats
  const { contacts } = useContacts(); // Gets all the saved contacts

  const inputRef = useRef();

  function sendMessage() {
    const msg = inputRef.current.value;

    if (!msg) return; // Empty message cannot be sent

    // Emit event "send-message" to server
    // server will recieve msg and arr of people to send this msg
    // server will send the msg to all the people in arr
    // As of now group chat feature is not avalible thus only [room] is hard-coded
    socket.emit('send-message', msg, [room]);

    inputRef.current.value = null; // Clear input's value for next message

    updateChat({ room: room, sender: email, msg }); // Update chat and insert the new msg
  }

  // To send message on 'Enter' key
  function checkEnter(e) {
    if (e.key === 'Enter' || e.keyCode === 13) sendMessage();
  }

  // Setting title and image of room
  let title = "Unsaved"; // if contact is not saved"
  let image = userDefaultImage; // If no image is avalible for contact (for unsaved contacts too)
  const roomContact = contacts.find(contact => contact.email === room); // find the contact with email = room
  if (roomContact && roomContact.name) title = roomContact.name; // contact is found and it has a name property -> change title
  if (roomContact && roomContact.name) image = roomContact.image; // contact is found and it has a image property -> change image

  if (room !== null) {
    return (
      <div className="w-chat-screen-width h-screen flex flex-col border-l bg-base-100 border-gray-700 max-sm:absolute max-sm:top-0 max-sm:left-0 max-sm:w-screen max-sm:z-30">
        <UserCard obj={{ name: title, members: room, image }} online={false} /> {/* Top bar of chat */}
        <ChatSection /> {/* Main section - shows chats */}
        {/* Input Area */}
        {/* Extra Elements are to use DaisyUI */}
        <div className="form-control w-full">
          <div className="input-group flex">
            <input type="text" placeholder="Type here" required className="input input-bordered grow" autoFocus ref={inputRef} onKeyDown={checkEnter} /> {/* Checks if user pressed enter - for send message on enter */}
            <button className="btn btn-square" onClick={sendMessage}> {/* message is sent when pressed */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 rotate-[-30deg]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="w-chat-screen-width h-screen flex flex-col border-l border-gray-700 max-sm:absolute max-sm:top-0 max-sm:left-0 max-sm:w-screen max-sm:-z-10">
        <img src={dashboardDefault} alt="" className='h-1/2 w-1/2 mx-auto my-16' />
        <div className='primary-content text-4xl text-center'>Chat Me Web</div>
        <div className='text-gray-400 mx-auto flex w-fit my-16'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          End-to-End Encrypted
        </div>
      </div>
    )
  }
}