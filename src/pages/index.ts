import { lazy } from 'react'

const LandingPage = lazy( () => import('./landing-page'))
const NotFound = lazy( () => import('./not-found'))
const ProfilePage = lazy( () => import('./creator-page'))
const SignUpPage = lazy( () => import('./sign-up-page'))
const DashboardPage = lazy( () => import('./dashboard-page'))

export default { LandingPage, NotFound, ProfilePage, SignUpPage, DashboardPage }