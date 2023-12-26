import Input from "@/components/Input/Input";
import InputWrapper from "@/components/Input/InputWrapper";
import Button from "@/components/buttons/Button/Button";
import { signupEmail, signupNickname, signupPassword, signupPasswordCheck } from "@/constants/inputConfig";
import useInputController from "@/hooks/useInputController";
import Image from "next/image";
import Link from "next/link";
import styles from "./signup.module.css";

const Signup = () => {
  const { wrapper: emailWrapper, input: emailInput } = useInputController(signupEmail);
  const { wrapper: nicknameWrapper, input: nicknameInput } = useInputController(signupNickname);
  const { wrapper: passwordWrapper, input: passwordInput } = useInputController(signupPassword);
  const { wrapper: passwordCheckWrapper, input: passwordCheckInput } = useInputController(signupPasswordCheck);
  const inputs: Array<[typeof emailWrapper, typeof emailInput]> = [
    [emailWrapper, emailInput],
    [nicknameWrapper, nicknameInput],
    [passwordWrapper, passwordInput],
    [passwordCheckWrapper, passwordCheckInput],
  ];

  return (
    <div className={styles.container}>
      <Image priority width={200} height={279} src="/images/logo-purple-vertical.png" alt="이전 페이지로 돌아갑니다." />
      <p className={styles.title}>첫 방문을 환영합니다!</p>
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
          가입하기
        </Button>
      </form>
      <p className={styles.link__text}>
        이미 가입하셨나요? <Link href="/signin">로그인하기</Link>
      </p>
    </div>
  );
};

export default Signup;
