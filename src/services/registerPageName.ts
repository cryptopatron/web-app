
export const registerPage = async (pageName, publicKey) => {

    const data = {
        "pageName": pageName,
        "metaMaskWalletPublicKey": "",
        "generatedMaticWalletPublicKey": publicKey 
    };

    const endpoint = window.origin + `/api/v1/users/create`;
    const res  = await fetch(endpoint, {
        method: "POST",
        headers: {
            'text-type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const status = await res.status

    if(status !== 200){
        return null
    }

    const response = await res.json()
    return response
}
