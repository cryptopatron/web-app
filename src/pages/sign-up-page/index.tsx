import { useState } from "react";
import Step1Component from "./step1";
import Step2Component from "./step2";
import Step3Component from "./step3";

export default function SignUpPage(){
    
    let [step, setStep] = useState<number>(1);

    const moveToStep = () => {
        setStep(() => step++) 
    }
    return (
        <div>
            <Step1Component step={step} clickFunc={moveToStep}/>
            {/* <Step2Component /> */}
            {/* <Step3Component /> */}
        </div>
    )
}