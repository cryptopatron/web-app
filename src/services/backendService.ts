
export const getUserByPageName = async (pageName) => {

    const endpoint = window.origin + `/api/v1/users/pageName/${pageName}` //window.origin
    const res  = await fetch(endpoint, {
        method: "GET",
    });

    const status = await res.status

    if(status !== 200){
        return null
    }

    const response = await res.json()
    return response
}

export const checkIfUserExists = async (pageName) => {
    const endpoint = window.origin + `/api/v1/users/pageName/${pageName}`
    const res = await fetch(endpoint, {
        method: "GET",
    });
    const status = await res.status
    const response = await res.json();
    console.log(status);
    if(status === 200) {
        return false;
    }
    else if(status !== 200 && response != null) {
        if(response.body.includes('user does not exist')) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        
    }
}

