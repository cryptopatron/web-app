import walletPic from '../../../assets/images/wallet-svg.svg'
import { Link } from 'react-router-dom';
import * as PATHS from '../../../constants/paths'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import UserContext from '../../../contexts/user';
import { useContext, useEffect } from 'react';

export default function Step3Component({ step, moveToStep, publicKey, pageName }) {
    const { setIsAuth, wallet } = useContext(UserContext)

    useEffect(() => {
        setIsAuth(true)
    }, [])
    
    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <div className="text-center">
                    <h2 className="title-font mb-6 font-semibold text-gray-900">Let's get you Onboard</h2>
                    <p className="text-gray-700 leading-relaxed">Your Wallet Integration</p>
                    <p className="text-gray-400 leading-relaxed">This is where your cryptocurrency will reside. Safely at that too!</p>
                </div>
                <div className="my-8 w-2/6 sm:w-40">
                    <img className="w-full object-cover object-center" alt="create page step1 image" src={walletPic} />
                </div>

                <div className=" flex flex-col justify-center ">
                    <div className="text-center w-auto">
                    <p className="mb-4 leading-relaxed"> {(wallet.wallet === "metamask") ? ("We have connected your Metamask wallet.") : ("We went ahead and made a wallet for you.") } </p>
                        
                    </div>
                    <div className="text-center w-auto">
                        <p className="mb-6 relaxed font-semibold">
                            {publicAddress}
                        </p>
                    </div>
                    <div className="mx-auto">
                        <Link to={`/${pageName}`}>
                            <button className="btn-sec">Continue to your page <FontAwesomeIcon icon={faArrowRight} /></button>
                        </Link>

                    </div>
                </div>
            </div>
        </section>
    );
}