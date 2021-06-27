import { Link } from 'react-router-dom'
import { NOTFOUND_PATH } from '../../constants/paths'

export default function LandingPage(){

    return (
        <div>
            This is the Kōen.
            <br/>
            <Link to={NOTFOUND_PATH}>
                <button> take me to not found</button>
            </Link>
        </div>
    )
    
}