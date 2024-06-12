import React from 'react';

function LoginAndSignupLayout({
    children }: {
        children: React.ReactNode;
    }) {
    return (
        <div className='flex flex-col h-screen w-screen'>
            <div className="flex flex-row bg-blue-950 justify-center items-center p-4 ">
                <img src="/logo.svg" alt="Logo Image" className="max-w-[200px]" />
            </div>

            <div className='flex flex-row flex-grow bg-blue-300 justify-center'>
                {children}
            </div>
        </div>


    )
}

export default LoginAndSignupLayout;