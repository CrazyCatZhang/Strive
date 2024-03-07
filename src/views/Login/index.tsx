import styles from "./login.module.scss";
import initLoginBg from "./init";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Input, Space, message } from "antd";
import "./login.less";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import { useAppDispatch } from "@/store/hooks";
import {
  setPassword,
  setUsername,
} from "@/store/features/UserInfo/userInfoSlice";
import { CaptchaAPI, LoginAPI } from "@/request/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    captcha: "",
  });

  const [captchaImg, setCaptchaImg] = useState("");

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const inputChange = _.debounce((e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }, 500);

  const submit = async () => {
    if (!userInfo.username) {
      message.error("请输入用户名");
      return;
    }
    if (!userInfo.password) {
      message.error("请输入密码");
      return;
    }
    if (!userInfo.captcha) {
      message.error("请输入验证码");
      return;
    }
    const loginAPIRes = await LoginAPI({
      username: userInfo.username,
      password: userInfo.password,
      code: userInfo.captcha,
      uuid: localStorage.getItem("uuid") as string,
    });
    if (loginAPIRes.code === 200) {
      message.success("登录成功！");
      localStorage.setItem("react-management-token", loginAPIRes.token);
      navigate("/about");
      localStorage.removeItem("uuid");
      dispatch(setUsername(userInfo.username));
      dispatch(setPassword(userInfo.password));
    }
  };

  const getCaptchaImg = async () => {
    // fetch captcha img
    const captchaAPIRes = await CaptchaAPI();
    if (captchaAPIRes.code === 200) {
      setCaptchaImg(captchaAPIRes.img);
      localStorage.setItem("uuid", captchaAPIRes.uuid);
    }
  };

  useEffect(() => {
    initLoginBg();
    window.addEventListener("resize", initLoginBg);
    getCaptchaImg();
  }, []);

  return (
    <div className={styles.loginPage}>
      <canvas id="canvas" style={{ display: "block" }}></canvas>
      <div className={styles.loginBox + " custom-login"}>
        <div className={styles.title}>
          <h1>React&nbsp;·&nbsp;通用后台系统</h1>
          <p>Strive Everyday</p>
        </div>
        <div className="form">
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Input
              name="username"
              placeholder="Enter your username"
              prefix={<UserOutlined className="site-form-item-icon" />}
              onChange={inputChange}
            />
            <Input.Password
              name="password"
              placeholder="input password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={inputChange}
            />
            <div className="captchaBox">
              <Input
                prefix={<SendOutlined className="site-form-item-icon" />}
                name="captcha"
                placeholder="验证码"
                onChange={inputChange}
              />
              <div className="captchaImg" onClick={getCaptchaImg}>
                <img height="38" src={captchaImg} alt="" />
              </div>
            </div>
            <Button type="primary" className="loginBtn" block onClick={submit}>
              Login
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Login;
