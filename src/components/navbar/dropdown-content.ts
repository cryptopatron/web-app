import * as PATHS from '../../constants/paths'


export const notLoggedinContent = [
    {
        id: 1,
        label: "Sign In",
        path: "/"
    },
    {
        id: 2,
        label: "About",
        path: "/"
    }
]
    
export const loggedinContent = [
    {
        id: 1,
        label: "Dashboard",
        path: PATHS.DASHBOARD
    },
    {
        id: 2,
        label: "Home",
        path: PATHS.PROFILE
    },

    {
        id: 4,
        label: "Sign Out",
        path: "/"
    },
]