import {lazy } from 'react'

const LandingPage = lazy( () => import('./landing-page'))
const NotFound = lazy( () => import('./not-found'))

export default { LandingPage, NotFound }