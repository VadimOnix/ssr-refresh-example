'use client'

import {Button} from "@nextui-org/react";
import {useRouterPush} from "@/shared/utils/useRouterPush";
import {useRouter} from "next/navigation";

export function ToAboutButton() {
  const pushToAbout = useRouterPush('/about')
  return (
    <Button onClick={pushToAbout} color="primary">Перейти на
      страницу <b>/about</b> используя <i>useRouterPush()</i></Button>
  )
}

export function ToContactsButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.push('/contacts')} color="primary">Перейти на
      страницу <b>/contacts</b> используя <i>router.push()</i></Button>
  )
}
