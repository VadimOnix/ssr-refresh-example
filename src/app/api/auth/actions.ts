'use server'
import {cookies} from "next/headers";

/**
 * Серверная функция для авторизации пользователя.
 * @function authorize
 * @returns {Promise<void>}
 *
 * @description
 *
 *  - Устанавливает куки `access_token` для основного домена (`.refresh-example.com`)
 *  с временем жизни 1 час.
 *  - Устанавливает куки `refresh_token` для домена `id.refresh-example.com`
 *  с временем жизни 24 часа, если куки `X-Start-Autologin` не найдена.
 */
export async function authorize(): Promise<void> {
  const hasAutoLogin = Boolean(cookies().get('X-Start-Autologin')?.value);
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

  return;
}
