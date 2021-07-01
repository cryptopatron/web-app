import { useState, useEffect } from "react"
import NavbarComponent from "../../components/navbar";
import moduleName from 'react-loading-skeleton'
import CreatorComponent from "./components/creator";

import SupportPanelComponent from "./components/support-panel";

// Interfacce 
import { Payment } from "./payment";

//test object
import { Creator } from './creator-test'

export default function CreatorPage() {

    const [creator, setCreator] = useState(Creator)
    let [paymentDetails, setPaymentDetails] = useState<Payment>()

    const addPayment = (value) => {
        console.log(value)
    }


    return (
        <> 
            <NavbarComponent/>
            <CreatorComponent creator={creator}/>
            <div className="flex justify-center">
                <SupportPanelComponent addPayment={addPayment}/>
            </div>
        </>
    )
}