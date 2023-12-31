import ImageInput from "@/components/ImageInput/ImageInput";
import { useState } from "react";
import styles from "./SettingProfile.module.css";
import useInputController from "@/hooks/useInputController";
import InputWrapper from "@/components/Input/InputWrapper";
import Input from "@/components/Input/Input";
import Button from "@/components/Buttons/Button/Button";
import { ExtendedUserType } from "@/types/api.type";
import { isReg, isValue } from "@/utils/vaildate";
import useApi from "@/hooks/useApi";
import { FormEvent } from "react";
import { changeImageFileToURLForUserProfile } from "@/utils/changeImageFileToURL";
import { getAccessTokenFromDocument } from "@/utils/getAccessToken";
import AlertModal from "@/modals/AlertModal";
import { useRouter } from "next/router";

interface ProfileProps {
  userData: ExtendedUserType;
}

const SettingProfile = ({ userData }: ProfileProps) => {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null | undefined>(userData?.profileImageUrl);
  const [prevNickname, setPrevNickname] = useState(userData?.nickname);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsSuccessModalOpen((prev) => !prev);
  };

  const [imageFile, setImageFile] = useState<File | null>(null);
  const { wrapper, input } = useInputController({
    errorConfig: [[isReg], [isValue]],
    inputConfig: {
      id: "nickname",
      type: "text",
      name: "nickname",
      initialvalue: userData?.nickname,
      placeholder: "닉네임을 입력해 주세요.",
    },
    labelConfig: { labelName: "닉네임" },
  });

  const { wrappedFunction: putData } = useApi("put");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const accessToken = getAccessTokenFromDocument("accessToken");

    const data: { nickname: string; imageUrl?: string } = {
      nickname: input.value,
    };

    if (imageFile === null) {
      const res = await putData({
        path: "me",
        data,
        accessToken,
      });

      if (res?.status === 200) {
        setPrevNickname(input.value);
        handleModalToggle();
        router.push("/mypage");
      }
    }

    if (imageFile !== null) {
      const profileImageUrl = await changeImageFileToURLForUserProfile(imageFile, accessToken);

      const datawithImage = { ...data, profileImageUrl };

      const res = await putData({ path: "me", data: datawithImage, accessToken });

      if (res?.status === 200) {
        setPreview(profileImageUrl);
        setPrevNickname(input.value);
        handleModalToggle();
        router.push("/mypage");
      }
    }
  };

  return (
    <article className={styles.profile}>
      <h2 className={styles.title}>프로필</h2>
      <div className={styles.info}>
        <div className={styles.info__imageinput}>
          <ImageInput initialvalue={preview} imageFile={imageFile} setImageFile={setImageFile} />
        </div>
        <div className={styles.info__nickname}>
          <label>
            <p>이메일</p>
            <input disabled placeholder={userData?.email}></input>
          </label>
          <InputWrapper {...wrapper}>
            <Input {...input} />
          </InputWrapper>
        </div>
      </div>
      <div className={styles.savebutton}>
        <Button
          buttonType="accept_reject"
          onClick={handleSubmit}
          color="violet"
          disabled={prevNickname === input.value && !imageFile}
        >
          저장
        </Button>
        {isSuccessModalOpen && (
          <AlertModal
            alertText="프로필 정보가 성공적으로 변경되었습니다."
            isDoubleButton={false}
            handleModalClose={() => {
              router.push("/mypage");
              handleModalToggle();
            }}
          />
        )}
      </div>
    </article>
  );
};

export default SettingProfile;
