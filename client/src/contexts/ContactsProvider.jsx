import { useContext, createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToken } from "../App";

const ContactsContext = createContext();

export function useContacts() {
    return useContext(ContactsContext);
}

export default function ContactsProvider({ children }) {
    const [token, setToken] = useToken();
    const { name, email } = JSON.parse(window.atob(token.split('.')[1]));

    const [contacts, setContacts] = useLocalStorage(email + "-contacts", []);

    /*
        Contacts Structure
        [
            {
                name: "Gitansh",
                phoneNumber: 8888888888
            },
            {
                name: "Papa",
                phoneNumber: 1010101010
            }
        ]
    */

    function addContact(contact) {
        setContacts(contacts => {
            const updatedContacts = [...contacts, contact];
            return updatedContacts;
        })
    }

    function deleteContact(contact) {
        setContacts(contacts => {
            const remainingContacts = contacts.filter(con => { return con.email !== contact.email; });
            return remainingContacts;
        })
    }

    return (
        <ContactsContext.Provider value={{ contacts, addContact, deleteContact }}>
            {children}
        </ContactsContext.Provider>
    )
}