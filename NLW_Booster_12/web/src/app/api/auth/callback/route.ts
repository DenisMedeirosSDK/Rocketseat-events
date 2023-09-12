import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const code = searchParams.get('code')

  const redirectTo = request.cookies.get('redirectTo')?.value

  const registerResponse = await api.post('/register', {
    code,
  })

  const { token } = registerResponse.data

  const cookieExpiryInSeconds = 60 * 60 * 24 * 30 // 30 days

  return NextResponse.redirect(redirectTo ?? new URL('/', request.url), {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict;  Max-Age=${cookieExpiryInSeconds}`,
    },
  })
}
