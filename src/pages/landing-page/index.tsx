import { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";

import useToken from "../../hooks/useToken";
import NavbarComponent from './components/navbar'

import * as PATHS from "./../../constants/paths";
import useAuthUser from '../../hooks/useAuthUser';

//context
import UserContext from '../../contexts/user';

// images
import ImageStartJourney from './../../assets/images/start_journey.svg';
import ImageLadyBird from './../../assets/images/ladybird.png'
import ImageLookForCreators from './../../assets/images/look_for_creators.svg'

export default function LandingPage() {

    const {user, isLoggedIn} = useContext(UserContext)
    const [pageName, setPageName] = useState<string>()
    const [showLoginOverlay, setShowLoginOverlay] = useState(false);

    const { token, setToken } = useToken({isLoggedIn});
    const {setResponse} = useAuthUser()

    const googleLogIn= (token) => {
        console.log(token)
        const endpoint = "/api/v1/google/users/get"
        setResponse(endpoint)
    }
    

    const logIn = async (jwt) => {
        if (!token) {
            await setToken(jwt)
        }
        console.log(token)
        googleLogIn(token)
    }

    const clickSignIn = () => {
        if(token){
            logIn(token)
        }
        else{
            openModal()
        }
    }

    function closeModal() {
        setShowLoginOverlay(false)
    }

    function openModal() {
        setShowLoginOverlay(true)
    }

    useEffect(() => {
        document.title = 'Kōen';
    }, []);

    return (
        <div>
            <NavbarComponent setToken={logIn} token={token} clickSignIn={clickSignIn} openModal={openModal} closeModal={closeModal} showLoginOverlay={showLoginOverlay}/>

            <div className="container mx-auto sm:px-6">

                <form className="flex flex-col md:flex-row justify-center items-center mt-5" onSubmit={(e) => {
                    e.preventDefault();
                    clickSignIn()
                    }}>

                    <input className="input-main w-full sm:w-4/5 md:w-3/5 max-w-lg text-center md:text-left md: pl-8"
                        type="text"
                        aria-label="Enter your pagename"
                        placeholder="pagename"
                        value={pageName} 
                        onChange={(e) => setPageName(e.target.value)}/>

                    <button className="btn-main w-full sm:w-4/5 md:w-28" >Create</button>

                </form>

                <div className="flex flex-col md:flex-row justify-center items-center">

                    <div className="flex order-first md:order-last justify-center ">
                        <img className=" w-4/5 transform translate-x-14 lg:translate-x-24 " src={ImageStartJourney} alt="start journey" />
                    </div>

                    <div className="max-w-md transform md:translate-y-8 text-center md:text-left">
                        <h1 className="mt-10"> Stir up support on a truly global platform </h1>
                        <p className="my-4 md:mt-8 font-medium text-gray-600">Koen empowers creators to accept support,
                            memberships, and build a direct relationship with their fans, from anywhere across the planet.</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center">
                    <div className="order-first md:order-last">
                        <div className="flex relative justify-center transform lg:translate-x-12">
                            <img className=" w-4/5" src={ImageLadyBird} alt="lady bird" />
                            <div className="absolute inset-20 sm:top-24 z-10 ">
                                <h2 className=""> Don't have a crypto-wallet? </h2>
                                <p className="mt-2 font-semibold text-gray-600"> We'll create one for you on login! 'Tis super simple.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <img className="w-4/5 mt-4 transform md:translate-y-16" src={ImageLookForCreators} alt="look for creators" />
                    </div>

                </div>

                <div className="footer">
                </div>
            </div>
        </div>
    )

}