import { useRef } from 'react';
import UserCard from '../UserCard';
import dashboardDefault from "../../assets/dashboard_default.svg";
import ChatSection from './ChatSection';
import { socket } from "../Dashboard";
import { useChat } from '../../contexts/ChatProvider';
import { useRoom } from '../../contexts/RoomProvider';

export default function ChatScreen() {
  const [room, setRoom] = useRoom();
  const obj = {name: "Aryav", members: "you"};
  const [chat, updateChat] = useChat();

  const inputRef = useRef();

  function sendMessage() {
    const msg = inputRef.current.value;
    if (!msg) return;

    socket.emit('send-message', msg, [7011142551]);

    inputRef.current.value = null;

    updateChat({room, sender: 7011142551, msg});
  }

  function checkEnter(e) {
    if (e.key === 'Enter' || e.keyCode === 13) sendMessage();
  }

  return (
    <div className="w-chat-screen-width h-screen flex flex-col">
      {
        room !== null ?
          <>
            <UserCard openDrawer={() => { }} obj={obj} online={false} />
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