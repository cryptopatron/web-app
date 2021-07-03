import React from 'react';
import { Metamask_connect_and_execute } from "./walletConnect";
import { txn_link_msg } from "./Utils";
import contracts from './contracts.json';
import networks from './networks.json';

// mints fDAI to user's wallet with Metamask
export async function Metamask_Mumbai_mint_fDAI(setMsg, setErr) {
    const params = {
        "default_gas_amount": "1000000",
        "default_gas_price": "20000000000",
        "network": "mumbai",
        "amount": "1000000000000000000000"
    };
    Metamask_connect_and_execute(setMsg, setErr, networks['mumbai'], mint_fDAI, params);
}

export async function Metamask_Mumbai_approve_fDAI(setMsg, setErr) {
    const params = {
        "default_gas_amount": "1000000",
        "default_gas_price": "20000000000",
        "network": "mumbai",
        "amount": "1000000000000000000000"
    };
    Metamask_connect_and_execute(setMsg, setErr, networks['mumbai'], approve_fDAI, params);
}


// Assumes user has the base currency. Then, this function does the following:
// 1. Approves the Superfluid host to access the user's base currency
// 2. Upgrades the base currency to a supertoken
// 3. Starts streaming
export async function Metamask_Mumbai_Stream(setMsg, setErr, params) {
    params["default_gas_amount"] = "1000000";
    params["default_gas_price"] = "20000000000";
    Metamask_connect_and_execute(setMsg, setErr, networks['mumbai'], start_stream, params);
}


// Assumes user has the base currency. Then, this function does the following:
// 1. Approves the Superfluid host to access the user's base currency
// 2. Upgrades the base currency to a supertoken
// 3. Start streaming
async function start_stream(setMsg, setErr, web3Provider, accounts, params) {
    web3Provider.eth.defaultAccount = accounts[0];
    const host = new web3Provider.eth.Contract(
        contracts["superfluid_contract_abi"],
        contracts["superfluid_mumbai_host_address"]
    );

    const fdaix = new web3Provider.eth.Contract(
        contracts["supertoken_contract_abi"],
        contracts["fdaix_mumbai_address"]
    )

    web3Provider.eth.getGasPrice()
        .then(function (gp) {
            if (typeof (gp) === typeof (100)) {
                params["default_gas_price"] = String(gp);
            }

            let not_called = true;
            console.log(web3Provider.eth.abi.encodeParameters(['uint256'], [params["amount"]]));

            const upgrade_operation = {
                "operationType": 101,
                "target": params["fdaix_mumbai_address"],
                "data": web3Provider.eth.abi.encodeParameters(['uint256'], [params["amount"]])
            }

            const approval_operation = {
                "operationType": 1,
                "target": params["fdaix_mumbai_address"],
                "data": "" // TODO
            }
            const operations = [upgrade_operation, approval_operation];

            const operation_tuples = operations.map(
                (operation) => ([operation.operationType, operation.target, operation.data])
            );


            // host.methods.batchCall(operation_tuples)
            //     .send({
            //         from: accounts[0],
            //         gasPrice: params["default_gas_price"], gas: params["default_gas_amount"]
            //     })
            //     .on('error', function (error) {
            //         setErr("Failed to get permission to send donation");
            //     })
            //     .on('transactionHash', function (txn_hash) {
            //         // TODO: properly show transaction hash
            //         setMsg(txn_link_msg(txn_hash, params["network"], "Starting Donation Stream..."));
            //     })
            //     .on('confirmation', function (confirmationNumber, receipt) {
            //         if (confirmationNumber === 2 && (not_called)) {
            //             not_called = false;
            //             let msg = "Donation Stream to " + params["recipient_name"] + " has begun!";
            //             setMsg(<h6>{msg}</h6>)
            //         }
            //     })
        }).catch((error) => {
        setErr("Failed to Connect to Metamask");
    });
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

    web3Provider.eth.getGasPrice()
        .then(function (gp) {
            if (typeof (gp) === typeof (100)) {
                params["default_gas_price"] = String(gp);
            }

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
                        setMsg(<h6>{msg}</h6>)
                    }
                })
        }).catch((error) => {
        setErr("Failed to Connect to Metamask");
    });
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

    web3Provider.eth.getGasPrice()
        .then(function (gp) {
            if (typeof (gp) === typeof (100)) {
                params["default_gas_price"] = String(gp);
            }

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
                    if (confirmationNumber === 2 && (not_called)) {
                        not_called = false;
                        let msg = "fDAI has been approved to be spent by fDAIx!"
                        setMsg(<h6>{msg}</h6>)
                    }
                })
        }).catch((error) => {
        setErr("Failed to Connect to Metamask");
    });
}