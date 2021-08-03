import PAGES from '../pages'
import * as PATHS from './paths'

export const LANDINGPAGE = {
    path: '/',
    component: PAGES.LandingPage,
    exact: true,
    meta: {
        protected: false,
        restricted: false
    }
    
}

export const DASHBOARD = {
    path: PATHS.DASHBOARD,
    component: PAGES.DashboardPage,
    exact: false,
    meta: {
        protected: true,
        restricted: false
    }
}

export const NOTFOUND = {
    path: PATHS.NOTFOUND,
    component: PAGES.NotFound,
    exact: false,
    meta: {
        protected: false,
        restricted: false
    }
}

export const ONBOARD = {
    path: PATHS.ONBOARD,
    component: PAGES.SignUpPage,
    exact: false,
    meta: {
        protected: false,
        restricted: true
    }
}

export const PROFILE = {
    path: PATHS.PROFILE,
    component: PAGES.ProfilePage,
    exact: false,
    meta: {
        protected: false,
        restricted: false
    }
}

const ROUTES = [LANDINGPAGE, DASHBOARD,  NOTFOUND, ONBOARD, PROFILE]
export default ROUTES