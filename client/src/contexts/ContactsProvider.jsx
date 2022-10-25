import { useContext, createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ContactsContext = createContext();

export function useContacts() {
    return useContext(ContactsContext);
}

export default function ContactsProvider({ children}) {
    const id = 7011142551;
    const [contacts, setContacts] = useLocalStorage(id + "-contacts", []);

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

    
    
    return (
        <ContactsContext.Provider value={[contacts, setContacts]}>
            {children}
        </ContactsContext.Provider>
    )
}