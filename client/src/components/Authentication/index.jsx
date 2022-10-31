import { useToken } from "../../App";
import { GoogleLogin } from '@react-oauth/google';
import { useRef, useState } from "react";
import { useFetch } from "../../api/useFetch";
import loadingAnimation from '../../assets/loading.png';

export default function Authentication() {
    const [token, setToken] = useToken();
    const [loading, setLoading] = useState(false);

    const errorRef = useRef();

    return (
        <div>
            <div className="navbar bg-base-100 absolute top-0">
                <a className="btn btn-ghost normal-case text-xl">chatme</a>
            </div>
            <div className="flex w-screen h-screen justify-around items-center">
                <img className="block rounded-full max-h-96 border-4 border-dashed" src="/favicon.jpg" alt="" />
                <div className="rounded-2xl bg-base-300 p-5 flex flex-col items-center">
                    <div className="text-3xl mb-8">Sign In with Google</div>
                    {
                        loading ?
                            <img className="block h-12 w-12 rounded-full" src={loadingAnimation} alt="" />
                            :
                            <GoogleLogin
                                onSuccess={async (credentialResponse) => {
                                    setLoading(true);
                                    const response = JSON.parse(window.atob(credentialResponse.credential.split('.')[1]));
                                    const data = {
                                        name: response.given_name + " " + response.family_name,
                                        email: response.email,
                                        image: response.picture
                                    }
                                    const serverResponse = await useFetch("login", "POST", data);
                                    if (serverResponse.code === 201) {
                                        errorRef.current.textContent = '';
                                        setToken(serverResponse.token);
                                    }
                                    else {
                                        errorRef.current.textContent = 'Internal Server Error! Try again later.';
                                    }
                                    setLoading(false);
                                }}
                                onError={() => {
                                    errorRef.current.textContent = 'Login Failed';
                                }}
                            />
                    }
                    <div className="text-red-600" ref={errorRef}></div>
                </div>
            </div>
        </div>
    )
}
