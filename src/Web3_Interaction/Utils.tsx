import React from "react";

export function txn_link_msg(txn_hash: string, network: string, msg: string) {
    let link = "/";
    let link_msg = "";
    if (network === "ropsten") {
        link = "https://ropsten.etherscan.io/tx/" + txn_hash;
        link_msg = "View Transaction on Ropsten Testnet Block Explorer";
    }
    else if (network === "mumbai") {
        link = "https://mumbai.polygonscan.com/tx/" + txn_hash;
        link_msg = "View Transaction on Mumbai Testnet Block Explorer";
    }
    return (<div>
            <h6>{msg}</h6>
        <br></br>
        <br></br>
        <a href={link} target="_blank" rel="noopener noreferrer">
        <h6>{link_msg}</h6>
        </a>
        </div>);
}