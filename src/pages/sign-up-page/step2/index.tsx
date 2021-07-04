import { useState } from 'react';
import creatorPic from '../../../assets/images/creator-default-pic.svg';
import classNames from 'classnames';
import { checkIfUserExists, getUserByPageName } from '../../../services/backendService';
import { registerPage } from '../../../services/registerPageName';

export default function Step2Component({moveToStep, publicKey}) {
    const [pageName, setPageName] = useState('');
    const [isValid, setValid] = useState(false);
    const [isNeutral, setNeutral] = useState(true);
    const [isNamePresent, setIsNamePresent] = useState(true);

    let pageChangeCSS = classNames({
        'w-full':true,
        'bg-gray-100':true,
        'bg-opacity-50':true,
        'focus:ring-2':true,
        'focus:bg-transparent':true,
        'border':true,
        'border-gray-300':true,
        'focus:border-blue-500':true,
        'text-base':true,
        'outline-none':true,
        'text-gray-700':true,
        'py-1':true,
        'px-3':true,
        'leading-8':true,
        'transition-colors':true,
        'duration-200':true,
        'ease-in-out':true,
        'text-center':true,
        'focus:ring-blue-200':isNeutral,
        'focus:ring-green-200':isValid,
        'focus:ring-red-200': !isValid
    });

    let nameLengthCSS = classNames({
        'text-sm': true,
        'text-center': true,
        'hidden': isValid
    });

    let userPresentCSS = classNames({
        'text-sm':true,
        'text-center': true,
        'hidden': isNamePresent,
        'text-red-400': true
    });

    const handleChange = (name) => {
        if(name.length == 0) {
            setValid(false);
            setNeutral(true);
            setPageName(name);
        }
        else if(name.length < 4 && name.length > 0) {
            setValid(false);
            setNeutral(false);
            setPageName(name);
        }
        else {
            setValid(true);
            setNeutral(false);
            setPageName(name);
        }

    }

    const onCreateClick = async () => {
        let response = await getUserByPageName(pageName);
        console.log(response.body);
        if(checkIfUserExists(pageName)) {
            registerPage(pageName,publicKey);
            moveToStep(3);
        }
        else{
            setIsNamePresent(false);
        }
    }

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
                            <input type="text" value={pageName} id="hero-field" onChange = {() => handleChange} name="hero-field" placeholder="Page Name" className={pageChangeCSS} />
                            <label className={nameLengthCSS}>Page name must have 4 or more characters</label>
                            <label className={userPresentCSS}>Apologies! This name has already been taken.</label>
                        </div>
                    </div>
                    <div className="flex w-full justify-center items-end">
                        <button className="inline-flex border-0 py-2 px-6 text-lg btn-main" onClick={() => onCreateClick} >Create</button>
                    </div>
                </div>

            </div>
        </section>
    );
}