import { useEffect } from "react";

function Continuewithgoogle() {

    const handleClick = async () => {

        window.location.href = 'https://api.cuecolab.com/oauth2/authorization/google';
    }
  

    return (
        <button
            className="flex flex-row justify-center items-center space-x-3 py-1.5"
            onClick={handleClick}
        >
            <img src="/google.png" className="max-w-[8%]" />
            <span>Continue with Google</span>
        </button>
    )
}

export default Continuewithgoogle;