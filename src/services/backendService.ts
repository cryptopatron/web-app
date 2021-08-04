export const getAuthUser = async (jwt) => {
    const endpoint = window.origin + '/api/v1/users/get'
    const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
            idToken: jwt,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const status = await res.status

    if (status !== 200) {
        localStorage.removeItem('token')
        localStorage.removeItem('wallet')
        console.log("Login failed - deleted token")
        return { status: 401, data: {} }
    }
    else {
        const data = await res.json()
        if (Object.keys(data).length !== 0) {
            console.log("status 200 ")
            console.log("for use Auth data: ")
            console.log(data)
            return { status: 200, data: data }
        }
        else {
            console.log("status 404 ")
            return { status: 404, data: data }
        }
        // save auth user info
    }

}

export const getUserByPageName = async (pageName) => {

    const endpoint = window.origin + `/api/v1/users/pageName/${pageName}` //window.origin
    const res = await fetch(endpoint, {
        method: "GET",
    });

    const status = await res.status

    if (status !== 200) {
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
    const response = await JSON.stringify(res.json());
    console.log(status);
    console.log(response)
    if (status === 200 && response === '{}') {
        return true
    }
    else {
        return false
    }
}

export const updateUserProfile = async (name, bio, token) => {

    const data = {
        name: name,
        bio: bio,
        idToken: token
    }
    const endpoint = window.origin + `/api/v1/users/update/profile` //window.origin
    const res = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const status = await res.status

    if (status == 200) {
        return true
    }
    else {
        return false
    }
}


export const getTransactionByPageName = async (pageName) => {

    const endpoint = window.origin + `/api/v1/users/transaction/${pageName}` //window.origin
    const res = await fetch(endpoint, {
        method: "GET",
    });

    const status = await res.status

    if (status !== 200) {
        return null
    }

    const response = await res.json()
    return response
}

export const walletLogin = async (loginParams) => {

    const endpoint = window.origin + `/api/v1/auth/wallet` //window.origin
    const res = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginParams)
    });

    const status = await res.status

    if (status !== 200) {
        localStorage.removeItem('token')
        console.log("Login failed - deleted token")
        return { status: 401, data: {} }
    }
    else {
        const data = await res.json()
        return { status: 200, data: data }
        // save auth user info
    }

}