import ChatCard from "./ChatCard";
import { useChat } from "../../contexts/ChatProvider";

export default function Menu() {
    const [currentChat, setCurrentChat] = useChat();

    return (
        <ul className="menu">
            <ChatCard current={[currentChat, setCurrentChat]} index={0} />
            <ChatCard current={[currentChat, setCurrentChat]} index={1} />
            <ChatCard current={[currentChat, setCurrentChat]} index={2} />
            <ChatCard current={[currentChat, setCurrentChat]} index={3} />
            <ChatCard current={[currentChat, setCurrentChat]} index={4} />
            <ChatCard current={[currentChat, setCurrentChat]} index={5} />
            <ChatCard current={[currentChat, setCurrentChat]} index={6} />
            <ChatCard current={[currentChat, setCurrentChat]} index={7} />
            <ChatCard current={[currentChat, setCurrentChat]} index={8} />
            <ChatCard current={[currentChat, setCurrentChat]} index={9} />
            <ChatCard current={[currentChat, setCurrentChat]} index={10} />
            <ChatCard current={[currentChat, setCurrentChat]} index={11} />
        </ul>
    )
}
