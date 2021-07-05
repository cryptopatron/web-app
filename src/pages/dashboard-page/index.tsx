import React from 'react'
import { Route, Switch, NavLink, Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import LoggedInUserContext from '../../contexts/logged-in-user'
import NavbarComponent from '../../components/navbar'
import SidePanelComponent from './components/side-panel'
import MainPanelComponent from './components/main-panel'

export default function DashboardPage() {

    const {user, setUser} = useContext(LoggedInUserContext)

    return (
        <div>
            <NavbarComponent/>
            <div className="flex flex-col sm:flex-row">
            <SidePanelComponent creator={user}/>
            <MainPanelComponent/>
            </div>
        </div>
    )
}
