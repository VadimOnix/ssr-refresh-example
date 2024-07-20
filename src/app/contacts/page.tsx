import styles from "@/assets/css/page.module.css";
import {Code} from "@nextui-org/code";
import {Divider} from "@nextui-org/divider";
import {Link} from "@nextui-org/react";
import CustomLink from "@/shared/components/CustomLink";

export default function Contacts() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1 className={"font-black text-xl"}>
          <Code size="md" color="secondary">/Contacts</Code>
        </h1>
        <Link></Link>
      </div>
      <Divider className="my-4"/>

      <CustomLink href={"/"} color={"primary"}>Вернуться на главную</CustomLink>
    </main>
  )
}
