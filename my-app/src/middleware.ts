import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

import { verifyJWT } from './lib/verifyJWT'

export async function middleware(req: NextRequest) {


    const path = req.nextUrl.pathname

    const isPublic = '/';

    const cookieStore = cookies();

    const JWT = cookieStore.get('JWT')?.value;

    const decodedToken = jwt.decode(
        cookieStore.get('jwt')?.value as string,
        {complete: true}
    )

    
    const userData: any = decodedToken?.payload
    
    const { valid, reason } = await verifyJWT();

    
    // allow public routes  

    console.log(userData)
    console.log('path', path)
    console.log(valid, reason)

    
    if(!valid && path !== isPublic ) {
        const url = req.nextUrl.clone()
        url.pathname = '/auth/login'
        return NextResponse.rewrite(url)
    }

    if(path == '/auth/login' && valid) {
        const url = req.nextUrl.clone()
        url.pathname = '/admin'
        return NextResponse.redirect(url)
    }

    

    return NextResponse.next()
}

// Supports both a single string value or an array of matchers
export const config = {
    matcher: [
        '/',
        '/',
        '/auth/login',
        '/admin/:path*'
    ],
}