import { useRef, useState } from 'react'
import Lottie from 'react-lottie';
import animaitonData from '../../lotties/verified.json';

export default function Verify({ step }) {
    const otpRef = useRef();
    const [verified, setVerified] = useState(false);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animaitonData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    function verify() {
        setVerified(true);
        setTimeout(() => {
            step('next');
        }, 3000);
    }

    return (
        <div className="form-control flex gap-3 items-center h-full w-full justify-center">
            {
                !verified ?
                    <>
                        <label className="input-group flex w-1/3">
                            <span>OTP</span>
                            <input type="number" placeholder="* * * * * *" className="input input-bordered grow" required ref={otpRef} />
                        </label>
                        <button className="btn btn-primary w-1/3" onClick={verify}>VERIFY</button>
                        <label className="label py-0">
                            <span className="label-text">Enter OTP sent to your number</span>
                        </label>
                    </> :
                    <Lottie
                        options={defaultOptions}
                        height={250}
                        width={250}
                    />
            }
        </div>

    )
}
