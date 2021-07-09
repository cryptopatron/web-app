import React from 'react';
import { Metamask_connect_and_execute } from "./walletConnect";
import { txn_link_msg, get_currency_decimals_by_address } from "./Utils";
import abis from './abis.json';
import networks from './networks.json';

// executes one time donation through Metamask.
export async function Metamask_OneTime_Donation(setMsg, setErr, params) {
    params["default_gas_amount"] = networks[params.network].default_gas_amount;
    params["default_gas_price"] = networks[params.network].default_gas_price;
    Metamask_connect_and_execute(setMsg, setErr, networks[params.network], donate, params);
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
        abis["erc20_contract"],
        params["payment_token_address"]
    );

    let not_called = true;
    payment_token.methods.balanceOf(accounts[0]).call({
        from: accounts[0]
    }).then(function(balance : string) {

        const token_decimals = get_currency_decimals_by_address(params.network, params.payment_token_address);
        let int_balance = BigInt(balance + "0".repeat(token_decimals));
        let int_donation = BigInt(params.donation_amount);
        if (int_balance >= int_donation) {
            // user has enough tokens to make the donation
            payment_token.methods.transfer(params["recipient_address"], params["donation_amount"])
                .send({
                    from: accounts[0],
                    gasPrice: params["default_gas_price"], gas: params["default_gas_amount"]
                })
                .on('error', function (error) {
                    setErr("Failed to get permission to send donation");
                })
                .on('transactionHash', function (txn_hash) {
                    setMsg(txn_link_msg(txn_hash, params["network"], "Sending Donation..."));
                })
                .on('confirmation', function (confirmationNumber, receipt) {
                    if (confirmationNumber === 2 && (not_called)) {
                        not_called = false;
                        let msg = params["recipient_name"] + " has received your Donation!";
                        setMsg(txn_link_msg(receipt.transactionHash, params["network"], msg));
                    }
                })
        } else {
            // user doesn't have enough tokens to make the donation
            setErr("Insufficient funds to make donation");
        }
    })
}