import NavbarComponent from './components/navbar'
import { useEffect } from 'react';

import ImageStartJourney from './../../assets/images/start_journey.svg';
import ImageLadyBird from './../../assets/images/ladybird.png'
import ImageLookForCreators from './../../assets/images/look_for_creators.svg'
export default function LandingPage() {

    useEffect(() => {
        document.title = 'Kōen';
    }, []);

    return (
        <div>
            <NavbarComponent />
            {/* Navbar goes here */}

            <div className="container mx-auto">

                <form className="flex flex-col md:flex-row  justify-center items-center mt-7">

                    <input className="input-primary w-3/5 text-center" type="text" aria-label="Enter your pagename" placeholder="pagename" />

                    <button className="btn-primary w-3/5" type="submit">Create</button>

                </form>

                <div className="flex flex-col md:flex-row justify-center items-center">

                    <div className=" ">
                        <img src={ImageStartJourney} alt="start journey" />
                    </div>

                    <div className="">
                        <h2> Stir up support on a truly global platform. </h2>
                        <p className="">Koen empowers creators to accept support,
                            memberships, and build a direct relationship with their fans, from anywhere across the planet.</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center">
                    <div className="">
                        <div className="ladybird mx-auto">
                            <img src={ImageLadyBird} className="img-responsive" />
                            <div className="">

                                <h3> Create your page in a jiffy. </h3>
                                <p> Its absolutely free. No gas fees, No extra charges </p>
                            </div>
                        </div>
                    </div>

                    <div className="col look-for-creator">
                        <img src={ImageLookForCreators} />
                    </div>

                </div>

                <div className="footer">
                </div>
            </div>
        </div>
    )

}