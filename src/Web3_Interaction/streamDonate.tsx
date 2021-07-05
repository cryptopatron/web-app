import React from 'react';
import { Metamask_connect_and_execute } from "./walletConnect";
import { txn_link_msg } from "./Utils";
import contracts from './contracts.json';
import networks from './networks.json';
import { Metamask_Mumbai_stream_fDAIx } from "./superfluid_streaming";

// mints fDAI to user's wallet with Metamask
export async function Metamask_Mumbai_mint_fDAI(setMsg, setErr, setStatus) {
    const params = {
        "default_gas_amount": "1000000",
        "default_gas_price": "20000000000",
        "network": "mumbai",
        "amount": "1000000000000000000000"
    };
    Metamask_connect_and_execute(setMsg, setErr, setStatus, networks['mumbai'], mint_fDAI, params);
}


export async function Metamask_Mumbai_approve_fDAI(setMsg, setErr, setStatus) {
    const params = {
        "default_gas_amount": "1000000",
        "default_gas_price": "20000000000",
        "network": "mumbai",
        "amount": "1000000000000000000000"
    };
    Metamask_connect_and_execute(setMsg, setErr, setStatus, networks['mumbai'], approve_fDAI, params);
}

export async function Metamask_Mumbai_upgrade_fdai(setMsg, setErr, setStatus) {
    const params = {
        "default_gas_amount": "1000000",
        "default_gas_price": "20000000000",
        "network": "mumbai",
        "super_token_address": contracts["fdaix_mumbai_address"],
        "amount": "10000000000"
    };
    Metamask_connect_and_execute(setMsg, setErr, setStatus, networks['mumbai'], upgrade_base_tokens, params);
}

export async function Metamask_Mumbai_full_stream(setMsg, setErr, setStatus) {
    const params = {
        "default_gas_amount": "1000000",
        "default_gas_price": "20000000000",
        "network": "mumbai",
        "amount": "1000000000000000000000"
    };
    Metamask_connect_and_execute(setMsg, setErr, setStatus, networks['mumbai'], full_stream, params);
}

// mint fDAI to accounts[0].
// params = {
//     "default_gas_price": "10000",
//     "default_gas_amount": "200000",
//     "amount": "100000000000000000000000" // amount of fDAI to mint
// }
async function mint_fDAI(setMsg, setErr, setStatus, web3Provider, accounts, params) {
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
            if (confirmationNumber === 2 && (not_called)) {
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
async function approve_fDAI(setMsg, setErr, setStatus, web3Provider, accounts, params) {
    web3Provider.eth.defaultAccount = accounts[0];

    const fDAI = new web3Provider.eth.Contract(
        contracts["superfluid_fERC20_contract_abi"],
        contracts["fdai_mumbai_address"] // fDAI on Mumbai
    );
    setStatus({percent: 10, step: 0});

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
            setStatus({percent: 20, step: 0});
        })
        .on('confirmation', function (confirmationNumber, receipt) {
            if (confirmationNumber === 2 && (not_called)) {
                not_called = false;
                let msg = "fDAI has been approved to be spent by fDAIx!"
                setMsg(<h6>{msg}</h6>);
                setStatus({percent: 33, step: 1}); // now shows the button to upgrade fDAI
            }
        })
}

// upgrades base_token into super_token
async function upgrade_base_tokens(setMsg, setErr, setStatus, web3Provider, accounts, params) {
    web3Provider.eth.defaultAccount = accounts[0];
    const host = new web3Provider.eth.Contract(
        contracts["superfluid_contract_abi"],
        contracts["superfluid_mumbai_host_address"]
    );
    setStatus({percent: 45, step: 1});

    let not_called = true;

    const upgrade_operation_data = web3Provider.eth.abi.encodeParameters(['uint256'], [params.amount])
    const upgrade_operation = {
        "operationType": 101,
        "target": params.super_token_address,
        "data": upgrade_operation_data
    };

    const operations = [upgrade_operation];

    const operation_tuples = operations.map(
        (operation) => ([operation.operationType, operation.target, operation.data])
    );

    host.methods.batchCall(operation_tuples)
        .send({
            from: accounts[0],
            gasPrice: params["default_gas_price"], gas: params["default_gas_amount"]
        })
        .on('error', function (error) {
            setErr("Failed to get permission to send donation");
        })
        .on('transactionHash', function (txn_hash) {
            // TODO: properly show transaction hash
            setStatus({percent: 50, step: 1});
            setMsg(txn_link_msg(txn_hash, params["network"], "Upgrading Tokens..."));
        })
        .on('confirmation', function (confirmationNumber, receipt) {
            if (confirmationNumber === 2 && (not_called)) {
                not_called = false;
                let msg = "Tokens have been upgraded!";
                setMsg(<h6>{msg}</h6>);
                setStatus({percent: 66, step: 2});
            }
        })
}



async function full_stream(setMsg, setErr, setStatus, web3Provider, accounts, params) {
    web3Provider.eth.defaultAccount = accounts[0];

    const fDAI = new web3Provider.eth.Contract(
        contracts["superfluid_fERC20_contract_abi"],
        contracts["fdai_mumbai_address"] // fDAI on Mumbai
    );
    setStatus({percent: 10, step: 0});

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
            setStatus({percent: 20, step: 0});
        })
        .on('confirmation', function (confirmationNumber, receipt) {
            if (confirmationNumber === 2 && (not_called)) {
                not_called = false;
                let msg = "fDAI has been approved to be spent by fDAIx!"
                setMsg(<h6>{msg}</h6>);
                setStatus({percent: 33, step: 1}); // now shows the button to upgrade fDAI
                Metamask_Mumbai_upgrade_fdai(setMsg, setErr, setStatus);
            }
        })
}