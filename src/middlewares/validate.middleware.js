import { signUpSchema } from "../utils/response/joi.validationSchema.js";

export const validateSignUp = (req, res, next) => {
  const { error } = signUpSchema.validate(req.body, {
    abortEarly: false, //모든 오류를 한 번에 반환
    allowUnknown: false, //알 수 없는 필드 허용 안 함
  });
  if (error) {
    const errMessages = error.details.map((detail) => ({
      field: detail.path[0],
      message: detail.message,
    }));

    return res.status(400).json({
      message: "유효성 검사 실패",
      errors: errMessages,
    });
  }
  next();
};
