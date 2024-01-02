import Input from "@/components/Input/Input";
import InputWrapper from "@/components/Input/InputWrapper";
import Button from "@/components/Buttons/Button/Button";
import {
  mypageCurrentPassword as myPageCurrentPassword,
  mypageNewPasswordCheck as myPageNewPasswordCheck,
} from "@/constants/inputConfig";
import useInputController from "@/hooks/useInputController";

import { mypageNewPassword as myPageNewPassword } from "../../../constants/inputConfig";
import styles from "./SettingPassword.module.css";
import useApi from "@/hooks/useApi";
import { useState } from "react";
import AlertModal from "@/modals/AlertModal";
import { getAccessTokenFromDocument } from "@/utils/getAccessToken";
const SettingPassword = () => {
  const [isWrongPasswordModalOpen, setIsWrongPasswordModalOpen] = useState(false);
  const handleWrongPasswordModalToggle = () => {
    setIsWrongPasswordModalOpen((prev) => !prev);
  };
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSuccessModalToggle = () => {
    setIsSuccessModalOpen((prev) => !prev);
  };
  const { wrapper: currentWrapper, input: currentInput } = useInputController(myPageCurrentPassword);
  const { wrapper: passwordWrapper, input: passwordInput } = useInputController(myPageNewPassword);
  const { wrapper: passwordCheckWrapper, input: passwordCheckInput } = useInputController(myPageNewPasswordCheck);

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
    if (res?.status === 400) {
      handleWrongPasswordModalToggle();
      // currentWrapper.setErrorText(res?.message);
      return;
    }

    if (res?.status === 204) {
      currentInput.setValue("");
      passwordInput.setValue("");
      passwordCheckInput.setValue("");
      handleSuccessModalToggle();
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
        {isWrongPasswordModalOpen && (
          <AlertModal
            alertText="현재 비밀번호가 틀렸습니다."
            isDoubleButton={false}
            handleModalClose={handleWrongPasswordModalToggle}
          />
        )}
        {isSuccessModalOpen && (
          <AlertModal
            alertText="비밀번호가 성공적으로 변경되었습니다."
            isDoubleButton={false}
            handleModalClose={handleSuccessModalToggle}
          />
        )}
      </div>
    </article>
  );
};

export default SettingPassword;
