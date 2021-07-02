import { useState } from 'react';
import { useContext } from "react";
import UserContext from "../contexts/user";

import useToken from './useToken';

export default function useAuthUser() {
    const { user, setUser, isLoggedIn } = useContext(UserContext)
    const { token, setToken } = useToken({isLoggedIn});
    const [response, saveResponse] = useState<any>();


    const setResponse = async (endpoint: string) => {
        const res = await fetch(window.origin + endpoint, {
            method: "POST",
            body: JSON.stringify({
                idToken: token,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(token)
        const status = await res.status
        const data = res.json()
        console.log(data)
        if (status === 200){
            console.log('go to user dashboard')
        }else if (status === 404){
            console.log("go to onboard")
        }
        else{
            // do nothing
            console.log("some other error")
        }
        
        
    }

    
    return {setResponse}
}
