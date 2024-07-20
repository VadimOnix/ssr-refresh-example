'use client'
import {Link, LinkProps} from "@nextui-org/react";
import {useRouterPush} from "@/shared/utils/useRouterPush";
import {useCallback} from "react";

export default function CustomLink(props: LinkProps) {
  const {children, onClick: originalOnClick, ...restProps} = props

  const push = useRouterPush(props.href!)

  const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (typeof originalOnClick === 'function') {
      originalOnClick(event)
    }
    if (props.href) {
      void push()
    }
  }, [originalOnClick, props.href, push])

  return (
    <Link onClick={handleClick} {...restProps}>{children}</Link>
  );
};
