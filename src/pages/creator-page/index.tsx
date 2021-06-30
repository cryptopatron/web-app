import { useState, useEffect } from "react"
import NavbarComponent from "../../components/navbar";

export default function CreatorPage() {

    const [userName, setUserName] = useState<string>()
    useEffect(() => {
        //Todo: fetch user information from backend via jwt

    }, []);


    return (
        <>
            <NavbarComponent/>
            <p>This is {userName}'s profile</p>
        </>
    )
}