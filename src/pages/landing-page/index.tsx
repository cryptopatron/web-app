import { Link } from 'react-router-dom'
import { NOTFOUND_PATH } from '../../constants/paths'
import { useState, useContext, useEffect } from 'react';

import ImageStartJourney from './../../assets/images/start_journey.svg';
import ImageLadyBird from './../../assets/images/ladybird.png'
import ImageLookForCreators from './../../assets/images/look_for_creators.svg'
export default function LandingPage() {

    useEffect(() => {
        document.title = 'Kōen';
    }, []);

    return (
        <div>
            {/* Navbar goes here */}

            <div className="container mx-auto">

                <form className="flex flex-col md:flex-row  justify-center items-center">
                    <div className="border w-3/5">
                        <input className="py-3 px-5" type="text" aria-label="Enter your pagename" placeholder="pagename" />
                    </div>

                    <button className="btn-primary w-3/5" type="submit">Create</button>

                </form>

                <div className="row row-cols-1">

                    <div className="col">
                        <img src={ImageStartJourney} alt="start journey" />
                    </div>

                    <div className="col">
                        <h2> Stir up support on a truly global platform. </h2>
                        <p className="">Koen empowers creators to accept support,
                            memberships, and build a direct relationship with their fans, from anywhere across the planet.</p>
                    </div>

                    <div className="col mx-auto">
                        <div className="ladybird mx-auto">
                            <img src={ImageLadyBird} className="img-responsive" />
                            <div className="overlay-text">

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