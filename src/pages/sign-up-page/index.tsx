import { useContext } from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import UserContext from "../../contexts/user";
import Step1Component from "./step1";
import Step2Component from "./step2";
import Step3Component from "./step3"
import * as PATHS from '../../constants/paths'

export default function SignUpPage() {
    const history = useHistory()

    useEffect(() => {
        history.push(PATHS.ONBOARD)
        console.log(history.action)

    }, [history])

    const { accessToken } = useContext(UserContext);
    const [step, setStep] = useState<number>(1);
    const [publicAddress, setPublicAddress] = useState('');
    const [pageName, setPageName] = useState('');

    const moveToStep = (nextStep) => {
        setStep(nextStep)
    }

    const displayStepComponent = (step) => {
        if (step === 1) {
            return (
                <Step1Component step={step} moveToStep={moveToStep} />
            )
        }

        if (step === 2) {
            return (

                <Step2Component step={step} accessToken={accessToken} moveToStep={moveToStep} setPublicAddress={setPublicAddress} pageName={pageName} setPageName={setPageName} />
            )
        }

        if (step === 3) {
            return (
                <Step3Component step={step} moveToStep={moveToStep} publicAddress={publicAddress} pageName={pageName} />
            )
        }

    }
    return (
        <div>
            {displayStepComponent(step)}
        </div>
    )
}