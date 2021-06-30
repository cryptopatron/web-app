import { useState, useEffect } from "react"

export default function CreatorPage(){
    
    const [userName, setUserName] = useState<string>()
    useEffect(() => {
        //Todo: fetch user information from backend via jwt
        
    }, []);
    
    
    return(
        <>
        <p>This is {userName}'s profile</p>
        </>
    )
}