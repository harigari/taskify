import Input from "@/components/Input/Input";
import InputWrapper from "@/components/Input/InputWrapper";
import Button from "@/components/buttons/Button/Button";
import { signinEmail, signinPassword } from "@/constants/inputConfig";
import useInputController from "@/hooks/useInputController";
import Image from "next/image";
import Link from "next/link";
import styles from "./signin.module.css";

const Signin = () => {
  const { wrapper: emailWrapper, input: emailInput } = useInputController(signinEmail);
  const { wrapper: passwordWrapper, input: passwordInput } = useInputController(signinPassword);
  const inputs: Array<[typeof emailWrapper, typeof emailInput]> = [
    [emailWrapper, emailInput],
    [passwordWrapper, passwordInput],
  ];

  return (
    <div className={styles.container}>
      <Image priority width={200} height={279} src="/images/logo-purple-vertical.png" alt="이전 페이지로 돌아갑니다." />
      <p className={styles.title}>오늘도 만나서 반가워요!</p>
      <form className={styles.form}>
        {inputs.map(([wrapper, input], index) => {
          return (
            <InputWrapper {...wrapper} key={index}>
              <Input {...input} />
            </InputWrapper>
          );
        })}
        <Button
          buttonType="login"
          color="violet"
          disabled={inputs.some(([wrapper, input]) => {
            return !!wrapper.errorText || !input.value;
          })}
        >
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
