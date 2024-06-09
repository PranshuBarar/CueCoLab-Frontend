import { NextRequest, NextResponse } from "next/server";

const publicPaths = ['/login', '/signup', '/login/redirect', '/home', '/pricing', '/help', '/contact', '/image'];

export const middleware = async (request: NextRequest) => {

    const isLoggedIn = await validateToken(request);


    if (isLoggedIn) {
        if (publicPaths.includes(request.nextUrl.pathname) || request.nextUrl.pathname === '/login/code') {
            return NextResponse.redirect(new URL('/user', request.url)); //What is this ?
        }
    } else {
        //special handling for '/login/code' endpoint
        if (request.nextUrl.pathname === '/login/code') {
            const canAccessLoginCodeEndpoint = checkOtpStatus(request);
            if (!canAccessLoginCodeEndpoint) {
                
                return NextResponse.redirect(new URL('/login', request.url)); //What is this ?;
            }
        }
        else if (!publicPaths.includes(request.nextUrl.pathname)) {
            return NextResponse.redirect(new URL('/login', request.url)); //What is this ?;
        }
    }
}

async function validateToken(request: NextRequest): Promise<boolean> {
    const cookieHeader = request.headers.get('cookie') || '';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Cookie', cookieHeader);

    try {
        const response = await fetch('https://api.cuecolab.com/user/is_logged_in', {
            method: 'GET',
            headers: headers,
            credentials: 'include',
        })
        if (response.ok) {
            const data = await response.json();
            if (data === true) {
                return true;
            }
        }
        return false;

    }
    catch (error) {
        return false;
    }
}

const checkOtpStatus = (request: NextRequest): boolean => {
   
    const otpTimestamp = request.cookies.get('otpTimestamp');
    

    // Decision based on the presence of OTP timestamp
    if (!otpTimestamp) {
        
        return false;
    }

    
    return true;
};


export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - robots.txt (robots file)
         */
        "/((?!api|static|.*\\..*|_next).*)",
    ],
};

