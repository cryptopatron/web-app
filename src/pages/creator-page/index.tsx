import { useState, useEffect } from "react"
import NavbarComponent from "../../components/navbar";
import moduleName from 'react-loading-skeleton'
import CreatorComponent from "./components/creator";

import SupportPanelComponent from "./components/support-panel";

// Interfacce 
import { Payment } from "./payment";

//test object ---> update the wallet address here
import { Creator } from './creator-test'


export default function CreatorPage() {

    const [creator, setCreator] = useState(Creator)

    return (
        <> 
            <NavbarComponent/>
            <CreatorComponent creator={creator}/>
            <div className="flex justify-center">
                <SupportPanelComponent creatorDetails={creator}/>
            </div>
        </>
    )
}