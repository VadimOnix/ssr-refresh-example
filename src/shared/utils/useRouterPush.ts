import {useRouter} from 'next/navigation'
import {useCallback, useRef} from "react";


type Router = ReturnType<typeof useRouter>

type PushParams = Parameters<Router['push']>

/**
 * Кастомный хук для перенаправления пользователя с проверкой и обновлением токена.
 *
 * @function useRouterPush
 *
 * @param {PushParams} params - Параметры для перенаправления, аналогичные `router.push`.
 *
 * @returns {Function} Функция, вызывающая перенаправление.
 */
export const useRouterPush = (...params: PushParams) => {
  const router = useRouter()
  // Храним ссылку на AbortController
  const abortControllerRef = useRef<AbortController | null>(null);

  return useCallback(async () => {
    // Отменяем предыдущий запрос, если он есть
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Создаем новый AbortController для текущего запроса
    abortControllerRef.current = new AbortController();

    try {
      // Проверка валидности токена
      const validateResponse = await fetch('https://id.refresh-example.com/api/auth/token/validate', {
        method: 'POST',
        signal: abortControllerRef.current.signal,
        credentials: 'include'
      });

      if (!validateResponse.ok) {
        // Если токен невалидный, пытаемся обновить его
        const refreshResponse = await fetch('https://id.refresh-example.com/api/auth/token/refresh', {
          method: 'POST',
          signal: abortControllerRef.current.signal,
          credentials: 'include'
        });

        if (!refreshResponse.ok) {
          // Если обновление токена не удалось, перенаправляем на страницу авторизации
          router.push('https://id.refresh-example.com');
          return;
        }
      }

      // Если токен валидный или обновлен, выполняем перенаправление
      router.push(...params);
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Ошибка при проверке или обновлении токена:', error);
        // Дополнительная обработка ошибок, например, отображение сообщения пользователю
      }
    }
  }, [params, router])
}

