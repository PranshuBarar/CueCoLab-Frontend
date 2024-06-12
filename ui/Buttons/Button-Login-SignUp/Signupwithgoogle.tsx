import { useRouter } from "next/navigation";
import axios from "axios";

function Signupwithgoogle() {
    const router = useRouter();

    const handleClick = async () => {

        window.location.href = 'https://api.cuecolab.com/oauth2/authorization/google';
    }

    return (
        <button className="flex flex-row justify-center items-center space-x-3 py-1.5" onClick={handleClick}>
            <img src="/google.png" className="max-w-[8%]"/>
            <span>Sign up with Google</span>
        </button>
    )
}

export default Signupwithgoogle;