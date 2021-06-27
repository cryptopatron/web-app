import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

export default function LandingPage(){

    return (
        <div>
            This is the Kōen.
            <br/>
            <Link to={ROUTES.NOTFOUND}>
                <button> take me to not found</button>
            </Link>
        </div>
    )
    
}