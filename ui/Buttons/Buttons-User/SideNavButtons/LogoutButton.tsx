import clsx from 'clsx';
import { useRouter } from 'next/navigation';

function LogoutButton() {
    const router = useRouter();

    const handleClick = () => {
        localStorage.clear();
        logoutRequestToBackend();
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const logoutRequestToBackend = async () => {
        const response = await fetch('https://api.cuecolab.com/logout',{
            method: 'POST',
            headers: headers,
            credentials: 'include',
        })
        if(response.ok){
            router.push('/login')
        }
    }

    return (
        <button
            type="button"
            className={clsx(
                'flex flex-row rounded-3xl items-center px-4 py-1 text-[12px] w-full justify-center bg-gray-400 hover:bg-blue-600'
            )}
            onClick={handleClick}
        >
            Log Out
        </button>
    )
}

export default LogoutButton;