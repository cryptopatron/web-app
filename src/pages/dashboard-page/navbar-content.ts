import * as PATHS from '../../constants/paths'

export const loggedInContent = (pageName) => {

    return ([
        {
            id: 2,
            label: "Home",
            path: `/${pageName}`,
            callback: () => {}
            
        },

        {
            id: 4,
            label: "Sign Out",
            path: "/",
            callback: () => {
                console.log("removing token")
                localStorage.removeItem('token')}
        },
    ])
}