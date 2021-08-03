
export const registerPage = async (pageName, publicKey, token) => {

    const register = {
        pageName: pageName,
        metaMaskWalletPublicKey: "",
        generatedMaticWalletPublicKey: publicKey,
        idToken: token,
        ref: "" // TODO Need 5 fields for backend decoding --- fix soon 
    };

    const endpoint = window.origin + `/api/v1/users/create`;
    const res  = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(register)
    });

    const status = await res.status
    
    if(status !== 200){
        return false
    }
    return true
    
}
