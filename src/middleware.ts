import { NextRequest, NextResponse } from 'next/server';

/**
 * Middleware для обработки запросов в Next.js 14.
 *
 * @function middleware
 * @param {NextRequest} request - Объект запроса Next.js.
 * @returns {NextResponse} - Объект ответа Next.js.
 *
 * @description
 *
 * Middleware для обработки запросов к API и перенаправления пользователей на страницу авторизации
 * если отсутствует кука `access_token`.
 *
 *  - Пропускает запросы к `/__nextjs_original-stack-frame` и `/api/auth` для корректной работы Next.js.
 *  -  Настраивает заголовки CORS для запросов к `/api/auth`.
 *  -  Перенаправляет пользователей на страницу авторизации (`https://id.refresh-example.com`)
 *  если отсутствует кука `access_token` и запрос не к API.
 */
export const middleware = (request: NextRequest) => {
  // Пропускаем запросы к `/__nextjs_original-stack-frame` (необходим для Next.js)
  if (request.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // Настройка заголовков CORS для запросов к `/api/auth`
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    const response = NextResponse.next(); // Переходим к следующему обработчику

    // Разрешаем запросы только с определенного домена
    const allowedOrigin = 'https://refresh-example.com';

    // Устанавливаем заголовки CORS
    response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');

    // Можете добавить другие необходимые заголовки CORS, например:
    // response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
  }

  // Перенаправление на авторизацию, если нет куки `access_token` и запрос не к API
  if (request.nextUrl.pathname.startsWith('/') && request.method === 'GET') {
    const hasAccessToken = request.cookies.has('access_token');

    if (!hasAccessToken) {
      const response = NextResponse.redirect(`https://id.refresh-example.com`);
      // Устанавливаем куки для автоматического входа после авторизации
      response.cookies.set('X-Start-Autologin', '1', {
        sameSite: 'lax',
        domain: '.refresh-example.com',
        maxAge: 100, // Кука будет удалена через 100 секунд
      });
      return response;
    }

    return NextResponse.next();
  }
};
