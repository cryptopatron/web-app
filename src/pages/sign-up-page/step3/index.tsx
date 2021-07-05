import walletPic from '../../../assets/images/wallet-svg.svg'

export default function Step3Component({ step, moveToStep, publicKey }) {

    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <div className="text-center">
                    <h2 className="title-font mb-6 font-semibold text-gray-900">Let's get you Onboard</h2>
                    <p className="text-gray-700 leading-relaxed">Your Wallet Integration</p>
                    <p className="text-gray-400 leading-relaxed">This is where your cryptocurrency will reside. Safely at that too!</p>
                </div>
                <img className="lg:w-1/6 sm:w-1/6 w-2/6 mb-14 object-cover object-center" alt="create page step1 image" src={walletPic} />
                <div className="text-center w-auto">
                    <p className="mb-4 leading-relaxed">We went ahead and made a wallet for you.</p>
                </div>
                <div className="text-center w-auto">
                    <p className="mb-6 relaxed font-semibold">
                        {publicKey}
                    </p>
                    <p className="">Dont worry you don't have to remember it. We'll manage that.</p>
                </div>
            </div>
        </section>
    );
}