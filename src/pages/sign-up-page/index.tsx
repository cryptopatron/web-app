import { useContext } from "react";
import { useState } from "react";
import UserContext from "../../contexts/user";
import Step1Component from "./step1";
import Step2Component from "./step2";
import Step3Component from "./step3"

export default function SignUpPage(){

    const {publicKey} = useContext(UserContext);
    
    const [step, setStep] = useState<number>(1);
    
    const moveToStep = (nextStep) => {
        setStep(nextStep) 
    }

    const displayStepComponent = (step) =>{
        if (step === 1){
            return(
                <Step1Component step={step} moveToStep={moveToStep}/>
            )
        }

        if (step === 2){
            return(
                <Step2Component  step={step} publicKey={publicKey} moveToStep={moveToStep}/>
            )
        }

        if (step === 3){
            return(
                <Step3Component publicKey={publicKey} step={step} moveToStep={moveToStep}/>
            )
        }
        
    }
    return (
        <div>
            {displayStepComponent(step)}
        </div>
    )
}