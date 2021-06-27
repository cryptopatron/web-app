import { Link } from 'react-router-dom'
import NavbarComponent from './components/navbar'
import { NOTFOUND_PATH } from '../../constants/paths'

export default function LandingPage(){

    return (
        <div>
            <NavbarComponent />
            This is the Kōen.
            <br/>
            <Link to={NOTFOUND_PATH}>
                <button type="button" className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"> take me to not found</button>
            </Link>
        </div>
    )
    
}