import React from 'react'
import ImageDefaultProfile1 from './../../../../assets/images/default_profile_1.svg'
import {Link} from 'react-router-dom'
export default function SidePanelComponent({ creator }) {
    return (
        <div>
            
            {/* pictture and edit button */}
            <div>
                <div className=" flex mx-auto mt-8 justify-center w-32 h-32 rounded-full bg-primary-hover">
                    <img className="w-2/5 transform translate-y-3" src={ImageDefaultProfile1} alt="place_holder_image" />
                </div>
                <div className="text-center">
                <Link to={`/${creator.pageName}`}> <p className="text-sm my-4 font-light">View Profile</p> </Link> 
                </div>

            </div>

            {/* welcom name */}
            <div className="text-center my-1">
                <h3>Welcome, {creator.name}</h3>
            </div>

            {/* supporters count */}
            <div className="text-center my-4">
                <p>0</p>
                <p className="">Supporters</p>
            </div>

        </div>
    )
}
