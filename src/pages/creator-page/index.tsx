import { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router";

import NavbarComponent from "../../components/navbar";
import CreatorComponent from "./components/creator";
import SupportPanelComponent from "./components/support-panel";
import * as PATHS from '../../constants/paths'

//test object ---> update the wallet address here
import {defaultCreator} from './pay-creator'

import { getUserByPageName } from "../../services/backendService";
import { loggedInContent } from "./navbar-content";

export default function CreatorPage() {
    const { pagename } = useParams<{ pagename?: string }>()
    const [creator, setCreator] = useState(defaultCreator)
    const history = useHistory()

    useEffect(() => {
        const checkPageExists = async () => {
            // check usename is present in db
            const page = await getUserByPageName(pagename)

            console.log(page)
            if (page && page.pageName) {
                setCreator(page)
            } else {
                //route to not-found
                console.log("not found")
                history.push(PATHS.NOTFOUND)
            }
        }
        checkPageExists()
    }, [pagename, history])

    return (
        (creator?.pageName && (creator?.generatedMaticWalletPublicKey || creator?.metaMaskWalletPublicKey)) ? (
            <>
                <NavbarComponent loggedInContent={loggedInContent}/>
                <CreatorComponent creator={creator}/>
                <div className="flex justify-center">
                    <SupportPanelComponent creatorDetails={creator} />
                </div>
            </>) : (null)

    )
}