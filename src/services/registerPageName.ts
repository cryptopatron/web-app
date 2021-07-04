
export const registerPage = async (pageName, publicKey, token) => {

    const data = {
        pageName: pageName,
        metaMaskWalletPublicKey: "",
        generatedMaticWalletPublicKey: publicKey,
        idToken: token 
    };

    const endpoint = window.origin + `/api/v1/users/create`;
    const res  = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const status = await res.status
    const da = await res.json()
    console.log(da)
    if(status !== 200){
        return null
    }

    const response = await res.json()
    return response
}
