import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../../../contexts/user";
import { updateUserProfile } from "../../../../services/backendService";





export default function EditOverlayComponent({ creator }) {
    const [name, setName] = useState(creator.name)
    const [bio, setBio] = useState(creator.bio)
    const { token } = useContext(UserContext)
    const history = useHistory()
    const newPageDetails = async () => {

        const res = await updateUserProfile(name, bio, token)
        if (res) {
            history.go(0)
        }
        else {
            console.log("update failed")

        }

    }


    return (

        <form
            className="flex flex-col w-full  justify-center text-left items-center mt-5"
            onSubmit={(e) => {
                e.preventDefault();
                newPageDetails();
            }}
        >   
            <div>
            <p className="my-2 font-semibold">Edit your profile information</p>
            </div>
            <div>
            <p className="my-2 mt-5 text-left">Edit name</p>
            </div>
            <input
                className="input-main w-full sm:w-4/5 max-w-lg text-left md: pl-8"
                type="text"
                aria-label="Update your name"
                placeholder="pagename"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <div>
            <p className="my-2 mt-5 text-left">Edit bio</p>
            </div>
            <textarea
                className="input-main w-full sm:w-4/5 max-w-lg text-left md: pl-8"
                aria-label="Update your bio"
                placeholder="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />

            <button className="btn-main w-full m-5 mb-6 sm:w-4/5 ">
                Update
            </button>
        </form>
    );
}