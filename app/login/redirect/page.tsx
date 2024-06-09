'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";

const RedirectHandler = () => {
    const router = useRouter();

    //This state variable will be used for storing the actual condition, that whether the 
    //page is still in loading state or the loading state has been ended
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://api.cuecolab.com/user/userdata', {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    //As soon as response is received and is ok the loading is complete and
                    //state will be updated to false
                    setLoading(false);
                    //User will get redirected to the /user page 
                    router.push('/user');
                } else {
                    throw new Error('Failed to fetch user data');
                }
            } catch (error) {

            }
        }
        fetchUserData();
    }, [router]);

    return (
        <div className="flex h-screen w-screen thinner-scrollbar justify-center items-center" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${'./background.jpg'})` }}>
            {
                loading ?
                    <div className="flex justify-center items-center">
                        <div>
                            <div className="flex items-center justify-center w-full h-full px-10 py-2">
                                <BounceLoader color="#1b2150" size={32} />
                            </div>
                        </div>
                        <div>
                            Loading your data, please wait...
                        </div>
                    </div>
                    :
                    <div>

                    </div>
            }

        </div>
    )
}

export default RedirectHandler;