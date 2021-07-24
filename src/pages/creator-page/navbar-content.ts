import * as PATHS from '../../constants/paths'

export const loggedInContent = (pageName) => {

    return ([
        {
            id: 1,
            label: "Dashboard",
            path: PATHS.DASHBOARD,
            callback: () => { }
        },

        {
            id: 4,
            label: "Sign Out",
            path: "/",
            callback: () => {
                console.log("removing token")
                localStorage.removeItem('token')
            }
        },
    ])
}