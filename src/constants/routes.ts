import PAGES from '../pages'
import { NOTFOUND_PATH } from './paths'

export const LANDINGPAGE = {
    path: '/',
    component: PAGES.LandingPage,
    exact: true

}

export const NOTFOUND = {
    path: NOTFOUND_PATH,
    component: PAGES.NotFound,
    exact: false

}

export default [LANDINGPAGE, NOTFOUND]