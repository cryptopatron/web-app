import { useState, useEffect } from 'react';
import { useContext } from "react";
import UserContext from "../contexts/user";
import { useHistory } from 'react-router';
import * as PATHS from '../constants/paths'

export default function useAuthUser() {
    const { token } = useContext(UserContext)
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
            const data = res.json()
            console.log(data)
            if (status === 200) {
                history.push(PATHS.PROFILE)
                console.log('go to user dashboard')
            } else if (status === 404) {
                history.push(PATHS.ONBOARD)
                console.log("go to onboard")
            }
            else {
                // do nothing
                history.push('/')
                console.log("some other error")
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
