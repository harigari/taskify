import LoginButton from "@/components/buttons/LoginButton";

import PrimaryButton2 from "@/components/buttons/PrimaryButton2";
import PrimaryButton from "@/components/buttons/PrimaryButton";

export default function Home() {
  return (
    <>
      {/* <LoginButton disabled={false}>로그인</LoginButton> */}

      <PrimaryButton size="full" disabled>
        로그인
      </PrimaryButton>
      <div>ddddd</div>
      <PrimaryButton size="large">확인</PrimaryButton>
      <div>ddddd</div>
      <PrimaryButton size="small">확인</PrimaryButton>
    </>
  );
}
