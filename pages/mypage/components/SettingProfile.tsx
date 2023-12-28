import ImageInput from "@/components/ImageInput/ImageInput";
import { useState } from "react";
import styles from "./SettingProfile.module.css";
import useInputController from "@/hooks/useInputController";
import { signinEmail, signupNickname } from "@/constants/inputConfig";
import InputWrapper from "@/components/Input/InputWrapper";
import Input from "@/components/Input/Input";
import Button from "@/components/buttons/Button/Button";

const SettingProfile = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { wrapper, input } = useInputController(signupNickname);

  return (
    <article className={styles.profile}>
      <h2 className={styles.title}>프로필</h2>
      <div className={styles.info}>
        <div className={styles.info__imageinput}>
          <ImageInput imageFile={imageFile} setImageFile={setImageFile} />
        </div>
        <div className={styles.info__nickname}>
          <label>
            <p>이메일</p>
            <input disabled placeholder="test@example.com"></input>
          </label>
          <InputWrapper {...wrapper}>
            <Input {...input} />
          </InputWrapper>
        </div>
      </div>
      <div className={styles.savebutton}>
        <Button buttonType="accept_reject" color="violet" disabled={!!wrapper.errorText || !input.value}>
          저장
        </Button>
      </div>
    </article>
  );
};

export default SettingProfile;
