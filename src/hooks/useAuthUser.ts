import { useState } from 'react';
import { useContext } from "react";
import UserContext from "../contexts/user";
import LoggedInUserContext from '../contexts/logged-in-user';
import { useHistory } from 'react-router';
import * as PATHS from '../constants/paths'

export default function useAuthUser() {
    const { token, setIsLoggedIn } = useContext(UserContext)
    const {user, setUser} = useContext(LoggedInUserContext)
    const [response, saveResponse] = useState<any>();
    const history = useHistory();

    const setResponse = async (endpoint: string) => {
        if (token) {
            const res = await fetch(window.origin + endpoint, {
                method: "POST",
                body: JSON.stringify({
                    idToken: token,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const status = await res.status
            const data = await res.json()
            // save auth user info
            setUser(data)
            if (status === 200) {
                setIsLoggedIn(true)
                console.log('go to user dashboard')
                history.push(PATHS.DASHBOARD)
            } else if (status === 404) {

                console.log("go to onboard")
                history.push(PATHS.ONBOARD)
            }
            else {
                // do nothing
                console.log("some other error")
                history.push('/')
                
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
