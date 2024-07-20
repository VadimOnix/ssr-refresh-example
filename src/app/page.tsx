import styles from "@/assets/css/page.module.css";
import {Link} from "@nextui-org/react";
import {Divider} from "@nextui-org/divider";
import CardUser from "@/shared/components/CardUser";
import {Code} from "@nextui-org/code";
import {cookies} from "next/headers";
import {ToAboutButton, ToContactsButton} from "@/app/routeComponents";

export default function Home() {
  const accessToken = cookies().get('access_token')?.value;

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1 className={"font-black text-xl"}>
          Страница приложения в директории <Code size="md" color="secondary">/app</Code>
        </h1>
      </div>
      <Divider className="my-4"/>

      <div>
        <CardUser token={accessToken}/>
      </div>

      <div>
        <p>
          Перейти в сервис авторизации
          {' '}
          <Link href="https://id.refresh-example.com"><code>id.refresh-example.com</code></Link>
        </p>
      </div>
      <Divider className="my-4"/>

      <h2>Маршруты для проверки</h2>
      <div className={"flex flex-col gap-8"}>
        <ToAboutButton/>
        <ToContactsButton/>
      </div>
    </main>
  );
}
