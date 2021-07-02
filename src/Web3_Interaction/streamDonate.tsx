import React from 'react';
import { Metamask_connect_and_execute } from "./walletConnect";
import { txn_link_msg } from "./Utils";
import contracts from './contracts.json';
import networks from './networks.json';


export async function Metamask_Mumbai_mint_fDAI(setMsg, setErr) {
    const params = {
        "default_gas_amount": "1000000",
        "default_gas_price": "20000000000",
        "network": "mumbai",
        "amount": "100000000000000000000000"
    };
    Metamask_connect_and_execute(setMsg, setErr, networks['mumbai'], mint_fDAI, params);
}


async function mint_fDAI(setMsg, setErr, web3Provider, accounts, params) {
    web3Provider.eth.defaultAccount = accounts[0];

    let fDAI = new web3Provider.eth.Contract(
        contracts["superfluid_fERC20_contract_abi"],
        contracts["superfluid_mumbai_fDAI_address"]
    );

    web3Provider.eth.getGasPrice()
        .then(function (gp) {
            if (typeof (gp) === typeof (100)) {
                params["default_gas_price"] = String(gp);
            }

            let not_called = true;
            console.log(fDAI.methods);
            fDAI.methods.mint(accounts[0], params["amount"])
                .send({
                    from: accounts[0],
                    gasPrice: params["default_gas_price"], gas: params["default_gas_amount"]
                })
                .on('error', function (error) {
                    setErr("Failed to get permission to send donation");
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