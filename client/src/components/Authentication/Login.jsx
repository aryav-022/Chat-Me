import { useRef } from 'react'
import { useToken } from '../../App';

export default function Login({ step }) {
    const emailRef = useRef();
    const passwordRef = useRef();

    const [token, setToken] = useToken();

    function login(e) {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (email === '' || password == '') return;

        e.preventDefault();

        fetch("https://chat-me.onrender.com:8000/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }).then(response => {
            response.json().then(response => {
                console.log(response);
                if (response.code === 201) {
                    step('next');
                    localStorage.setItem('chat-me-registered', JSON.stringify(true));
                    setTimeout(() => setToken(response.token), 5000);
                }
            });
        })
    }

    return (
        <form className="form-control flex gap-3 items-center h-full w-full justify-center" onSubmit={login}>
            <label className="input-group flex w-1/3">
                <span>Email</span>
                <input type="email" placeholder="george@email.com" className="input input-bordered grow" required ref={emailRef} />
            </label>
            <label className="input-group flex w-1/3">
                <span>Password</span>
                <input type="password" placeholder="****************" className="input input-bordered grow" required ref={passwordRef} />
            </label>
            <div className="btn-group w-1/3">
                <button type='submit' className="btn btn-active w-1/2">Login</button>
                <button className="btn w-1/2" onClick={(e) => { e.preventDefault(); step('prev'); step("prev"); }}>Register</button>
            </div>
        </form>
    )
}
