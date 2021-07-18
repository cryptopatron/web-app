import React from 'react'
import { Route, Switch, NavLink, Link } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import LoggedInUserContext from '../../contexts/logged-in-user'
import NavbarComponent from '../../components/navbar'
import SidePanelComponent from './components/side-panel'
import MainPanelComponent from './components/main-panel'
import { getTransactionByPageName } from '../../services/backendService'

export default function DashboardPage() {
    const [transaction, setTransactions] = useState()
    const { user, setUser } = useContext(LoggedInUserContext)
    //
    useEffect(() => {

        const getTransaction = async () => {

            const res = await getTransactionByPageName(user.pageName)
            if(res){
                setTransactions(res)
            }

        }

    }, [])


    return (
        <div>
            <NavbarComponent />
            <div className=" containter mx-auto max-w-screen-lg">
                <div className="flex flex-col sm:flex-row">
                <SidePanelComponent creator={user} />
                <MainPanelComponent transaction={transaction} user={user}/>
                </div>
            </div>
        </div>
    )
}
