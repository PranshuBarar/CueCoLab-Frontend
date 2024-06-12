'use client'
import { useRouter } from 'next/navigation';

function Dashboard(){

    const router = useRouter();

    const handleClick = () => {
        router.push('/user/dashboard');
    }
    return (
        <button type="button" onClick={handleClick} className="flex flex-row bg-gray-400 rounded-3xl items-center mx-2 px-4 py-1 text-black text-[12px] hover:bg-blue-600 justify-center">
            Dashboard
        </button>
    )
}

export default Dashboard;