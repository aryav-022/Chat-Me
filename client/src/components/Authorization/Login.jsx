import { useRef } from 'react'

export default function Login({ step }) {
    const phoneNumberRef = useRef();
    const passwordRef = useRef();

    function login() {
        const phoneNumber = phoneNumberRef.current.value;
        const password = passwordRef.current.value;

        if (phoneNumber === '' || password == '') return;

        fetch("http://localhost:8000/login", {
            method: "POST",
            body: JSON.stringify({
                phoneNumber: phoneNumber,
                password: password
            })
        }).then(response => {
            response.json().then(response => {
                console.log(response);
                step('next');
            });
        })
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
            <div className="btn-group w-1/3">
                <button className="btn btn-active w-1/2" onClick={login}>Login</button>
                <button className="btn w-1/2" onClick={() => { step('prev'); step("prev"); }}>Register</button>
            </div>
        </div>
    )
}
