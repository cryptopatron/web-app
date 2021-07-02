import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import ImageDefaultProfile1 from './../../../../assets/images/default_profile_1.svg';
import { randomPastelColourService } from '../../../../services/randomPastelColourService';

export default function CreatorComponent({ creator }) {

    const profileBg: string = randomPastelColourService()
    // Todo
    // Todo -----> removed forced flasae
    return ((false && !creator.pageName) ? (<Skeleton count={1} height={200} />) : (
        <Link to={`/${creator.pageName}`} className="" >
            {/* if profile pic is not present */}
            <div className="flex flex-col justify-center">
                <div className=" flex justify-center items-center w-full bg-red-300 h-36 relative">
                    <div className=" flex mx-auto justify-center absolute top-16 w-32 h-32 rounded-full" style={{ background: `${profileBg}` }}>
                        <img className="w-2/5 transform translate-y-3" src={ImageDefaultProfile1} alt="place_holder_image" />
                    </div>
                </div>


                <div className="text-center mt-16 mb-4 font-medium">{(creator.name) ? creator.name : creator.pageName}</div>
                <div className="text-center mx-auto mt-18 font-light w-10/12">{creator.bio}</div>

            </div>
        </Link>
    ))


}
