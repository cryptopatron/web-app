import { useContext } from "react";
import UserContext from "../contexts/user";
import LoggedInUserContext from '../contexts/logged-in-user';
import { useHistory } from 'react-router';
import * as PATHS from '../constants/paths'
import { isConstructorDeclaration } from "typescript";


export default function useAuthUser() {
    const { setIsLoggedIn } = useContext(UserContext)
    const { setUser } = useContext(LoggedInUserContext)
    const history = useHistory();

    const setResponse = async (endpoint: string, jwt: string) => {
        console.log("sending authing request")
        if (jwt) {  //
            console.log("endpoint: "+ window.origin + endpoint)
            const res = await fetch( window.origin + endpoint, {
                method: "POST",
                body: JSON.stringify({
                    idToken: jwt,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const status = await res.status
            // save auth user info
            console.log("for use Auth: " +status)
            if (status !== 200) {
                setIsLoggedIn(false)
                localStorage.removeItem('token')
                console.log("Login failed - deleted token")
                history.push("/")
            }
            else {
                
                const data = await res.json()
                
                if (Object.keys(data).length !== 0) {
                    console.log("for use Auth data: ")
                    console.log(data)
                    setIsLoggedIn(true)
                    // save auth user info
                    setUser(data)
                    console.log('go to user dashboard')
                    history.push(PATHS.DASHBOARD)
                }
                else {
                    console.log("go to onboard")
                    // save auth user info
                    history.replace(PATHS.ONBOARD)
                }

            }
        }
        else {
            // do nothing
            history.push('/')
            console.log("token is null")
        }

    }

    

    return { setResponse }
}
