import { lazy } from 'react'

const LandingPage = lazy( () => import('./landing-page'))
const NotFound = lazy( () => import('./not-found'))
const ProfilePage = lazy( () => import('./creator-page'))
const SignUpPage = lazy( () => import('./sign-up-page'))

export default { LandingPage, NotFound, ProfilePage, SignUpPage }