
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

export const updateUserProfile = async (name, bio, token) => {

    const data = {
        name: name,
        bio: bio,
        idToken: token
    }
    const endpoint = window.origin + `/api/v1/users/update/profile` //window.origin
    const res  = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const status = await res.status

    if(status == 200){
        return true
    }
    else{
        return false
    }
}