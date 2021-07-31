import { GoogleLogin, GoogleLogout } from "react-google-login";
import Web3 from "web3";
import ImageLoginWoman from "./../../../../assets/images/login-woman.svg";
import ImageGoogleIcon from "./../../../../assets/images/google-icon.svg";
import ImageMetamaskIcon from "./../../../../assets/images/metamask-icon.svg";
import {useContext, useState} from "react";
import UserContext from "../../../../contexts/user";
import {defaultCreator} from "../../../../contexts/logged-in-user";
import { getWalletAuthUser } from "../../../../services/backendService";



const clientId =
    "116852492535-37n739s732ui71hkfm19n5r3agv6g9c5.apps.googleusercontent.com";
const googlePerms = "https://www.googleapis.com/auth/drive.appdata";

export default function LoginOverlayComponent({ setToken }) {
    const {setAccessToken} = useContext(UserContext);
    const [msg, setMsg] = useState('');
    const [err, setErr] = useState('');

    const responseGoogleOnSuccess = (response) => {
        setToken(response.tokenId);
        setAccessToken(response.accessToken)
        
    };

    const responseGoogleOnFailure = (response) => {
        console.log(JSON.stringify(response));
    };

    const logout = () => {
        console.log("logged out");
    };

    async function metamask_sign_in() {
        setMsg('');
        setErr('');

        if ((window as any).ethereum) {
            try {
                const ethereum = (window as any).ethereum;
                const web3Provider = new Web3(ethereum);
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                const account_address = String(accounts[0]);
                const current_unix = String(Date.now());
                if (accounts.length > 0) {
                    web3Provider.eth.personal.sign(current_unix, String(accounts[0]), "test password").then( async (res) => {
                        const loginParams = {
                            "Nonce": current_unix,
                            "Signature": res,
                            "MetaMaskWalletPublicKey": account_address
                        }
                        const response = await getWalletAuthUser(loginParams)
                        
                    });
                } else {
                    setErr('No Accounts Found in Metamask')
                }
            } catch (error) {
                setErr('Failed to Connect to Metamask');
            }
        } else {
            setErr('Metamask Not Detected');
        }
    }



    return (
        <>
            <div className="flex flex-row w-full">
                <div className="hidden sm:flex w-5/12 bg-primary-light justify-center items-center">
                    <div className="">
                        <img
                            className=""
                            src={ImageLoginWoman}
                            alt="login woman"
                        />
                    </div>
                </div>

                <div className="flex flex-col mx-auto justify-center w-full max-w-sm sm:w-7/12 px-1 sm:px-8">
                    <h2 className="text-center my-12">Ready. Set. Koen.</h2>
                    <GoogleLogin
                        clientId={clientId}
                        scope={googlePerms}
                        render={(renderProps) => (
                            <button
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                type="button"
                                className="flex btn-sec m-4  justify-center"
                            >
                                <span className="block text-left w-4/5 sm:w-11/12 sm:ml-4">
                                    <img
                                        className="inline-block w-7 mx-2"
                                        src={ImageGoogleIcon}
                                        alt="google"
                                    />{" "}
                                    login with Google{" "}
                                </span>
                            </button>
                        )}
                        buttonText="Login"
                        onSuccess={responseGoogleOnSuccess}
                        onFailure={responseGoogleOnFailure}
                        cookiePolicy={"single_host_origin"}
                        isSignedIn={false}
                    />

                    <button
                        type="button"
                        className="flex btn-sec m-4 justify-center sm:mb-14"
                        onClick={metamask_sign_in}
                    >
                        <span className="block text-left w-4/5 sm:w-11/12 sm:ml-4">
                            <img
                                className="inline-block w-7 mx-2"
                                src={ImageMetamaskIcon}
                                alt="metamask"
                            />{" "}
                            login with MetaMask{" "}
                        </span>
                    </button>
                    <div className="text-center">
                        <h6 style={{alignSelf: "center", textAlign: "center"}}>{msg}</h6>
                        <h6 style={{color: "red"}}>{err}</h6>
                    </div>
                    <br></br><br></br>
                    {/* <GoogleLogout
                        clientId={clientId}
                        buttonText="Logout"
                        onLogoutSuccess={logout}
                    ></GoogleLogout> */}

                </div>
            </div>
        </>
    );
}
