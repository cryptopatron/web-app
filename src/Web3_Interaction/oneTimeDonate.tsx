import React from 'react';
import { Metamask_connect_and_execute } from "./walletConnect";
import { txn_link_msg } from "./Utils";
import contracts from './contracts.json';
import networks from './networks.json';

// executes one time donation through Metamask.
export async function Metamask_Mumbai_Donation(setMsg, setErr, params) {
    params["default_gas_amount"] = "1000000";
    params["default_gas_price"] = "20000000000";
    Metamask_connect_and_execute(setMsg, setErr, networks['mumbai'], donate, params);
}


// executes one time donation through Metamask.
export async function Metamask_Ropsten_Donation(setMsg, setErr, params) {
    params["default_gas_amount"] = "1000000";
    params["default_gas_price"] = "20000000000";
    Metamask_connect_and_execute(setMsg, setErr, networks['ropsten'], donate, params);
}


// params = {
//     "recipient_name": "name",
//     "recipient_address": "0x...",
//     "donation_amount": "4000",
//     "payment_token_address": "0x...",
//     "default_gas_amount": "1000",
//     "default_gas_price": "2000",
//     "network": "mumbai"
//     }
// One time donation to recipient_address
async function donate(setMsg, setErr, web3Provider, accounts, params) {
    web3Provider.eth.defaultAccount = accounts[0];

    let payment_token = new web3Provider.eth.Contract(
        contracts["erc20_contract_abi"],
        params["payment_token_address"]
    );

    web3Provider.eth.getGasPrice()
        .then(function (gp) {
            if (typeof (gp) === typeof (100)) {
                params["default_gas_price"] = String(gp);
            }

            let not_called = true;
            payment_token.methods.transfer(params["recipient_address"], params["donation_amount"])
                .send({
                    from: accounts[0],
                    gasPrice: params["default_gas_price"], gas: params["default_gas_amount"]
                })
                .on('error', function (error) {
                    setErr("Failed to get permission to send donation");
                })
                .on('transactionHash', function (txn_hash) {
                    // TODO: properly show transaction hash
                    setMsg(txn_link_msg(txn_hash, params["network"], "Sending Donation..."));
                })
                .on('confirmation', function (confirmationNumber, receipt) {
                    if (confirmationNumber === 2 && (not_called)) {
                        not_called = false;
                        let msg = params["recipient_name"] + " has received your Donation!"
                        setMsg(<h6>{msg}</h6>)
                    }
                })
        }).catch((error) => {
            setErr("Failed to Connect to Metamask");
        });
}