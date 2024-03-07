import request from "./index";

export const LoginAPI = (params: LoginAPIReq): Promise<LoginAPIRes> =>
  request.post("/prod-api/login", params);

export const CaptchaAPI = (): Promise<CaptchaAPIRes> =>
  request.get("/prod-api/captchaImage");
