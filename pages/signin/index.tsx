import Input from "@/components/Input/Input";
import InputWrapper from "@/components/Input/InputWrapper";
import Button from "@/components/buttons/Button/Button";
import useInputController from "@/hooks/useInputController";
import Image from "next/image";
import styles from "./signin.module.css";
import Link from "next/link";

const Signin = () => {
  const { wrapper: emailWrapper, input: emailInput } = useInputController({
    errorConfig: [[true, "값을 입력해주세요."]],
    inputConfig: { id: "email__input", type: "email", placeholder: "이메일을 입력해 주세요." },
    labelConfig: { labelName: "이메일" },
  });
  const { wrapper: passwordWrapper, input: passwordInput } = useInputController({
    errorConfig: [[true, "값을 입력해주세요."]],
    inputConfig: { id: "password__input", type: "password", placeholder: "비밀번호를 입력해 주세요.", eyeButton: true },
    labelConfig: { labelName: "비밀번호" },
  });

  return (
    <div className={styles.container}>
      <Image width={200} height={279} src="/images/logo-purple-vertical.png" alt="이전 페이지로 돌아갑니다." />
      <p className={styles.title}>오늘도 만나서 반가워요!</p>
      <form className={styles.form}>
        <InputWrapper {...emailWrapper}>
          <Input {...emailInput} />
        </InputWrapper>
        <InputWrapper {...passwordWrapper}>
          <Input {...passwordInput} />
        </InputWrapper>
        <Button buttonType="login" color="violet" disabled={!!emailWrapper.errorText || !!passwordWrapper.errorText}>
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
