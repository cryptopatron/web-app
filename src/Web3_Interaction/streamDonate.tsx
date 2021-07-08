import React from 'react';
import { Metamask_connect_and_execute } from "./walletConnect";
import { txn_link_msg } from "./Utils";
import contracts from './contracts.json';
import networks from './networks.json';


export async function Metamask_Mumbai_approve_fDAI(setMsg, setErr) {
    const params = {
        "default_gas_amount": "1000000",
        "default_gas_price": "20000000000",
        "network": "mumbai",
        "amount": "1000000000000000000000"
    };
    Metamask_connect_and_execute(setMsg, setErr, networks['mumbai'], approve_fDAI, params);
}

// mint fDAI to accounts[0].
// params = {
//     "default_gas_price": "10000",
//     "default_gas_amount": "200000",
//     "amount": "100000000000000000000000" // amount of fDAI to mint
// }
async function mint_fDAI(setMsg, setErr, web3Provider, accounts, params) {
    web3Provider.eth.defaultAccount = accounts[0];

    const fDAI = new web3Provider.eth.Contract(
        contracts["superfluid_fERC20_contract_abi"],
        contracts["fdai_mumbai_address"]
    );

    let not_called = true;
    fDAI.methods.mint(accounts[0], params["amount"])
        .send({
            from: accounts[0],
            gasPrice: params["default_gas_price"], gas: params["default_gas_amount"]
        })
        .on('error', function (error) {
            setErr("Failed to get permission to mint fDAI");
        })
        .on('transactionHash', function (txn_hash) {
            // TODO: properly show transaction hash
            setMsg(txn_link_msg(txn_hash, params["network"], "Minting fDAI..."));
        })
        .on('confirmation', function (confirmationNumber, receipt) {
            if (confirmationNumber === 0 && (not_called)) {
                not_called = false;
                let msg = "fDAI has been minted to your wallet!"
                setMsg(<h6>{msg}</h6>);
            }
        })
}


// approve fDAI to be controlled by fDaix.
// params = {
//     "default_gas_price": "10000",
//     "default_gas_amount": "200000",
//     "amount": "100000000000000000000000" // amount of fDAI to mint
// }
async function approve_fDAI(setMsg, setErr, web3Provider, accounts, params) {
    web3Provider.eth.defaultAccount = accounts[0];

    const fDAI = new web3Provider.eth.Contract(
        contracts["superfluid_fERC20_contract_abi"],
        contracts["fdai_mumbai_address"] // fDAI on Mumbai
    );

    let not_called = true;
    fDAI.methods.approve(contracts["fdaix_mumbai_address"], params["amount"])
        .send({
            from: accounts[0],
            gasPrice: params["default_gas_price"], gas: params["default_gas_amount"]
        })
        .on('error', function (error) {
            setErr("Failed to get permission to approve fDAI");
        })
        .on('transactionHash', function (txn_hash) {
            // TODO: properly show transaction hash
            setMsg(txn_link_msg(txn_hash, params["network"], "Approving fDAI..."));
        })
        .on('confirmation', function (confirmationNumber, receipt) {
            if (confirmationNumber === 0 && (not_called)) {
                not_called = false;
                let msg = "fDAI has been approved to be spent by fDAIx!"
                setMsg(<h6>{msg}</h6>);
            }
        })
}
