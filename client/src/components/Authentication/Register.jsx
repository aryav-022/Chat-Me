import { useRef } from 'react'

export default function Register({ step }) {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    function register(e) {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (name === "" || email === '' || password === '') return;

        e.preventDefault();

        fetch("https://chat-me.onrender.com:8000/register", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }).then(response => {
            response.json().then(response => {
                console.log(response);
                if (response.code === 201) {
                    step('next');
                    localStorage.setItem('chat-me-registered', JSON.stringify(true));
                    setTimeout(() => step('next'), 5000);
                }
            });
        })
    }

    return (
        <form className="form-control flex gap-4 items-center h-full w-full justify-center" onSubmit={register}>
            <label className="input-group flex w-1/3">
                <span>Name</span>
                <input type="text" placeholder="George Lucas" className="input input-bordered grow" required ref={nameRef} />
            </label>
            <label className="input-group flex w-1/3">
                <span>Email</span>
                <input type="email" placeholder="george@email.com" className="input input-bordered grow" required ref={emailRef} />
            </label>
            <label className="input-group flex w-1/3">
                <span>Password</span>
                <input name="password" type="password" placeholder="****************" className="input input-bordered grow" required ref={passwordRef} />
            </label>
            <div className="btn-group w-1/3">
                <button type="submit" className="btn btn-active w-1/2">Register</button>
                <button className="btn w-1/2" onClick={(e) => { e.preventDefault(); step('next'); step('next'); }}>Login</button>
            </div>
        </form>
    )
}
