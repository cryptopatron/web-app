import React from 'react'
import { Route, Switch, NavLink, Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import LoggedInUserContext from '../../contexts/logged-in-user'

export default function DashboardPage() {

    const {user, setUser} = useContext(LoggedInUserContext)

    return (
        <div>
            This is {user.pageName}'s Dashboard.
        </div>
    )
}
