import { useState, useEffect, useContext } from "react";
import NavbarComponent from "./components/navbar";
import useAuthUser from "../../hooks/useAuthUser";
import { howToContent } from "./how-to";
//context
import UserContext from "../../contexts/user";

// images
import ImageStartJourney from "./../../assets/images/start_journey.svg";
import ImageLadyBird from "./../../assets/images/ladybird.png";
import ImageLookForCreators from "./../../assets/images/look_for_creators.svg";
import FooterComponent from "../../components/footer";

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
                            Get your creative work funded <br /> <span className="text-4xl font-normal">on a truly global platform</span>{" "}
                        </p>
                        <p className=" md:hidden my-4 md:mt-8 font-medium text-gray-600">
                            Accept financial support, create
                            economies, and play value-based games with your fans, from
                            anywhere across the planet.
                        </p>
                    </div>
                </div>
                <form
                    className="flex flex-col md:flex-row justify-center items-center mt-5"
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

                <div className="flex flex-col md:flex-row justify-center items-center mb-10">
                    <div className="flex order-first md:order-last justify-center ">
                        <img
                            className=" w-4/5 transform translate-x-14 lg:translate-x-24 "
                            src={ImageStartJourney}
                            alt="start journey"
                        />
                    </div>

                    <div className="max-w-md transform -translate-y-5 text-center md:text-left">

                        <p className="hidden md:inline-block font-medium text-gray-600">
                            Accept financial support, create
                            economies, and play value-based games with your fans, from
                            anywhere across the planet.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-primary-hover flex-grow ">
                <div className="container mx-auto py-12">
                    <div className="flex flex-col justify-center max-w-2xl mx-auto">
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

                    </div>
                </div>
            </div>

            <FooterComponent />
        </div>
    );
}
