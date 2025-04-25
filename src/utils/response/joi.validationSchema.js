import Joi from "joi";

//회원가입 유효성 검사 스키마
export const signUpSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } }) // com, net 등 최상위 도메인 검사 안함
    .required()
    .messages({
      "string.email": `이메일 형식이 올바르지 않습니다.`,
      "any.required": `이메일을 입력해주세요.`,
    }),
  password: Joi.string()
    .pattern(new RegExp(`^(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$`))
    .required()
    .messages({
      "string.pattern.base": `비밀번호는 8~20자 ,최소 1개씩의 영문 소문자, 숫자, 특수문자 가 포함되어야 합니다.`,
      "any.required": `비밀번호를 입혁해주세요.`,
    }),
  passwordCheck: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": `비밀번호가 일치하지 않습니다.`,
    "any.required": `비밀번호 확인을 입력해주세요.`,
  }),
  userName: Joi.string()
    .min(2)
    .max(10)
    .pattern(new RegExp("^[가-힣a-zA-Z0-9]+$"))
    .required()
    .messages({
      "string.min": `이름은 최소 2자 이상이어야 합니다.`,
      "string.max": `이름은 최대 10자까지 가능합니다.`,
      "string.pattern.base": `이름은 한글, 영문, 숫자만 가능합니다.`,
      "any.required": `이름을 입력해주세요.`,
    }),
});
