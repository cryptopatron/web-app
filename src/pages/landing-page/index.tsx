import { useState, useEffect, useContext } from "react";
import NavbarComponent from "./components/navbar";
import useAuthUser from "../../hooks/useAuthUser";
import { howToContent } from "./how-to";
//context
import UserContext from "../../contexts/user";

// images
import ImageStartJourney from "./../../assets/images/start_journey.svg";
import ImageBackground_1 from "./../../assets/images/background_1.svg"
import FooterComponent from "../../components/footer";
import Rectangle from "./../../assets/images/rect.svg"

export default function LandingPage() {
    const { token, setToken, isLoggedIn } = useContext(UserContext);
    const [pageName, setPageName] = useState<string>();
    const [showLoginOverlay, setShowLoginOverlay] = useState(false);

    const { setResponse } = useAuthUser();

    const logIn = (jwt) => {
        if (!token) {
            setToken(jwt);
        }

        const endpoint = "/api/v1/google/users/get";
        setResponse(endpoint, jwt);
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
        console.log("useEffect listener");

        if (token) {
            console.log("token present - calling api");
            const endpoint = "/api/v1/google/users/get";
            setResponse(endpoint, token);
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <NavbarComponent
                setToken={logIn}
                token={token}
                clickSignIn={clickSignIn}
                openModal={openModal}
                closeModal={closeModal}
                showLoginOverlay={showLoginOverlay}
            />

            <div className="container mx-auto sm:px-6 flex-grow">

                <div className="flex justify-center">
                    <div className="text-left w-11/12 max-w-2xl">
                        <p className="mt-10 text-4xl font-semibold  md:text-5xl">
                            {" "}
                            <span className="leading-tight">Get your <div className=" inline-block "> <div className="z-10 relative"> creat</div> <div className="z-0"><img className="absolute transform -translate-y-4 md:-translate-y-5 -translate-x-8 w-32 h-3 md:w-40 md:h-4" src={Rectangle} alt="" /></div></div>ive work funded</span> <br /> <span className="text-4xl font-normal">on a truly global platform</span>{" "}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 md:mt-6">
                    <div className="md:row-start-2 mx-3 md:mx-0 justify-self-center md:justify-self-end">
                        <p className=" my-4 md:mt-8 font-medium text-gray-600 max-w-sm transform md:translate-x-10">
                            Accept financial support, create economies, and play value-based games with your fans from anywhere across the planet.
                        </p>
                    </div>
                    <div className="md:col-span-2 md:row-start-1">
                        <form
                            className="flex flex-col md:flex-row justify-center items-center"
                            onSubmit={(e) => {
                                e.preventDefault();
                                clickSignIn();
                            }}
                        >
                            <input
                                className="input-main w-full mt-3 sm:w-4/5 md:w-3/5 max-w-lg text-center md:text-left md: pl-8"
                                type="text"
                                aria-label="Enter your pagename"
                                placeholder="pagename"
                                value={pageName}
                                onChange={(e) => setPageName(e.target.value)}
                            />

                            <button className="btn-main w-full mx-3 mt-3 sm:w-4/5 md:w-28">
                                Create
                            </button>
                        </form>
                    </div>
                
                    <div className="flex justify-center md:justify-self-start">
                        <img
                            className=" w-48 transform translate-x-14 md:translate-x-48 lg:translate-x-60 "
                            src={ImageStartJourney}
                            alt="start journey"
                        />
                    </div>

                </div>
                
            </div>

            <div className=" flex-grow ">
                <div className="bg-repeat-x" style={{ backgroundImage: `url(${ImageBackground_1})` }}>
                    <div className="container mx-auto py-12">
                        <div className="flex flex-col justify-center max-w-2xl mx-auto mt-32">
                            <div className="flex justify-center mb-6">
                                <h3> How does it work?</h3>
                            </div>

                            <div className="grid sm:grid-cols-3 gap-6 sm:h-44">

                                {howToContent.map((card, index) => (
                                    <div key={index} className=" grid text-left shadow-lg bg-white rounded-md p-4 md:-translate-y-14">
                                        <div className="justify-self-start">
                                            <h2 className=""> {card.title} </h2>
                                        </div>
                                        <div className="sm:justify-self-end">
                                            <p className="mt-2 font-semibold text-gray-600">
                                                {card.content}
                                            </p>
                                        </div>
                                    </div>))}


                            </div>

                            <div className="flex flex-col justify-center mt-8 mb-2">
                                <div className="text-center">
                                    <h3> Don't have a crypto-wallet?</h3>
                                </div>
                                <div className="text-center">
                                    <p className="text-lg">We'll make one for you!</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <FooterComponent />
        </div>
    );
}
