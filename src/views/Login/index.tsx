import styles from "./login.module.scss";
import initLoginBg from "./init";
import { useEffect } from "react";
import { Button, Input, Space } from "antd";
import "./login.less";
import {
  CompassOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from "@ant-design/icons";

const Login = () => {
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
              placeholder="Enter your username"
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
            <Input.Password
              placeholder="input password"
              prefix={<CompassOutlined className="site-form-item-icon" />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
            <Button type="primary" className="loginBtn" block>
              Login
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Login;
