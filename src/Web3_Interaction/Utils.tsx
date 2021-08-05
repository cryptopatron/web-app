import React from "react";
import contract_info from './contract_info.json';

export function txn_link_msg(txn_hash: string, network: string, msg: string) {
    let link = "/";
    switch (network) {
        case "ropsten_testnet":
            link = "https://ropsten.etherscan.io/tx/" + txn_hash;
            break;
        case "mumbai_testnet":
            link = "https://mumbai.polygonscan.com/tx/" + txn_hash;
            break;
        case "ethereum_mainnet":
            link = "https://etherscan.com/tx/" + txn_hash;
            break;
        case "polygon_mainnet":
            link = "https://polygonscan.com/tx/" + txn_hash;
            break;
        default:
            link = ""
    };

    return (<div>
        <a href={link} target="_blank" rel="noopener noreferrer">
            <h6>{msg}</h6>
        </a>
        </div>);
}


export function get_erc20_address_by_symbol(network, symbol) {
    return contract_info[network]["ERC20s"][symbol].address;
}


export function get_currency_decimals_by_address(network, address) {
    const erc20_info = contract_info[network]["ERC20s"]
    const network_contract_names = Object.keys(erc20_info);
    for (let symbol of network_contract_names) {
        if (erc20_info[symbol].address === address) {
            return erc20_info[symbol].decimals;
        }
    }
}


// this function just basically hardcodes how much of each test token to mint
export function get_erc20_amount_to_mint(network, currency_name) {
    if (network === "ropsten_testnet") {
        if (currency_name === "USDC") {
            return "500000000"
        } else if (currency_name === "DAI") {
            return "500000000000000000000";
        }
    } else if (network === "mumbai_testnet") {
        if (currency_name === "USDC") {
            return "500000000"
        } else if (currency_name === "DAI") {
            return "500000000000000000000";
        }
    } else {
        return "500000000";
    }
}

export function get_currency_decimals(network, name) {
    return contract_info[network]["ERC20s"][name].decimals;
}


export function get_erc20_amount_string(network, name, amount) {
    const decimals = get_currency_decimals(network, name);
    return String(amount) + "0".repeat(decimals);
}