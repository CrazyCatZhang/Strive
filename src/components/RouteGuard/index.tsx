import { useEffect } from "react";
import { useNavigate, useLocation, useRoutes } from "react-router-dom";
import { message } from "antd";
import routes from "@/router";

const RouterGuard = () => {
  const isLoggedIn = localStorage.getItem("react-management-token");
  const location = useLocation();
  const navigate = useNavigate();
  const outlet = useRoutes(routes);

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== "/login") {
      message.error("请先登录！");
      navigate("/login", { state: { from: location }, replace: true });
    } else if (isLoggedIn && location.pathname === "/login") {
      message.warning("您已登录！");
      navigate("/about", { state: { from: location }, replace: true });
    }
  }, [isLoggedIn, location, navigate]);

  return outlet;
};

export default RouterGuard;
