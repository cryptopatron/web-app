import { Metamask_Ropsten_Donation, Metamask_Mumbai_Donation } from
        "../../../../Web3_Interaction/oneTimeDonate";
import { get_erc20_amount_string, get_erc20_address_by_name } from "../../../../Web3_Interaction/Utils";

export async function handle_one_time_txn(setMsg, setErr, paymentDetails, creatorDetails) {
    const amount = get_erc20_amount_string(
        paymentDetails.network, paymentDetails.currency_name, paymentDetails.amount);

    let params = {
        "recipient_name": creatorDetails.name,
        "recipient_address": paymentDetails.to_address,
        "donation_amount": amount,
        "network": paymentDetails.network,
        "payment_token_address": get_erc20_address_by_name(paymentDetails.network, paymentDetails.currency_name)
    };
    console.log("Handle one time params:", params);

    if (paymentDetails.network === 'ropsten') {
        // Anish's test token:
        Metamask_Ropsten_Donation(setMsg, setErr, params);
    } else if (paymentDetails.network === 'mumbai') {
        Metamask_Mumbai_Donation(setMsg, setErr, params);
    } else {
        setErr("Invalid Network. Koen Only Supports Mumbai and Ropsten Testnets")
        console.log("paymentDetails.network that was passed in to" +
            "handle_txn function is not ropsten or mumbai so it is invalid.");
    }
}


// determines which type of txn is being sent and on what network
// calls the corresponding function from one of the Web3_Interaction files
export async function handle_streaming_txn(setMsg, setErr, setStatus, paymentDetails, creatorDetails) {
    let params = {
        "recipient_name": creatorDetails.name,
        "recipient_address": paymentDetails.to_address,
        "network": paymentDetails.network,
    };
    setErr("not implemented yet...");
}
