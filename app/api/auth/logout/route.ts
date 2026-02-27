import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ success: true });
    
    // Clear the cookie by setting it to expire in the past
    response.cookies.set('token', '', { 
        httpOnly: true, 
        // expiresIn: '30m',
        expires: new Date(0), // Set the cookie to expire immediately
        maxAge: 0, 
        // ✅ path: '/' ensures it's deleted for the WHOLE site
        path: '/login' 
    });

    return response;
}