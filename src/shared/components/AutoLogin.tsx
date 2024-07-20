'use client'

import {useEffect} from "react";

type AutoLoginProps = {
  loginAction: () => Promise<void>;
  hasAutoLogin: boolean
}

export default function AutoLogin({loginAction, hasAutoLogin}: AutoLoginProps) {
  useEffect(() => {
    const initLoginAction = async () => {
      await loginAction()
    }

    if (hasAutoLogin) {
      void initLoginAction();
    }
  }, [hasAutoLogin])

  return null;
};

