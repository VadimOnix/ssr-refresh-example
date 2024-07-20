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
 * Проверяет наличие куки `access_token` в запросе.
 * - Если `access_token` найдена, возвращает успешный ответ.
 * - Если `access_token` не найдена, возвращает ошибку 401 (Unauthorized).
 */
export async function POST(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;

  if (token) {
    return NextResponse.json({ message: "ok" }, { status: 200 });
  }

  return NextResponse.json({ message: "unauthorized" }, { status: 401 });
}
