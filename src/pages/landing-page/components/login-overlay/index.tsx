import { useState } from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import ImageLoginWoman from "./../../../../assets/images/login-woman.svg"
import ImageGoogleIcon from "./../../../../assets/images/google-icon.svg"
import ImageMetamaskIcon from "./../../../../assets/images/metamask-icon.svg"
import { refreshTokenSetup } from "./refreshTokenSetup";

import { NOTFOUND_PATH }  from './../../../../constants/paths'

const clientId = '116852492535-37n739s732ui71hkfm19n5r3agv6g9c5.apps.googleusercontent.com';

export default function LoginOverlayComponent() {

    const history = useHistory();

    const googleLogIn = async googleData => {
        const res = await fetch(window.origin + "/api/v1/google/users/get/", {
            method: "POST",
            body: JSON.stringify({
                idToken: googleData.tokenId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        if(data.error) throw new Error(data.error)

        if(data){
            console.log(JSON.stringify(data))
            // history.push(NOTFOUND_PATH);
        }
    }

    const responseGoogleOnSuccess = (response) => {
        console.log(JSON.stringify(response))
        googleLogIn(response)
        // refreshTokenSetup(response)
    }


    const responseGoogleOnFailure = (response) => {
        console.log(JSON.stringify(response))
    }

    const logout = () => {
        console.log("logged out")
    }

    return (
        <>
            <div className="flex flex-row">
                <div className="">
                    <img className="hidden sm:block" src={ImageLoginWoman} alt="desperation" />
                </div>
                <div className="flex flex-col mx-auto justify-center">
                    <h3 className="text-center">Ready. Set. Koen.</h3>
                    <GoogleLogin
                        clientId={clientId}
                        render={renderProps => (
                            <button onClick={renderProps.onClick} disabled={renderProps.disabled} type="button" className="btn-sec" ><span><img className="inline-block w-7 mx-2" src={ImageGoogleIcon} alt="google" /></span> login with Google</button>
                        )}
                        buttonText="Login"
                        onSuccess={responseGoogleOnSuccess}
                        onFailure={responseGoogleOnFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    />

                    <button type="button" className="btn-sec" ><span><img className="inline-block w-7 mx-2" src={ImageMetamaskIcon} alt="metamask" /></span> login with MetaMask</button>
                    <GoogleLogout
                        clientId={clientId}
                        buttonText="Logout"
                        onLogoutSuccess = {logout}
                    >
                    </GoogleLogout>
                </div>
            </div>
        </>
    );
}
