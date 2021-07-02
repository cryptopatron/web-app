import { Metamask_Ropsten_Donation, Metamask_Mumbai_Donation } from "../../../../Web3_Interaction/oneTimeDonate";

// determines which type of txn is being sent and on what network
// calls the corresponding function from one of the Web3_Interaction files
export async function handle_txn(setMsg, setErr, paymentDetails, creatorDetails) {
    if (paymentDetails.type === 2) {
        // one time payment
        let params = {
            "recipient_name": creatorDetails.name,
            "recipient_address": creatorDetails.metaMaskWalletPublicKey,
            "donation_amount": paymentDetails.amount,
            "network": paymentDetails.network
        };
        if (paymentDetails.network === 'ropsten') {
            // Anish's test token:
            params["payment_token_address"] = "0x313ef98a80f9a07143ccc6ff94b2e6f6669104be"
            Metamask_Ropsten_Donation(setMsg, setErr, params);
        } else if (paymentDetails.network === 'mumbai') {
            // Standard Mumbai Test Token from Faucet:
            params["payment_token_address"] = "0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e"
            setErr("not implemented yet...");
            Metamask_Mumbai_Donation(setMsg, setErr, params);
        } else {
            console.log("paymentDetails.network that was passed in to" +
                "handle_txn function is not ropsten or mumbai so it is invalid.")
        }
    } else if (paymentDetails.type === 1) {
        // streaming payment
        // TODO
        setErr("not implemented yet...");
    }
}