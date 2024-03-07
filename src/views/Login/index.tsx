import styles from "./login.module.scss";
import initLoginBg from "./init";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Input, Space } from "antd";
import "./login.less";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import { useAppDispatch } from "@/store/hooks";
import {
  setPassword,
  setUsername,
} from "@/store/features/UserInfo/userInfoSlice";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const dispatch = useAppDispatch();

  const inputChange = _.debounce((e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }, 500);

  const submit = () => {
    dispatch(setUsername(userInfo.username));
    dispatch(setPassword(userInfo.password));
  };

  useEffect(() => {
    initLoginBg();
    window.addEventListener("resize", initLoginBg);
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
