import UserCard from "../UserCard"
import Menu from "./Menu"
import Tabs from "./Tabs"
import { useToken } from "../../App";
import { useState } from "react";

export default function Sidebar({ openDrawer }) {
  const [token, setToken] = useToken();
  const { name, email, image } = JSON.parse(window.atob(token.split('.')[1]));

  const [tab, setTab] = useState(0);

  return (
    <div className="w-96 h-screen overflow-y-auto overflow-x-hidden flex flex-col max-sm:w-screen bg-base-100">
      <UserCard openDrawer={openDrawer} online={true} obj={{ name, members: email, image }} />
      <Tabs tab={tab} setTab={setTab} />
      <Menu tab={tab} setTab={setTab} />
    </div>
  )
}
