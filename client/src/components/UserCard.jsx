import { useRef } from "react";

export default function UserCard({ openDrawer, obj }) {
    const imgRef = useRef();

    function removeAnimation() {
        imgRef.current.classList.remove('animate-pulse');
    }

    return (
        <div className="relative top-0 min-h-[4.0625rem] bg-base-300 px-4 py-2 border-b border-gray-600 z-10 flex gap-4 items-center overflow-hidden">
            <div className={`avatar ${obj ? "" : "online"} cursor-pointer`} onClick={openDrawer}>
                <div className="w-12 h-12 rounded-full">
                    <img src="https://placeimg.com/192/192/people" className="bg-gray-600 animate-pulse" onLoad={removeAnimation} ref={imgRef} />
                </div>
            </div>
            {
                obj ? <div className="w-3/4">
                    <div className="font-bold text-white truncate w-full">{obj.name}</div>
                    <div className="text-sm opacity-50 truncate w-full">{obj.members}</div>
                </div> : ""
            }
        </div>
    )
}
