import Web3 from "web3";
import React from "react";

// this function connects to the user's Metamask wallet
// then executes to_execute while passing in _this, web3Provider, account, and params
export async function Metamask_connect_and_execute(setMsg, setError, network, to_execute, params) {
    setMsg('');
    setError('');

    const expected_network_type = network["expected_network_type"];
    const wrong_network_error = network["wrong_network_error"];

    if ((window as any).ethereum) {
        const ethereum = (window as any).ethereum;
        const web3Provider = new Web3(ethereum);
        web3Provider.eth.net.getNetworkType()
            .then(function (Metamask_network) {
                console.log("Metamask_network", Metamask_network);
                if (Metamask_network !== expected_network_type) {
                    setError(wrong_network_error);
                } else {
                    // TODO: actually execute to_execute
                    ethereum.enable().then((accounts) => {
                        to_execute(setMsg, setError, web3Provider, accounts, params);
                    }).catch((err) => {
                        setError('Failed to Connect to Metamask')
                    })
                }
            }).catch((error => {
                setError('Failed to Connect to Metamask');
        }))
    } else {
        setError('Metamask Not Detected');
    }
}