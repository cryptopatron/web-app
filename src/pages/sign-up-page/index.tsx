import { useState } from "react";
import Step1Component from "./step1";

export default function SignUpPage(){
    
    let [count, setCount] = useState<number>(1);

    const somFunc = () => {
        let temp = count + 1
        setCount(temp) 
    }
    return (
        <div>
            <Step1Component clickFunc={somFunc}/>
            Hello {count}
        </div>
    )
}