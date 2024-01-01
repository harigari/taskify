import Input from "@/components/Input/Input";
import InputWrapper from "@/components/Input/InputWrapper";
import Button from "@/components/Buttons/Button/Button";
import { signinPassword, mypageCurrentPassword, mypageNewPasswordCheck } from "@/constants/inputConfig";
import useInputController from "@/hooks/useInputController";
import { isCurrentPassword, isValue } from "@/utils/vaildate";
import { mypageNewPassword } from "../../../constants/inputConfig";
import styles from "./SettingPassword.module.css";
import useApi from "@/hooks/useApi";
import { useState } from "react";
import AlertModal from "@/modals/AlertModal";
import { getAccessTokenFromDocument } from "@/utils/getAccessToken";
const SettingPassword = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  const { wrapper: currentWrapper, input: currentInput } = useInputController(mypageCurrentPassword);
  const { wrapper: passwordWrapper, input: passwordInput } = useInputController(mypageNewPassword);
  const { wrapper: passwordCheckWrapper, input: passwordCheckInput } = useInputController(mypageNewPasswordCheck);

  const inputs: Array<[typeof currentWrapper, typeof currentInput]> = [
    [currentWrapper, currentInput],
    [passwordWrapper, passwordInput],
    [passwordCheckWrapper, passwordCheckInput],
  ];

  const { pending, wrappedFunction: putData } = useApi("put");
  const handleSubmit = async () => {
    if (pending) {
      return;
    }
    const accessToken = getAccessTokenFromDocument("accessToken");
    const res = await putData({
      path: "passwordChange",
      data: {
        password: currentInput.value,
        newPassword: passwordInput.value,
      },
      accessToken,
    });
    // if (res?.status === 204) {
    //   handleModalToggle();
    //   return;
    // }

    if (res?.status === 204) {
    }
  };

  return (
    <article className={styles.container}>
      <h2 className={styles.title}>비밀번호 변경</h2>
      {inputs.map(([wrapper, input], index) => {
        return (
          <InputWrapper {...wrapper} key={index}>
            <Input {...input} />
          </InputWrapper>
        );
      })}
      <div className={styles.savebutton}>
        <Button
          buttonType="accept_reject"
          color="violet"
          disabled={inputs.some(([wrapper, input]) => {
            return !!wrapper.errorText || !input.value;
          })}
          onClick={handleSubmit}
        >
          변경
        </Button>
        {isModalOpen && <AlertModal alertText="현재 비밀번호가 틀렸습니다" handleModalClose={handleModalToggle} />}
      </div>
    </article>
  );
};

export default SettingPassword;
