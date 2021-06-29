import {lazy } from 'react'

const LandingPage = lazy( () => import('./landing-page'))
const NotFound = lazy( () => import('./not-found'))
const ProfilePage = lazy( () => import('./creator-page'))

export default { LandingPage, NotFound, ProfilePage }