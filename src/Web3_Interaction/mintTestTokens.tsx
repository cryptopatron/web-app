import React from 'react';
import { Metamask_connect_and_execute } from "./walletConnect";
import { txn_link_msg, get_currency_decimals_by_address } from "./Utils";
import abis from './abis.json';
import networks from './networks.json';
const gwei_zeros = "000000000"


export async function Metamask_mint_test_tokens(setMsg, setErr, params) {
    params["default_gas_amount"] = networks[params.network].default_gas_amount;
    params["default_gas_price"] = networks[params.network].default_gas_price;
    if (params.network === "mumbai") {
        let get_promise = await fetch('https://gasstation-mumbai.matic.today');
        let res = await get_promise.json();
        params["default_gas_price"] = String(res["fastest"]) + gwei_zeros;
    }
    Metamask_connect_and_execute(setMsg, setErr, networks[params.network], mint, params);
}


async function mint(setMsg, setErr, web3Provider, ethereum, accounts, params) {
    web3Provider.eth.defaultAccount = accounts[0];

    const token = new web3Provider.eth.Contract(
        abis["erc20_contract"],
        params["token_address"]
    );
    let not_called = true;

    token.methods.mint(accounts[0], params.amount_to_mint).estimateGas({
        from: accounts[0]
    }).then(function(gasAmount) {
        console.log(gasAmount);
        token.methods.mint(accounts[0], params.amount_to_mint).send({
            from: accounts[0],
            gasPrice: params["default_gas_price"], gas: gasAmount
        })
            .on('error', function (error) {
                setErr("Failed to get permission to mint " + params.currency_name);
            })
            .on('transactionHash', function (txn_hash) {
                setMsg(txn_link_msg(txn_hash, params["network"], "Minting " + params.currency_name + "..."));
            })
            .on('confirmation', function (confirmationNumber, receipt) {
                if (confirmationNumber === 0 && (not_called)) {
                    not_called = false;
                    let msg = params.currency_name + " Minted to Your Wallet!"
                    setMsg(<h6>{msg}</h6>);
                    ethereum.request({
                        method: 'wallet_watchAsset',
                        params: {
                            type: 'ERC20', // Initially only supports ERC20, but eventually more!
                            options: {
                                address: params.token_address, // The address that the token is at.
                                symbol: params.currency_name, // A ticker symbol or shorthand, up to 5 chars.
                                decimals: get_currency_decimals_by_address(
                                    params.network, params.token_address
                                ) // The number of decimals in the token
                            }
                        }
                    });
                }
            })
    }).catch((function (e) {
        console.log("ERror in mintTestTokens", e);
        setErr("Failed to get permission to mint " + params.currency_name);
    }))

}