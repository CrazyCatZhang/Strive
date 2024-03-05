import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "About",
    key: "/about",
    icon: <PieChartOutlined />,
  },
  {
    label: "User",
    key: "/user",
    icon: <UserOutlined />,
  },
  {
    label: "Desktop",
    key: "sub1",
    icon: <DesktopOutlined />,
    children: [
      {
        label: "Tom",
        key: "3",
      },
      {
        label: "Bill",
        key: "4",
      },
      {
        label: "Alex",
        key: "5",
      },
    ],
  },
  {
    label: "Team",
    key: "sub2",
    icon: <TeamOutlined />,
    children: [
      {
        label: "Team 1",
        key: "6",
      },
      {
        label: "Team 2",
        key: "8",
      },
    ],
  },
  {
    label: "Files",
    key: "9",
    icon: <FileOutlined />,
  },
];
const MainMenu = () => {
  const [openKeys, setOpenKeys] = useState([""]);

  const navigate = useNavigate();

  const currentPath = useLocation().pathname;

  const itemSelect = (e: { key: string }) => {
    navigate(e.key);
  };

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys([keys[keys.length - 1]]);
  };

  useEffect(() => {
    const paths = currentPath.split("/");
    if (paths.length > 2) {
      setOpenKeys([`/${paths[1]}`]);
    }
  }, [currentPath]);

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[currentPath]}
      mode="inline"
      items={items}
      onClick={itemSelect}
      onOpenChange={handleOpenChange}
      openKeys={openKeys}
    />
  );
};

export default MainMenu;
