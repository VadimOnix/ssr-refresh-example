import {NextRequest, NextResponse} from 'next/server';


export const middleware = (request: NextRequest) => {
  if (request.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next()
  }

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

  if (request.nextUrl.pathname.startsWith('/') && request.method === 'GET') {
    const hasAccessToken = request.cookies.has('access_token');

    if (!hasAccessToken) {
      const response = NextResponse.redirect(`https://id.refresh-example.com`)
      response.cookies.set('X-Start-Autologin', '1', {
        sameSite: 'lax',
        domain: '.refresh-example.com',
        maxAge: 100
      })
      return response
    }

    return NextResponse.next();
  }
};
