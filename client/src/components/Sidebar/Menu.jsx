import ChatCard from "./ChatCard";
import { useChat } from "../../contexts/ChatProvider";
import { useContacts } from "../../contexts/ContactsProvider";
import catImg from "../../assets/cat.svg";
import notFound from "../../assets/sidebar_default.svg";
import { useRef } from "react";
import { useToken } from "../../App";

export default function Menu({ tab, setTab }) {
    const [token, setToken] = useToken();
    const { selfName, selfEmail } = JSON.parse(window.atob(token.split('.')[1]));

    const nameRef = useRef();
    const emailRef = useRef();
    const errorRef = useRef();
    const modalRef = useRef();

    const [chat, updateChat] = useChat();
    const { contacts, addContact } = useContacts();

    let chatMenu = [];

    for (const room in chat) {
        const roomChat = chat[room];
        const roomContact = contacts.find(contact => contact.email === room);
        let name = 'Unsaved';
        if (roomContact && roomContact.name) name = roomContact.name;
        const lastChat = roomChat[roomChat.length - 1];
        chatMenu.push(<ChatCard index={room} name={name} img={""} lastChat={lastChat.msg} />)
    }

    function saveContact(e) {
        const name = nameRef.current.value;
        const email = emailRef.current.value;

        if (name === '' || email === '') return;

        e.preventDefault();

        if (email === selfEmail) {
            errorRef.current.textContent = "Enter a valid Email!";
            emailRef.current.value = "";
            emailRef.current.focus();
            return;
        }

        contacts.forEach(contact => {
            if (contact.email === email) {
                errorRef.current.textContent = "Contact with this email already exists!";
                emailRef.current.value = "";
                emailRef.current.focus();
                return;
            }
        })

        if (errorRef.current.textContent === "Contact with this email already exists!") return;

        fetch("https://chat-me.onrender.com/search", {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }).then(response => {
            response.json().then(response => {
                if (response.code === 201) {
                    addContact({ name, email });
                    errorRef.current.textContent = null;
                    modalRef.current.checked = false;
                    nameRef.current.value = "";
                    emailRef.current.value = "";
                }
                else if (response.code === 404) {
                    errorRef.current.textContent = 'No user with this email';
                    emailRef.current.value = "";
                    emailRef.current.focus();    
                }
                else {
                    errorRef.current.textContent = 'Internal Server Error';
                }
            });
        })
    }

    const tabContent = [
        (JSON.stringify(chat) !== "{}" ?
            chatMenu :
            <div className="h-full flex flex-col justify-center">
                <img src={catImg} alt="" />
                <div className="text-center text-3xl my-3">No Chats, Just a Cat!</div>
                <div className="text-center text-xl my-3">No Chats to Show! Meow 🐾</div>
            </div>),
        (contacts.length !== 0 ?
            contacts.map(room => {
                return (<ChatCard index={room.email} name={room.name} lastChat={room.email} setTab={setTab} />)
            }) :
            <div className="h-full flex flex-col justify-center">
                <img src={notFound} alt="" className="block h-64" />
                <div className="text-center text-3xl my-3">No Contacts to Show!</div>
                <div className="text-center text-xl">Save contacts to start a chat!</div>
            </div>)
    ];

    return (
        <ul className="menu grow relative">
            {tabContent[tab]}
            {tab === 1 ?
                <>
                    {/* The button to open modal */}
                    <label htmlFor="my-modal-4" className="btn modal-button btn-circle absolute right-5 bottom-5 z-30">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </label>

                    {/* Put this part before </body> tag */}
                    <input type="checkbox" id="my-modal-4" className="modal-toggle" ref={modalRef} />
                    <label htmlFor="my-modal-4" className="modal cursor-pointer">
                        <label className="modal-box relative" htmlFor="">
                            <h3 className="font-bold text-3xl">Add Contact</h3>
                            <form className="form-control my-3 flex flex-col gap-3" onSubmit={saveContact}>
                                <div>
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <label className="input-group input-group-vertical">
                                        <input type="text" placeholder="George Lucas" required className="input input-bordered" ref={nameRef} />
                                        <div className="text-sm text-red-600"></div>
                                    </label>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <label className="input-group input-group-vertical">
                                        <input type="email" placeholder="info@site.com" required className="input input-bordered" ref={emailRef} />
                                    </label>
                                    <div className="text-sm text-red-600 mt-1" ref={errorRef}></div>
                                </div>
                                <button type="submit" className="btn btn-primary my-2">Save</button>
                            </form>
                        </label>
                    </label>
                </> : null}
        </ul>
    )
}
