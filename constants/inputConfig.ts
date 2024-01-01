import { Obj, ValidateFunc, isReg, isSamePassword, isValue } from "@/utils/vaildate";

export interface Configs {
  errorConfig?: Array<[(value: string) => boolean, string] | [ValidateFunc]>;
  inputConfig: {
    id: string;
    type?: string;
    name?: Obj["name"];
    initialvalue?: string;
    eyeButton?: boolean;
    placeholder?: string | undefined;
  };
  labelConfig: {
    labelName?: string;
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
  errorConfig: [[isSamePassword], [isReg], [isValue]],
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
  errorConfig: [[isReg], [isValue]],
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
  errorConfig: [[isSamePassword], [isReg], [isValue]],
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

export const multiModalTitle = (initialvalue?: string): Configs => {
  const obj = {
    inputConfig: { id: "title", type: "text", placeholder: "제목을 입력해 주세요", initialvalue: "" },
    labelConfig: { labelName: "제목", star: true, mobile: true },
  };

  if (initialvalue) {
    obj.inputConfig.initialvalue = initialvalue;
  }

  return obj;
};

export const multiModalExplain = (initialvalue?: string): Configs => {
  const obj = {
    inputConfig: { id: "comment", type: "text", placeholder: "설명을 입력해 주세요", initialvalue: "" },
    labelConfig: { labelName: "설명", star: true, mobile: true },
  };

  if (initialvalue) {
    obj.inputConfig.initialvalue = initialvalue;
  }

  return obj;
};

export const multiModalDate = (initialvalue?: string): Configs => {
  const obj = {
    inputConfig: { id: "date", type: "text", placeholder: "날짜를 입력해 주세요", initialvalue: "" },
    labelConfig: { labelName: "마감일", mobile: true },
  };

  if (initialvalue) {
    obj.inputConfig.initialvalue = initialvalue;
  }

  return obj;
};

export const multiModalTag = (initialvalue?: string): Configs => {
  const obj = {
    inputConfig: { id: "tag", type: "text", placeholder: "입력 후 Enter", initialvalue: "" },
    labelConfig: { labelName: "태그", mobile: true },
  };

  if (initialvalue) {
    obj.inputConfig.initialvalue = initialvalue;
  }

  return obj;
};
