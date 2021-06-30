import { useState } from "react";
import Step1Component from "./step1";
import Step2Component from "./step2";
import Step3Component from "./step3";

export default function SignUpPage(){
    
    let [step, setStep] = useState<number>(1);

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
                <Step2Component step={step} moveToStep={moveToStep}/>
            )
        }

        if (step === 3){
            return(
                <Step3Component step={step} moveToStep={moveToStep}/>
            )
        }
        
    }
    return (
        <div>
            {displayStepComponent(step)}
        </div>
    )
}