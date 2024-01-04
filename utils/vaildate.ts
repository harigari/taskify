export interface Obj {
  name: "email" | "password" | "passwordCheck" | "nickname";
  value: string;
}

export interface ValidateFunc {
  (obj: Obj): Obj | string;
  type: "validate";
}

const TEXT = {
  value: {
    email: "이메일을 입력해주세요.",
    password: "비밀번호를 입력해주세요.",
    passwordCheck: "확인할 비밀번호를 입력해주세요.",
    nickname: "닉네임을 입력해주세요.",
  },
  repeat: "이미 사용중인 이메일입니다.",
  reg: {
    email: "올바른 이메일 주소가 아닙니다.",
    password: "비밀번호는 영문, 숫자 조합 8자 이상 입력해주세요.",
  },
  current: "현재 비밀번호와 일치하지 않아요.",
  same: "비밀번호가 일치하지 않아요.",
};

const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const pwReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

export const isValue: ValidateFunc = (obj) => {
  if (!obj.value) return TEXT.value[obj.name];
  return obj;
};
isValue.type = "validate";

export const isReg: ValidateFunc = (obj) => {
  if (obj.name === "email") return emailReg.test(obj.value) ? obj : TEXT.reg[obj.name];
  if (obj.name === "password") return pwReg.test(obj.value) ? obj : TEXT.reg[obj.name];
  return obj;
};
isReg.type = "validate";

let temp = "";

export const isSamePassword: ValidateFunc = (obj: Obj) => {
  if (obj.name === "password") {
    temp = obj.value;
    return obj;
  }
  if (obj.name === "passwordCheck") {
    return temp === obj.value ? "" : TEXT.same;
  }
  return obj;
};
isSamePassword.type = "validate";

export const isCurrentPassword = (current: string) => {
  const returnFunc: ValidateFunc = (obj: Obj) => {
    if (obj.value === current) {
      return obj;
    }
    return TEXT.current;
  };
  returnFunc.type = "validate";

  return returnFunc;
};
