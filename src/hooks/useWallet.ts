import { useState } from 'react';

export default function useWallet() {

    const getWallet = () => {
        const walletJson = JSON.parse(localStorage.getItem('wallet') || '{wallet:"", address:""}');
        return walletJson

    };

    const [wallet, setWallet] = useState(getWallet());

    const saveWallet = wallet => {
        localStorage.setItem('wallet', JSON.stringify(wallet));
        setWallet(wallet);
    };

    return {
        setWallet: saveWallet,
        wallet
    }
}