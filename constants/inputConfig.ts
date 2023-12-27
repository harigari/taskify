import { Obj, ValidateFunc, isCurrentPassword, isReg, isSamePassword, isValue } from "@/utils/vaildate";

export interface Configs {
  errorConfig?: Array<[(value: string) => boolean, string] | [ValidateFunc]>;
  inputConfig: {
    id: string;
    type?: string;
    name?: Obj["name"];
    eyeButton?: boolean;
    placeholder?: string | undefined;
  };
  labelConfig: {
    labelName: string;
    mobile?: boolean;
    star?: boolean;
  };
}

export const signinEmail: Configs = {
  errorConfig: [[isReg], [isValue]],
  inputConfig: { id: "email", type: "email", name: "email", placeholder: "이메일을 입력해 주세요." },
  labelConfig: { labelName: "이메일" },
};

export const signinPassword: Configs = {
  errorConfig: [[isReg], [isValue]],
  inputConfig: {
    id: "password",
    type: "password",
    name: "password",
    placeholder: "비밀번호를 입력해 주세요.",
    eyeButton: true,
  },
  labelConfig: { labelName: "비밀번호" },
};

export const signupEmail: Configs = {
  errorConfig: [[isReg], [isValue]],
  inputConfig: { id: "email", type: "email", name: "email", placeholder: "이메일을 입력해 주세요." },
  labelConfig: { labelName: "이메일" },
};

export const signupNickname: Configs = {
  errorConfig: [[isReg], [isValue]],
  inputConfig: {
    id: "nickname",
    type: "text",
    name: "nickname",
    placeholder: "닉네임을 입력해 주세요.",
  },
  labelConfig: { labelName: "닉네임" },
};

export const signupPassword: Configs = {
  errorConfig: [[isSamePassword], [isReg], [isValue]],
  inputConfig: {
    id: "password",
    type: "password",
    name: "password",
    placeholder: "비밀번호를 입력해 주세요.",
    eyeButton: true,
  },
  labelConfig: { labelName: "비밀번호" },
};

export const signupPasswordCheck: Configs = {
  errorConfig: [[isSamePassword], [isValue]],
  inputConfig: {
    id: "passwordCheck",
    type: "password",
    name: "passwordCheck",
    placeholder: "비밀번호를 입력해 주세요.",
    eyeButton: true,
  },
  labelConfig: { labelName: "비밀번호 확인" },
};

export const mypageCurrentPassword: Configs = {
  errorConfig: [],
  inputConfig: {
    id: "current__password",
    type: "password",
    name: "password",
    placeholder: "현재 비밀번호를 입력해 주세요.",
    eyeButton: true,
  },
  labelConfig: { labelName: "현재 비밀번호" },
};

export const mypageNewPassword: Configs = {
  errorConfig: [[isReg], [isValue]],
  inputConfig: {
    id: "new__password",
    type: "password",
    name: "password",
    placeholder: "새로운 비밀번호를 입력해 주세요.",
    eyeButton: true,
  },
  labelConfig: { labelName: "새로운 비밀번호" },
};

export const mypageNewPasswordCheck: Configs = {
  errorConfig: [[isSamePassword], [isReg], [isValue]],
  inputConfig: {
    id: "new__passwordCheck",
    type: "password",
    name: "passwordCheck",
    placeholder: "새로운 비밀번호를 입력해 주세요.",
    eyeButton: true,
  },
  labelConfig: { labelName: "새로운 비밀번호 확인" },
};
