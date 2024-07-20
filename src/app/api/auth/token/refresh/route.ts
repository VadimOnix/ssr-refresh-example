import { NextRequest, NextResponse } from "next/server";

/**
 * Обработчик POST-запроса для API.
 *
 * @function POST
 * @param {NextRequest} request - Объект запроса Next.js.
 * @returns {Promise<NextResponse>} - Объект ответа Next.js.
 *
 * @description
 *
 *  - Проверяет наличие куки `refresh_token` или `access_token` в запросе.
 *  - Если `refresh_token` найден, обновляет `access_token` и `refresh_token`
 *  с новым временем и возвращает успешный ответ.
 *  - Если `access_token` найден, обновляет только `access_token`
 *  с новым временем и возвращает успешный ответ.
 *  - Если ни одна из куки не найдена, возвращает ошибку 403 (Forbidden).
 */
export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  // Обновление access_token и refresh_token
  if (refreshToken) {
    const response = NextResponse.json({ message: "ok" }, {
      status: 200,
    });

    const new_access_token = Date.now().toString();
    const new_refresh_token = (Date.now() * 4).toString();

    response.cookies.set('access_token', new_access_token, {
      maxAge: 3600,
      httpOnly: true,
      secure: true,
      domain: '.refresh-example.com',
      sameSite: 'lax',
    });

    response.cookies.set('refresh_token', new_refresh_token, {
      maxAge: 3600 * 24,
      httpOnly: true,
      secure: true,
      domain: 'id.refresh-example.com',
      sameSite: 'strict',
    });

    return response;
  }

  // Обновление только access_token
  if (accessToken) {
    const response = NextResponse.json({ message: "ok" }, {
      status: 200,
    });

    const new_access_token = Date.now().toString();

    response.cookies.set('access_token', new_access_token, {
      maxAge: 3600,
      httpOnly: true,
      secure: true,
      domain: '.refresh-example.com',
      sameSite: 'lax',
    });

    return response;
  }

  // Возвращение ошибки Forbidden
  return NextResponse.json({ message: "forbidden" }, { status: 403 });
}
