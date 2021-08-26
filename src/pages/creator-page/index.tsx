import { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router";
import Web3 from "web3";

import NavbarComponent from "../../components/navbar";
import CreatorComponent from "./components/creator";
import SupportPanelComponent from "./components/support-panel";
import * as PATHS from "../../constants/paths";

//test object ---> update the wallet address here
import { defaultCreator } from "./pay-creator";

import { getUserByPageName } from "../../services/backendService";
import { loggedInContent } from "./navbar-content";

export default function CreatorPage() {
	const { pagename } = useParams<{ pagename?: string }>();
	const [creator, setCreator] = useState(defaultCreator);
	const history = useHistory();

	useEffect(() => {
		const checkPageExists = async () => {
			// check usename is present in db
			const page = await getUserByPageName(pagename);
			if (page && page.pageName) {
				setCreator(page);
			} else {
				//route to not-found
				history.push(PATHS.NOTFOUND);
			}
		};
		checkPageExists();
	}, [pagename, history]);

	const metaMask = useCallback(async () => {
		const ethereum = (window as any).ethereum;
		const web3Provider = new Web3(ethereum);
		const accounts = await ethereum.request({
			method: "eth_requestAccounts",
		});
		console.log(accounts);
	}, []);
	useEffect(() => {
		metaMask().then((r) => r);
	}, [metaMask]);

	return creator?.pageName &&
		(creator?.generatedMaticWalletPublicAddress ||
			creator?.metaMaskWalletPublicAddress) ? (
		<>
			<NavbarComponent loggedInContent={loggedInContent} />
			<CreatorComponent creator={creator} />
			<div className="flex justify-center">
				<SupportPanelComponent creatorDetails={creator} />
			</div>
		</>
	) : null;
}
