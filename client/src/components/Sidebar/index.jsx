import UserCard from "../UserCard"
import Menu from "./Menu"
import Tabs from "./Tabs"

export default function Sidebar({ openDrawer }) {
  return (
    <div className="w-96 h-screen overflow-y-auto overflow-x-hidden">
      <UserCard openDrawer={openDrawer} online={true} />
      <Tabs />
      <Menu />
    </div>
  )
}
