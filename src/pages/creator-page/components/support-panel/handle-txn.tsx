import { Metamask_OneTime_Donation } from "../../../../Web3_Interaction/oneTimeDonate";
import { Metamask_start_stream } from "../../../../Web3_Interaction/streamDonate";
import { Metamask_mint_test_tokens } from "../../../../Web3_Interaction/mintTestTokens";
import {
	get_erc20_amount_string,
	get_erc20_address_by_symbol,
	get_erc20_amount_to_mint,
} from "../../../../Web3_Interaction/Utils";
import { OneTimePayment, Subscription } from "../../payment";

export async function handle_one_time_txn(
	setMsg,
	setErr,
	paymentDetails: OneTimePayment,
	creatorDetails
) {
	const amount = get_erc20_amount_string(
		paymentDetails.network,
		paymentDetails.currency_name,
		paymentDetails.amount
	);

	let params = {
		recipient_name: creatorDetails.pageName || paymentDetails.to_address,
		recipient_address: paymentDetails.to_address,
		donation_amount: amount,
		network: paymentDetails.network,
		payment_token_address: get_erc20_address_by_symbol(
			paymentDetails.network,
			paymentDetails.currency_name
		),
	};

	Metamask_OneTime_Donation(setMsg, setErr, params);
}

// determines which type of txn is being sent and on what network
// calls the corresponding function from one of the Web3_Interaction files
export async function handle_streaming_txn(
	setMsg,
	setErr,
	paymentDetails: Subscription,
	creatorDetails
) {
	const amount_per_full_string = get_erc20_amount_string(
		paymentDetails.network,
		paymentDetails.currency_name,
		paymentDetails.amount_per
	);
	let params = {
		recipient_name: creatorDetails.name,
		recipient_address: paymentDetails.to_address,
		amount_per: amount_per_full_string,
		network: paymentDetails.network,
		payment_schedule: paymentDetails.payment_schedule,
		currency_name: paymentDetails.currency_name,
		payment_token_address: get_erc20_address_by_symbol(
			paymentDetails.network,
			paymentDetails.currency_name
		),
	};
	Metamask_start_stream(setMsg, setErr, params);
}

export async function handle_mint_txn(setMsg, setErr, paymentDetails) {
	const amount_to_mint = get_erc20_amount_to_mint(
		paymentDetails.network,
		paymentDetails.currency_name
	);
	const params = {
		network: paymentDetails.network,
		currency_name: paymentDetails.currency_name,
		amount_to_mint: amount_to_mint,
		token_address: get_erc20_address_by_symbol(
			paymentDetails.network,
			paymentDetails.currency_name
		),
	};
	console.log("Mint Txn Params:", params);
	Metamask_mint_test_tokens(setMsg, setErr, params);
}
