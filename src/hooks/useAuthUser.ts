import { useContext } from "react";
import UserContext from "../contexts/user";
import LoggedInUserContext from '../contexts/logged-in-user';
import { useHistory } from 'react-router';
import * as PATHS from '../constants/paths'

export default function useAuthUser() {
    const { setIsLoggedIn } = useContext(UserContext)
    const { setUser } = useContext(LoggedInUserContext)
    const history = useHistory();

    const setResponse = async (endpoint: string, jwt: string) => {
        if (jwt) {
            const res = await fetch(window.origin + endpoint, {
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
            if (status !== 200) {
                setIsLoggedIn(false)
                localStorage.removeItem('token')
                console.log("Login failed")
                history.push('/')
            }
            else {
                
                const data = await res.json()
                if (data) {
                    setIsLoggedIn(true)
                    // save auth user info
                    setUser(data)
                    console.log('go to user dashboard')
                    history.push(PATHS.DASHBOARD)
                }
                else {
                    console.log("go to onboard")
                    // save auth user info
                    history.push(PATHS.ONBOARD)
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
