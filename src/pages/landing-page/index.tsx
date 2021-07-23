import { useState, useEffect, useContext } from "react";
import NavbarComponent from "./components/navbar";
import { getAuthUser } from "../../services/backendService";
import { useHistory } from "react-router";
import * as PATHS from '../../constants/paths'
//context
import UserContext from "../../contexts/user";
import LoggedInUserContext from "../../contexts/logged-in-user";

// images
import ImageStartJourney from "./../../assets/images/start_journey.svg";
import ImageLadyBird from "./../../assets/images/ladybird.png";
import ImageLookForCreators from "./../../assets/images/look_for_creators.svg";

export default function LandingPage() {
    const { token, setToken, setIsLoggedIn } = useContext(UserContext);
    const { setUser } = useContext(LoggedInUserContext)
    const [pageName, setPageName] = useState<string>();
    const [showLoginOverlay, setShowLoginOverlay] = useState(false);
    const history = useHistory()

    const logIn = async (jwt) => {
        if (!token) {
            setToken(jwt);
        }
        const response = await getAuthUser(jwt);
        
        if (response.status === 401){
            history.push('/')
        }
        if (response.status === 404) {
            history.push(PATHS.ONBOARD)
        }
        if (response.status === 200) {
            setIsLoggedIn(true)
            setUser(response.data)
            history.push(PATHS.DASHBOARD)
        }
    };

    const clickSignIn = () => {
        if (token) {
            logIn(token);
        } else {
            openModal();
        }
    };

    function closeModal() {
        setShowLoginOverlay(false);
    }

    function openModal() {
        setShowLoginOverlay(true);
    }

    useEffect(() => {
        document.title = "Kōen";
    }, []);

    return (
        <div>
            <NavbarComponent
                setToken={logIn}
                token={token}
                clickSignIn={clickSignIn}
                openModal={openModal}
                closeModal={closeModal}
                showLoginOverlay={showLoginOverlay}
            />

            <div className="container mx-auto sm:px-6">
                <form
                    className="flex flex-col md:flex-row justify-center items-center mt-5"
                    onSubmit={(e) => {
                        e.preventDefault();
                        clickSignIn();
                    }}
                >
                    <input
                        className="input-main w-full sm:w-4/5 md:w-3/5 max-w-lg text-center md:text-left md: pl-8"
                        type="text"
                        aria-label="Enter your pagename"
                        placeholder="pagename"
                        value={pageName}
                        onChange={(e) => setPageName(e.target.value)}
                    />

                    <button className="btn-main w-full mx-3 sm:w-4/5 md:w-28">
                        Create
                    </button>
                </form>

                <div className="flex flex-col md:flex-row justify-center items-center">
                    <div className="flex order-first md:order-last justify-center ">
                        <img
                            className=" w-4/5 transform translate-x-14 lg:translate-x-24 "
                            src={ImageStartJourney}
                            alt="start journey"
                        />
                    </div>

                    <div className="max-w-md transform md:translate-y-8 text-center md:text-left">
                        <h1 className="mt-10">
                            {" "}
                            Get your creative work funded, on a truly global platform{" "}
                        </h1>
                        <p className="my-4 md:mt-8 font-medium text-gray-600">
                            Koen empowers creators to accept financial support, create
                            economies, and play value-based games with their fans, from
                            anywhere across the planet.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center">
                    <div className="order-first md:order-last">
                        <div className="flex relative justify-center transform lg:translate-x-12">
                            <img className=" w-4/5" src={ImageLadyBird} alt="lady bird" />
                            <div className="absolute inset-20 sm:top-24 z-10 ">
                                <h2 className=""> Don't have a crypto-wallet? </h2>
                                <p className="mt-2 font-semibold text-gray-600">
                                    {" "}
                                    We'll automagically create one for you! No worries.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <img
                            className="w-4/5 mt-4 transform md:translate-y-16"
                            src={ImageLookForCreators}
                            alt="look for creators"
                        />
                    </div>
                </div>

                <div className="footer"></div>
            </div>
        </div>
    );
}
