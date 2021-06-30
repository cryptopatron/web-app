import step1Image from '../../../assets/images/onboarding-step1.svg';

function moveToStep(stepNumber: number) {
    
}

export default function Step1Component({step, clickFunc}) {

    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <h2 className="title-font sm:text-3xl text-2xl mb-4 font-medium text-gray-900">Let's get you Onboard</h2>
                <p className="leading-relaxed">Choose your guild.</p> 
                <p className="mb-8 leading-relaxed">Of course they are one in the same.</p>
                <img className="lg:w-1/6 sm:w-1/6 w-2/6 mb-14 object-cover object-center" alt="create page step1 image" src={step1Image} />
                <div className="text-center w-2/3 w-auto">
                    <div className="flex justify-center mb-6">
                        <button className="inline-flex text-gray border-2 border-gray-700 py-2 px-6 focus:outline-none hover:shadow-xl text-lg" onClick={() => moveToStep(2)}>I am here as a Creator</button>
                    </div>
                    <div className="justify-center">
                        <button className="inline-flex text-gray-700 border-2 hover:border-4 border-gray-700 py-2 px-4 focus:outline-none hover:shadow-xl text-lg">I am here as a Supporter</button>
                    </div>
                </div>
            </div>
        </section>
        // <button className = "btn-main" onClick = {() => {clickFunc()}}>
        //     Click me
        // </button>
    )
}