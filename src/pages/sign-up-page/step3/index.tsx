import walletPic from '../../../assets/images/wallet-svg.svg'

export default function Step3Component({step, moveToStep, publicKey}) {

    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <h2 className="title-font sm:text-3xl text-2xl mb-4 font-medium text-gray-900">Let's get you Onboard</h2>
                <p className="leading-relaxed">Your Wallet Integration</p> 
                <p className="mb-8 leading-relaxed">This is where your cryptocurrency will reside. Safely at that too!</p>
                <img className="lg:w-1/6 sm:w-1/6 w-2/6 mb-14 object-cover object-center" alt="create page step1 image" src={walletPic} />
                <div className="text-center w-auto">
                    <p className="mb-4 leading-relaxed">We went ahead and made a wallet for you.</p>
                </div>
                <div className="text-center w-auto">
                    <p className="mb-6 relaxed font-semibold">
                        {publicKey}
                    </p>
                    <p className="">You can find your wallet in your <a className="font-semibold text-green-400 hover:text-green-200" href="https://drive.google.com">Google Drive</a></p>
                </div>
            </div>
        </section>
    );
}