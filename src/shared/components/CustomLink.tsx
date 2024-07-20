'use client'
import { Link, LinkProps } from "@nextui-org/react";
import { useRouterPush } from "@/shared/utils/useRouterPush";
import { useCallback } from "react";

/**
 * Кастомная ссылка, которая использует useRouterPush для перехода с проверкой токена.
 *
 * @function CustomLink
 * @param {LinkProps} props - Свойства ссылки, аналогичные `Link` из `@nextui-org/react`.
 * @returns {JSX.Element} - Компонент `Link` с обновленным обработчиком клика.
 *
 * @description
 * Этот компонент переопределяет обработчик клика (`onClick`) компонента `Link` из `@nextui-org/react`,
 * чтобы использовать `useRouterPush` для перехода по ссылке с проверкой токена.
 *
 * @example
 *
 * // В файле components/MyComponent.tsx
 * import CustomLink from './CustomLink';
 *
 * const MyComponent = () => {
 *   return (
 *     <div>
 *       <CustomLink href="/profile">Профиль</CustomLink>
 *     </div>
 *   );
 * };
 */
export default function CustomLink(props: LinkProps) {
  const { children, onClick: originalOnClick, ...restProps } = props;

  const push = useRouterPush(props.href!);

  // Объединяем обработчик клика с помощью `useCallback` для оптимизации
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault(); // Предотвращаем стандартное поведение ссылки
      if (typeof originalOnClick === "function") {
        originalOnClick(event); // Вызываем оригинальный обработчик, если он есть
      }
      if (props.href) {
        void push(); // Вызываем useRouterPush для перехода
      }
    },
    [originalOnClick, props.href, push] // Зависимости для `useCallback`
  );

  return <Link onClick={handleClick} {...restProps}>{children}</Link>;
}
