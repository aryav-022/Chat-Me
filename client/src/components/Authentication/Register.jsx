import { useRef } from 'react'

export default function Register({ step }) {
    const nameRef = useRef();
    const phoneNumberRef = useRef();
    const passwordRef = useRef();

    function register() {
        const userName = nameRef.current.value;
        const phoneNumber = phoneNumberRef.current.value;
        const password = passwordRef.current.value;

        if (userName === "" || phoneNumber === '' || password == '') return;


        // fetch("http://localhost:8000/register", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         name: userName,
        //         phoneNumber: phoneNumber,
        //         password: password
        //     })
        // }).then(response => {
        //     response.json().then(response => {
        //         console.log(response);
        //         step('next');
        //     });
        // })
        step('next');
    }

    return (
        <div className="form-control flex gap-4 items-center h-full w-full justify-center">
            <label className="input-group flex w-1/3">
                <span>Name</span>
                <input type="text" placeholder="George Lucas" className="input input-bordered grow" required ref={nameRef} />
            </label>
            <label className="input-group flex w-1/3">
                <span>Phone Number</span>
                <input type="number" placeholder="8888888888" className="input input-bordered grow" required ref={phoneNumberRef} />
            </label>
            <label className="input-group flex w-1/3">
                <span>Password</span>
                <input name="password" type="password" placeholder="****************" className="input input-bordered grow" required ref={passwordRef} />
            </label>
            <div className="btn-group w-1/3">
                <button className="btn btn-active w-1/2" onClick={register}>Register</button>
                <button className="btn w-1/2" onClick={() => { step('next'); step('next'); }}>Login</button>
            </div>
        </div>
    )
}
