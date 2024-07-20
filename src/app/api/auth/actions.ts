'use server'
import {cookies} from "next/headers";

export async function authorize() {
  const hasAutoLogin = Boolean(cookies().get('X-Start-Autologin')?.value)
  const now = Date.now();

  cookies().set('access_token', `${now}`, {
    secure: true,
    httpOnly: true,
    domain: ".refresh-example.com",
    maxAge: 3600,
    sameSite: 'lax'
  });

  if (!hasAutoLogin) {
    cookies().set('refresh_token', `${now * 2}`, {
      secure: true,
      httpOnly: true,
      domain: "id.refresh-example.com",
      maxAge: 86400,
      sameSite: 'strict'
    })
  }

  return
}
