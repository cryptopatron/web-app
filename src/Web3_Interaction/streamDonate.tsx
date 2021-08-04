import React from 'react';
import { Metamask_connect_and_execute } from "./walletConnect";
import { txn_link_msg } from "./Utils";
import abis from './abis.json';
import contract_info from './contract_info.json';
import networks from './networks.json';


export async function Metamask_start_stream(setMsg, setErr, params) {
    params["default_gas_price"] = networks[params.network].default_gas_price;
    Metamask_connect_and_execute(setMsg, setErr, networks[params.network], start_subscription, params);
}



// given the params which include amount_per and
// the schedule, return how much the user should
// approve our smart contract to take
function get_amount_to_approve(params) {
    let amount_per = BigInt(params.amount_per);
    let n_payments = BigInt((params.payment_schedule).length);
    return (amount_per * n_payments).toString();
}


// starts a subscription
async function start_subscription(setMsg, setErr, web3Provider, ethereum, accounts, params) {
    web3Provider.eth.defaultAccount = accounts[0];

    const payment_token = new web3Provider.eth.Contract(
        abis["erc20_contract"],
        params["payment_token_address"]
    );

    let not_called = true;
    const amount_to_approve = get_amount_to_approve(params);
    const subscription_contract_address = contract_info[params.network]["Subscription_Contract"].address

    payment_token.methods.approve(subscription_contract_address, amount_to_approve).estimateGas({
        from: accounts[0]
    }).then(function(gasAmount) {
        payment_token.methods.approve(subscription_contract_address, amount_to_approve)
            .send({
                from: accounts[0],
                gasPrice: params["default_gas_price"], gas: 3*gasAmount
            })
            .on('error', function (error) {
                setErr("Failed to get permission to start " + params.currency_name + " subscription");
            })
            .on('transactionHash', function (txn_hash) {
                setMsg(txn_link_msg(txn_hash, params.network, "Starting " + params.currency_name + " Subscription..."));
            })
            .on('confirmation', function (confirmationNumber, receipt) {
                if (confirmationNumber === 0 && (not_called)) {
                    not_called = false;
                    let msg = params.currency_name + " Subscription started!"
                    setMsg(<h6>{msg}</h6>);
                }
            })
    })
}
