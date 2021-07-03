import { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import ImageLoginWoman from "./../../../../assets/images/login-woman.svg";
import ImageGoogleIcon from "./../../../../assets/images/google-icon.svg";
import ImageMetamaskIcon from "./../../../../assets/images/metamask-icon.svg";
import { refreshTokenSetup } from "./refreshTokenSetup";
import { WalletGenerationService } from "../../../../services/walletGenerationService";

const clientId =
  "116852492535-37n739s732ui71hkfm19n5r3agv6g9c5.apps.googleusercontent.com";
const googlePerms = "https://www.googleapis.com/auth/drive.appdata";

export default function LoginOverlayComponent({ setToken }) {
  const responseGoogleOnSuccess = (response) => {
    console.log("request to google sents");
    setToken(response.tokenId);
    generateWallet(response.accessToken).then((walletAddr) => {
      if (walletAddr) {
        console.log("Public wallet address", walletAddr);
      }
    });
    // console.log(response.tokenID)
    // refreshTokenSetup(response)s
  };

  const generateWallet = (accessToken) => {
    let service = new WalletGenerationService();
    return service.setupMaticWallet(accessToken);
  };

  const responseGoogleOnFailure = (response) => {
    console.log(JSON.stringify(response));
  };

  const logout = () => {
    console.log("logged out");
  };

  return (
    <>
      <div className="flex flex-row w-full">
        <div className=" flex hidden sm:block w-5/12 bg-primary-light">
          <img
            className="flex hidden sm:block mx-auto"
            src={ImageLoginWoman}
            alt="desperation"
          />
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
          <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={logout}
          ></GoogleLogout>
        </div>
      </div>
    </>
  );
}
