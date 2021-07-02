
import * as PATHS from '../constants/paths'


export const getUserByPageName = async (pageName) => {

    const endpoint = window.origin + `/api/v1/users?pageName=${pageName}`
    const origin = 'localhost:8000' //window.origin
    const res  = await fetch(endpoint, {
        method: "GET",
    });

    const status = await res.status

    if(status != 200){
        return null
    }

    const response = await res.json()
    return response
}

