import "@/assets/css/globals.css"
import styles from "@/assets/css/page.module.css";
import {cookies} from "next/headers";
import {Code} from "@nextui-org/code";
import {Divider} from "@nextui-org/divider";
import {Button, Link, Snippet} from "@nextui-org/react";
import RedirectLoader from "./RedirectLoader";
import {NextRequest} from "next/server";
import {authorize} from "./actions";
import AutoLogin from "@/shared/components/AutoLogin";


export default async function IdPage(request: NextRequest) {
  const accessToken = cookies().get('access_token')?.value;
  const refreshToken = cookies().get('refresh_token')?.value;
  const hasAutoLogin = cookies().has('X-Start-Autologin')

  return (
    <main className={styles.main}>

      <AutoLogin loginAction={authorize} hasAutoLogin={hasAutoLogin}/>

      <div className={"flex flex-col items-center gap-8"}>
        <h1 className={"font-black"}>Сервис авторизации <Code size="md" color="secondary">id.refresh-example.com</Code>
        </h1>

        <Link href={"https://refresh-example.com"}>Вернуться в основное приложение</Link>

        {
          hasAutoLogin
            ? <Code size="md" color="warning">Осуществляется автовход!</Code>
            : <Code size="md" color="primary">Осуществляется авторизованный ручной вход</Code>
        }

      </div>
      <Divider className="my-4"/>
      <form action={authorize} className={"flex gap-8"}>
        {
          accessToken
            ? <RedirectLoader token={accessToken}/>
            : <Button type={"submit"}>Авторизоваться</Button>
        }
      </form>
      <div className={"pt-8 flex flex-col gap-8"}>
        <div>
          <p className={"font-black inline-block"}>Access Token:</p> <Snippet>{accessToken}</Snippet>
        </div>
        <div>
          <p className={"font-black inline-block"}>Refresh Token:</p> <Snippet>{refreshToken}</Snippet>
        </div>
      </div>
    </main>
  );
}
