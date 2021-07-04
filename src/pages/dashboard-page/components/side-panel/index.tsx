import React from 'react'
import ImageDefaultProfile1 from './../../../../assets/images/default_profile_1.svg'

export default function SidePanelComponent({ creator }) {
    return (
        <div>
            
            {/* pictture and edit button */}
            <div>
                <div className=" flex mx-auto justify-center w-32 h-32 rounded-full bg-primary-hover">
                    <img className="w-2/5 transform translate-y-3" src={ImageDefaultProfile1} alt="place_holder_image" />
                </div>
                <div className="text-center">
                    <p>Edit Profile</p>
                </div>

            </div>

            {/* welcom name */}
            <div className="text-center">
                <h3>Welcome, Shaw Man{creator.name}</h3>
            </div>

            {/* supporters count */}
            <div className="text-center">
                <p>0</p>
                <p className="">Supporters</p>
            </div>

        </div>
    )
}
