import { useState, useEffect } from "react"
import CardComponent from "./card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoePrints, faMoneyBillWave, faHandsHelping, faAngleDown } from "@fortawesome/free-solid-svg-icons"
import TransactionsComponent from "./transactions"

const cards = [

    {
        id: 1,
        title: "Earnings",
        value: '$23,041',
        subtitle: <span> last 7 days <FontAwesomeIcon icon={faAngleDown} /></span>,
        icon: (<FontAwesomeIcon icon={faMoneyBillWave} />),
    },
    {
        id: 2,
        title: "Streams",
        value: '$55',
        subtitle: <span> per month</span>,
        icon: (<FontAwesomeIcon icon={faShoePrints} />),
    },
    {
        id: 3,
        title: "Supporters",
        value: '96',
        subtitle: "",
        icon: (<FontAwesomeIcon icon={faHandsHelping} />),
    }


]

export default function MainPanelComponent({ transaction, user }) {

    const [totalEarning, setTotalEarnings] = useState()

    useEffect(() => {
        const totalEarnings = () => {

            //add service here

        }
        totalEarnings()

    }, [])

    return (
        <div className="w-8/12 mt-10 mx-auto">
            <div className="flex flex-row justify-center mx-auto">
                {/* total earnings */}
                {cards.map((card, index) => (
                    <CardComponent key={card.id} cardTitle={card.title} cardValue={card.value} cardSubtitle={card.subtitle} cardIcon={card.icon} />
                ))}
            </div>
            <div className ="mt-10 mx-3 bg-white shadow-float-900 rounded-md p-4">
                <TransactionsComponent/>
            </div>
        </div>
    )
}
