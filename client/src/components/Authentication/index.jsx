import { useRef, useEffect } from "react";
import Register from "./Register";
import Verify from "./Verify";
import Login from "./Login";
import Fetching from "./Fetching";

export default function Authentication() {
    const stepsRef = useRef();
    const sliderRef = useRef();

    let slideNumber = 1;

    function step(to) {
        if (to === 'next') {
            const steps = stepsRef.current.children;
            steps[slideNumber].classList.add('step-primary');
            
            sliderRef.current.children[slideNumber].classList.remove('hidden');
            sliderRef.current.style.translate = `-${100*slideNumber}%`;
            slideNumber++;
        }
        else if (to === 'prev') {
            const steps = stepsRef.current.children;
            steps[slideNumber - 1].classList.remove('step-primary');
            
            sliderRef.current.style.translate = `${100*(slideNumber - 2)}%`;
            slideNumber--;
        }
    }

    let useEffectCalled = false;

    useEffect(() => {
        if (useEffectCalled) return;

        const registered = JSON.parse(localStorage.getItem('chat-me-registered'));
        if (registered) {
            step('next');
            step('next');
        }

        useEffectCalled = true;
    }, [])
    
    return (
        <div className="flex flex-col items-center justify-around w-screen h-screen pt-32">

            <div className="navbar bg-base-100 absolute top-0">
                <a className="btn btn-ghost normal-case text-xl">Chatme</a>
            </div>

            <div className="container flex items-center justify-between overflow-hidden">
                {/* {<button className="btn btn-square" disabled={true} onClick={step('prev')}> <kbd>◀︎</kbd> </button>} */}

                <div className="grow row-grid transition-all duration-1000" ref={sliderRef}>
                    <div><Register step={step} /></div>
                    <div className="hidden"><Verify step={step} /></div>
                    <div className="hidden"><Login step={step} /></div>
                    <div className="hidden"><Fetching step={step} /></div>
                </div>

                {/* {<button className="btn btn-square" disabled={true} onClick={() => step('next')}> <kbd>▶︎</kbd> </button>} */}

            </div>

            <ul className="steps steps-vertical lg:steps-horizontal w-1/3" ref={stepsRef}>
                <li className="step before:cursor-default after:transition-all before:transition-all before:duration-500 after:duration-500 step-primary" onClick={() => step(0)}>Register</li>
                <li className="step before:cursor-dxefault after:transition-all before:transition-all before:duration-500 after:duration-500" onClick={() => step(1)}>Verify</li>
                <li className="step before:cursor-default after:transition-all before:transition-all before:duration-500 after:duration-500" onClick={() => step(2)}>Login</li>
                <li className="step before:cursor-default after:transition-all before:transition-all before:duration-500 after:duration-500" onClick={() => step(3)}>Enjoy</li>
            </ul>

        </div>
    )
}
