'use client'
import {useEffect} from "react";

/**
 * Hook, который обновляет токен авторизации при возврате пользователя на страницу.
 *
 * При каждом переключении на вкладку, где находится страница, hook проверяет валидность
 * текущего токена авторизации. Если токен невалидный, hook пытается обновить его.
 *
 * @example
 * import {useRefreshOnVisible} from './useRefreshOnVisible';
 *
 * function MyComponent() {
 *   useRefreshOnVisible();
 *   // ...
 * }
 */
export const useRefreshOnVisible = () => {
  useEffect(() => {
    const refreshOnVisible = async () => {
      const abortController = new AbortController()

      if (document.visibilityState === 'visible') {
        // Страница стала видимой
        // Проверка валидности токена
        const validateResponse = await fetch('https://id.refresh-example.com/api/auth/token/validate', {
          method: 'POST',
          signal: abortController.signal,
          credentials: 'include'
        });

        if (!validateResponse.ok) {
          // Если токен невалидный, пытаемся обновить его
          const refreshResponse = await fetch('https://id.refresh-example.com/api/auth/token/refresh', {
            method: 'POST',
            signal: abortController.signal,
            credentials: 'include'
          });
        }
      }
    }
    document.addEventListener('visibilitychange', refreshOnVisible)
    return () => document.removeEventListener('visibilitychange', refreshOnVisible)
  }, [])
}
