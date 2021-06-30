import creatorPic from '../../../assets/images/creator-default-pic.svg';

export default function Step2Component({step, moveToStep}) {
    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
            <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-10 font-medium text-gray-900">Let's get you Onboard</h1>
                    <p className="mb-2 leading-relaxed">Choose your page name wisely!</p>
                    <p className="mb-12 text-gray-400 leading-relaxed">Remember your cringy emailID 10 years ago?</p>
                    <img className="w-1/6 mb-10 object-cover object-center rounded hover:opacity-30 transition-colors duration-200 ease-in-out" alt="creator picture" src={creatorPic} />
                    <div className="flex w-full justify-center items-end mb-4 mt-8">
                        <div className="relative sm:w-2/4 w-full">
                            <input type="text" id="hero-field" name="hero-field" placeholder="Page Name" className="w-full bg-gray-100 bg-opacity-50 focus:ring-2 focus:ring-blue-200 focus:bg-transparent border border-gray-300 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out text-center" />
                        </div>
                    </div>
                    <div className="flex w-full justify-center items-end">
                        <button className="inline-flex border-0 py-2 px-6 text-lg btn-main" onClick={() => moveToStep(3)} >Create</button>
                    </div>
                </div>

            </div>
        </section>
    );
}