import styles from "@/assets/css/page.module.css";
import {Code} from "@nextui-org/code";
import {Divider} from "@nextui-org/divider";
import CustomLink from "@/shared/components/CustomLink";

export default function About() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1 className={"font-black text-xl"}>
          <Code size="md" color="secondary">/About</Code>
        </h1>
      </div>
      <Divider className="my-4"/>

      <CustomLink href={"/"} color={"primary"}>Вернуться на главную</CustomLink>
    </main>
  );
};
