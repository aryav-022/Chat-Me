import { useRef } from "react"

export default function Tabs() {
    const TabsRef = useRef();

    function toggleTab(currentTab) {
        const tabs = TabsRef.current.children;

        for (const tab of tabs) {
            if (tab.classList.contains("active")) {
                tab.classList.remove('active');
                tab.classList.remove('border-b-gray-400');
                tab.classList.add('border-b-white');
                tab.classList.add('border-opacity-10');
                break;
            }
        }
        
        tabs[currentTab].classList.remove('border-b-white');
        tabs[currentTab].classList.remove('border-opacity-10');
        tabs[currentTab].classList.add('active');
        tabs[currentTab].classList.add('border-b-gray-400');
    }

    return (
        <div className="btm-nav h-12 sticky top-0 z-20" ref={TabsRef}>
            <button className="border-t-transparent border-b-2 border-b-gray-400 active" onClick={() => toggleTab(0)}>
                <div className="tooltip tooltip-bottom" data-tip="Conversations">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                    </svg>
                </div>
            </button>
            <button className="border-t-transparent border-b-2 border-b-white border-opacity-10" onClick={() => toggleTab(1)}>
                <div className="tooltip tooltip-bottom" data-tip="Contacts">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                </div>
            </button>
        </div>
    )
}
