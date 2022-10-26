import { useRef } from 'react'
import Lottie from 'react-lottie';

export default function Login({ step }) {
    const phoneNumberRef = useRef();
    const passwordRef = useRef();

    function login() {
        step('next');
    }

    return (
        <div className="form-control flex gap-3 items-center h-full w-full justify-center">
            <label className="input-group flex w-1/3">
                <span>Phone Number</span>
                <input type="number" placeholder="8888888888" className="input input-bordered grow" required ref={phoneNumberRef} />
            </label>
            <label className="input-group flex w-1/3">
                <span>Password</span>
                <input type="password" placeholder="****************" className="input input-bordered grow" required ref={passwordRef} />
            </label>
            <button className="btn btn-primary w-1/3" onClick={login}>Login</button>
        </div>
    )
}
