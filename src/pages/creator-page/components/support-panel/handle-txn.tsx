import { Metamask_Ropsten_Donation, Metamask_Mumbai_Donation } from
        "../../../../Web3_Interaction/oneTimeDonate";
import { Metamask_Mumbai_full_stream } from "../../../../Web3_Interaction/streamDonate";

// determines which type of txn is being sent and on what network
// calls the corresponding function from one of the Web3_Interaction files
export async function handle_txn(setMsg, setErr, setStatus, paymentDetails, creatorDetails) {
    if (paymentDetails.type === 2) {
        // one time payment
        let params = {
            "recipient_name": paymentDetails.name,
            "recipient_address": paymentDetails.wallet,
            "donation_amount": paymentDetails.amount,
            "network": paymentDetails.network
        };
        if (paymentDetails.network === 'ropsten') {
            // Anish's test token:
            params["payment_token_address"] = "0x313ef98a80f9a07143ccc6ff94b2e6f6669104be"
            Metamask_Ropsten_Donation(setMsg, setErr, setStatus, params);
        } else if (paymentDetails.network === 'mumbai') {
            // fDAI:
            params["payment_token_address"] = "0x15f0ca26781c3852f8166ed2ebce5d18265cceb7"
            setErr("not implemented yet...");
            Metamask_Mumbai_Donation(setMsg, setErr, setStatus, params);
        } else {
            console.log("paymentDetails.network that was passed in to" +
                "handle_txn function is not ropsten or mumbai so it is invalid.");
        }
    } else if (paymentDetails.type === 1) {
        // streaming payment
        let params = {
            "recipient_name": paymentDetails.name,
            "recipient_address": paymentDetails.wallet,
            "network": paymentDetails.network,
            "base_token_address": paymentDetails.base_token_address,
            "super_token_address": paymentDetails.super_token_address,
            "flow_rate": getFlowRate(paymentDetails)
        };
        setErr("not implemented yet...")
    }
}


// TODO: Calculate amount to flow per second;
function getFlowRate(paymentDetails) {
    return "1";
}