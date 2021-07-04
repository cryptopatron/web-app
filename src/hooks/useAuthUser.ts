import { useState, useEffect} from 'react';
import { useContext } from "react";
import UserContext from "../contexts/user";
import LoggedInUserContext from '../contexts/logged-in-user';
import { useHistory } from 'react-router';
import * as PATHS from '../constants/paths'

export default function useAuthUser() {
    const { token, setIsLoggedIn, isLoggedIn } = useContext(UserContext)
    const {setUser} = useContext(LoggedInUserContext)
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
            if (status === 200) {
                setIsLoggedIn(true)
                const data = await res.json()
                // save auth user info
                setUser(data)
                console.log('go to user dashboard')
                history.push(PATHS.DASHBOARD)
            } else if (status === 404) {
                console.log("go to onboard")
                // save auth user info
                history.push(PATHS.ONBOARD)
            }
            else {
                //
                setIsLoggedIn(false)
                console.log("Login failed")
                history.push('/')
                
            }
        }
        else {
            // do nothing
            history.push('/')
            console.log("token is null")
        } 

    }

    useEffect(() => {
        const listener = () => {
            // on logout remove token
            console.log(isLoggedIn)
            if (!isLoggedIn) {
                console.log("removing user Token")
                localStorage.removeItem('token')
            }

        }

        return () => {
            listener()
        }
    }, [isLoggedIn])

    return { setResponse }
}
