import {NextRequest, NextResponse} from "next/server";


export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  if (refreshToken) {
    const response = NextResponse.json({message: "ok"}, {
      status: 200,
    })

    const new_access_token = Date.now().toString()
    const new_refresh_token = (Date.now() * 4).toString()

    response.cookies.set('access_token', new_access_token, {
      maxAge: 3600,
      httpOnly: true,
      secure: true,
      domain: '.refresh-example.com',
      sameSite: 'lax'
    });

    response.cookies.set('refresh_token', new_refresh_token, {
      maxAge: 3600 * 24,
      httpOnly: true,
      secure: true,
      domain: 'id.refresh-example.com',
      sameSite: 'strict'
    });

    return response
  }

  if (accessToken) {
    const response = NextResponse.json({message: "ok"}, {
      status: 200,
    })

    const new_access_token = Date.now().toString()

    response.cookies.set('access_token', new_access_token, {
      maxAge: 3600,
      httpOnly: true,
      secure: true,
      domain: '.refresh-example.com',
      sameSite: 'lax'
    });

    return response
  }

  return NextResponse.json({message: "forbidden"}, {status: 403})
}
