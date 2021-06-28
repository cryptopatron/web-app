import { useState } from "react";
import ImageLoginWoman from "./../../../../assets/images/login-woman.svg"
import ImageGoogleIcon from "./../../../../assets/images/google-icon.svg"
import ImageMetamaskIcon from "./../../../../assets/images/metamask-icon.svg"

export default function LoginOverlayComponent() {
    return (
        <>
        <div>
        <div> <img src={ImageLoginWoman} alt="desperation"/>  </div>
        <div className="">
            <h3 className="">Ready. Set. Koen.</h3>
            <button type="button" className="" ><span><img src={ImageGoogleIcon} alt="google"/></span> login with Google</button>
            <button type="button" className="" ><span><img src={ImageMetamaskIcon} alt="metamask"/></span> login with MetaMask</button>
            <button type="button" className="" >Google Sign out (temp)</button>
        </div>
    </div>
        </>
    );
}
