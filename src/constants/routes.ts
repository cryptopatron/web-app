import PAGES from '../pages'
import * as PATHS from './paths'

export const LANDINGPAGE = {
    path: '/',
    component: PAGES.LandingPage,
    exact: true
}

export const NOTFOUND = {
    path: PATHS.NOTFOUND,
    component: PAGES.NotFound,
    exact: false
}

export const ONBOARD = {
    path: PATHS.ONBOARD,
    component: PAGES.SignUpPage,
    exact: true
}

export const PROFILE = {
    path: PATHS.PROFILE,
    component: PAGES.ProfilePage,
    exact: false
}

export default [LANDINGPAGE, NOTFOUND, ONBOARD, PROFILE]