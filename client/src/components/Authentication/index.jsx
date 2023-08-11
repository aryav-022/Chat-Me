import { useToken } from "../../App";
import { GoogleLogin } from '@react-oauth/google';
import { useRef, useState } from "react";
import { useFetch } from "../../api/useFetch";
import loadingAnimation from '../../assets/loading.gif';


/*
    Auth page
        loading state: loading image
        auth state: Google Auth Screen
            when trying to login set loading var to true (go to loading state)
*/
export default function Authentication() {
    const [token, setToken] = useToken();
    const [loading, setLoading] = useState(false);

    const errorRef = useRef();

    return (
        <div>
            <a className="btn btn-ghost normal-case text-xl fixed top-2 left-2">chatme</a>
            <div className="flex max-w-screen justify-around items-center my-16 gap-12 flex-col md:flex-row md:h-screen md:my-0">
                <img className="block rounded-full max-h-64 border-4 border-dashed md:max-h-96" src="/favicon.jpg" alt="" />
                <div className="rounded-2xl bg-base-300 p-5 flex flex-col items-center">
                    <div className="text-3xl mb-8">Sign In with Google</div>
                    {
                        loading ?
                            // Loading state - show basic image
                            <img className="block h-12 w-12 rounded-full" src={loadingAnimation} alt="" />
                            :
                            // Auth State - show Google Auth screen
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
