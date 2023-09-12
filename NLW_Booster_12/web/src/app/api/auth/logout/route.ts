import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL('/', request.url), {
    headers: {
      'Set-Cookie': `token=; Path=/; HttpOnly; Secure; SameSite=Strict;  Max-Age=0`,
    },
  })
}
