'use client'

import {Spinner} from "@nextui-org/spinner";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

type RedirectLoaderProps = {
  token?: string
}

const RedirectLoader = ({token}: RedirectLoaderProps) => {
  const router = useRouter();

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        router.push('https://refresh-example.com')
      }, 2500)
    }
  }, [router, token]);

  return (
    <div className={"flex items-center gap-4 "}>
      <Spinner/>
      <p>Вы будете перенаправлены на <i>refresh-example.com</i></p>
    </div>
  );
};

export default RedirectLoader;
