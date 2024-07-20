'use client'

import {useEffect} from "react";

/**
 * Интерфейс для свойств компонента AutoLogin.
 * @interface AutoLoginProps
 */
interface AutoLoginProps {
  /**
   * Функция для выполнения авторизации.
   * @function loginAction
   * @returns {Promise<void>}
   */
  loginAction: () => Promise<void>;

  /**
   * Флаг, указывающий, требуется ли авторизация.
   * @property {boolean} hasAutoLogin
   */
  hasAutoLogin: boolean;
}

/**
 * Компонент для автоматической авторизации пользователя.
 * @function AutoLogin
 * @param {AutoLoginProps} props - Свойства компонента.
 * @returns {null}
 *
 * @description
 * Компонент, который выполняет авторизацию пользователя,
 * если свойство `hasAutoLogin` установлено в `true`.
*/
export default function AutoLogin({loginAction, hasAutoLogin}: AutoLoginProps) {
  useEffect(() => {
    const initLoginAction = async () => {
      await loginAction();
    };

    if (hasAutoLogin) {
      void initLoginAction(); // Выполняем авторизацию, если hasAutoLogin true
    }
  }, [hasAutoLogin]);

  return null;
};
