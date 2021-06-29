import { useState } from "react";
import Step1Component from "./step1";

export default function SignUpPage(){
    
    let [count, setCount] = useState<number>(1);

    const somFunc = () => {
        setCount(
            count++
        ) 
    }
    return (
        <div>
            Hello Above side
            <Step1Component clickFunc={somFunc}/>
            Hello {{count}}
        </div>
    )
}