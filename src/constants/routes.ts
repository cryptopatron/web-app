import PAGES from '../pages'
import * as PATHS from './paths'

export const LANDINGPAGE = {
    path: '/',
    component: PAGES.LandingPage,
    exact: true,
    protected: false
}

export const NOTFOUND = {
    path: PATHS.NOTFOUND,
    component: PAGES.NotFound,
    exact: false,
    protected: false
}

export const ONBOARD = {
    path: PATHS.ONBOARD,
    component: PAGES.SignUpPage,
    exact: false,
    protected: false
}

export const PROFILE = {
    path: PATHS.PROFILE,
    component: PAGES.ProfilePage,
    exact: true,
    protected: false
}

export const DASHBOARD = {
    path: '/',
    component: PAGES.LandingPage,
    exact: true,
    protected: true
}

export default [LANDINGPAGE, NOTFOUND, ONBOARD, PROFILE, DASHBOARD]