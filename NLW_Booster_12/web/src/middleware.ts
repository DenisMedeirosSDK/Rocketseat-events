import { NextRequest, NextResponse } from 'next/server'

const signInUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=user:email`

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    const cookieExpiryInSeconds = 30 // 30 seconds

    return NextResponse.redirect(signInUrl, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${cookieExpiryInSeconds}`,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/memories/:path*'],
}
