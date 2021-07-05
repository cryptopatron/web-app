import step1Image from '../../../assets/images/onboarding-step1.svg';
import { useHistory } from 'react-router-dom'

export default function Step1Component({ step, moveToStep }) {
    const history = useHistory()
    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <div className="text-center">
                    <h2 className="title-font mb-6 font-semibold text-gray-900">Let's get you Onboard</h2>
                    <p className="text-gray-700 leading-relaxed">Choose your guild.</p>
                    <p className="text-gray-400 leading-relaxed">Of course they are one in the same.</p>
                </div>
                <div className="my-8 w-2/6 sm:w-40">
                    <img className=" w-full object-cover object-center" alt="create page step1 image" src={step1Image} />
                </div>
                <div className=" flex flex-col sm:w-60 justify-center ">
                    <div className="w-full my-1">
                        <button className="btn-sec w-full" onClick={() => moveToStep(2)}>I am here as a Creator</button>
                    </div>
                    <div className="w-full my-1">
                        {/* Takes you back to landing page */}
                        <button className="btn-sec w-full" onClick={() => history.replace("/")}>I am here as a Supporter</button>
                    </div>
                </div>
            </div>
        </section>

    )
}