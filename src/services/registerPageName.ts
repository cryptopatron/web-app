
export const registerPage = async (pageName, publicAddress, token) => {

    const registerPayload = {
        ...publicAddress,
        pageName: pageName,
        idToken: token,
        ref: ""
    };

    console.log(registerPayload)
    const endpoint = window.origin + `/api/v1/users/create`;
    const res  = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerPayload)
    });

    const status = await res.status
    console.log(status)

    if(status === 200){
        return true
    }

    return false

}
