import { useState } from 'react';
import classNames from 'classnames';
import { useContext } from 'react';

import ImageDefaultProfile1 from './../../../assets/images/default_profile_1.svg';
import { randomPastelColourService } from '../../../services/randomPastelColourService';
import { checkIfUserExists } from '../../../services/backendService';
import { registerPage } from '../../../services/registerPageName';
import { WalletGenerationService } from "../../../services/walletGenerationService";
import UserContext from '../../../contexts/user';

export default function Step2Component({ step,
    moveToStep,
    accessToken,
    setPublicAddress,
    pageName,
    setPageName }) {
    const [isValid, setValid] = useState(false);
    const [isNeutral, setNeutral] = useState(true);
    const [isNamePresent, setIsNamePresent] = useState(true);
    const { token, wallet } = useContext(UserContext);

    const profileBg = randomPastelColourService()

    let pageChangeCSS = classNames({
        'input-main': true,
        'py-2': true,
        'w-full': true,
        'bg-gray-100': true,
        'bg-opacity-50': true,
        'focus:ring-2': true,
        'focus:bg-transparent': true,
        'border': true,
        'border-gray-300': true,
        'focus:border-blue-500': true,
        'text-base': true,
        'outline-none': true,
        'text-gray-700': true,
        'leading-8': true,
        'transition-colors': true,
        'duration-200': true,
        'ease-in-out': true,
        'text-center': true,
        'focus:ring-blue-200': isNeutral,
        'focus:ring-green-200': isValid,
        'focus:ring-red-200': !isValid
    });

    let nameLengthCSS = classNames({
        'mb-1': true,
        'text-xs': true,
        'text-center': true,
        'hidden': isValid
    });

    let userPresentCSS = classNames({
        'mb-1': true,
        'text-sm': true,
        'text-center': true,
        'hidden': isNamePresent,
        'text-red-400': true
    });

    let buttonInactiveCSS = classNames({

        'btn-main w-full text-center': true,
        'opacity-50 hover:opacity-50 pointer-events-none': !(isValid),

    });

    const handleChange = (name) => {
        if (name.length == 0) {
            setValid(false);
            setNeutral(true);
            setPageName(name);
        }
        else if (name.length < 4 && name.length > 0) {
            setValid(false);
            setNeutral(false);
            setPageName(name);
        }
        else {
            setValid(true);
            setNeutral(false);
            setPageName(name);
        }

    }

    const generateWallet = (accessToken) => {
        let service = new WalletGenerationService();
        return service.setupMaticWallet(accessToken);
    };

    const onCreateClick = async () => {
        if (isValid) {
            if (checkIfUserExists(pageName)) {

                if (wallet.wallet === "metamask") {
                    console.log(wallet)
                    setPublicAddress(wallet.address)
                    if (registerPage(pageName, {metaMaskWalletPublicAddress: wallet.address}, token)) {
                        moveToStep(3);
                    }
                }
                else {
                    generateWallet(accessToken).then((walletAddr) => {
                        if (walletAddr) {
                            console.log("Public wallet address ", walletAddr);
                            setPublicAddress(walletAddr)
                            if (registerPage(pageName, {generatedMaticWalletPublicAddress: walletAddr}, token)) {
                                moveToStep(3)
                            }
                        }
                    });
                }
            }
            else {
                setIsNamePresent(false);
            }
        }
    }

    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
                <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
                    <div className="text-center">
                        <h2 className="title-font mb-6 font-semibold text-gray-900">Let's get you Onboard</h2>
                        <p className=" text-gray-700 leading-relaxed ">Choose your page name wisely!</p>
                        <p className=" text-gray-400 leading-relaxed mb-8">Remember your email from ten years ago?</p>
                    </div>
                    <div className="my-8 w-2/6 sm:w-40">
                        <div className=" flex mx-auto justify-center top-16 w-32 h-32 rounded-full" style={{ background: `${profileBg[0]}` }}>
                            <img className="w-2/5 transform translate-y-3" src={ImageDefaultProfile1} alt="place_holder_image" />
                        </div>
                    </div>
                    <div className="w-68 sm:w-72 mt-3">
                        <div className="flex w-full h-20 justify-center items-end mt-5">
                            <div className="relative w-full">
                                <div>
                                    <label className={nameLengthCSS}>Page name must have 4 or more characters</label>
                                    <label className={userPresentCSS}>Apologies! This name has already been taken.</label>
                                </div>
                                <div>
                                    <input type="text" value={pageName} id="hero-field" onChange={(e) => handleChange(e.target.value)} name="hero-field" placeholder="Page Name" className={pageChangeCSS} />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center items-center mt-3">
                            <button className={buttonInactiveCSS} onClick={() => onCreateClick()} >Create</button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}