import Input from "@/components/Input/Input";
import InputWrapper from "@/components/Input/InputWrapper";
import Button from "@/components/Buttons/Button/Button";
import { signinEmail, signinPassword } from "@/constants/inputConfig";
import useInputController from "@/hooks/useInputController";
import Image from "next/image";
import Link from "next/link";
import styles from "./signin.module.css";
import { FormEvent, useRef } from "react";
import sender from "@/apis/sender";
import { useRouter } from "next/router";

type RefProps = "email" | "nickname" | "password" | "passwordCheck";
type RefValue = HTMLElement | null;
type Ref = {
  [key in RefProps]: RefValue;
};

const Signin = () => {
  const inputRef = useRef<Ref>({ email: null, nickname: null, password: null, passwordCheck: null });
  const { wrapper: emailWrapper, input: emailInput } = useInputController(signinEmail);
  const { wrapper: passwordWrapper, input: passwordInput } = useInputController(signinPassword);
  const inputs: Array<[typeof emailWrapper, typeof emailInput]> = [
    [emailWrapper, emailInput],
    [passwordWrapper, passwordInput],
  ];
  const router = useRouter();

  const isError = () => {
    return inputs.some(([wrapper, input]) => {
      return !!wrapper.errorText || !input.value;
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (const input of Object.values(inputRef.current)) {
      if (!input) continue;
      input.focus();
      input.blur();
    }

    const signData = {
      email: emailInput.value,
      password: passwordInput.value,
    };

    const signinRes = await sender.post({ path: "signin", data: signData });
    if (!signinRes) return;

    const errorMessage = signinRes.message;
    if (signinRes.status > 300 && errorMessage) {
      emailWrapper.setErrorText(errorMessage);
      return;
    }

    if (signinRes.status === 201) {
      document.cookie = `accessToken=${signinRes.data.accessToken}`;
      router.push("/mydashboard");
      return;
    }
  };

  return (
    <div className={styles.container}>
      <Image priority width={200} height={279} src="/images/logo-purple-vertical.png" alt="이전 페이지로 돌아갑니다." />
      <p className={styles.title}>오늘도 만나서 반가워요!</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        {inputs.map(([wrapper, input], index) => {
          return (
            <InputWrapper {...wrapper} key={index}>
              <Input inputRef={inputRef} {...input} />
            </InputWrapper>
          );
        })}
        <Button buttonType="login" color="violet" disabled={isError()}>
          로그인
        </Button>
      </form>
      <p className={styles.link__text}>
        회원이 아니신가요? <Link href="/signup">회원가입하기</Link>
      </p>
    </div>
  );
};

export default Signin;
