import React, { useState, useEffect } from "react";
import { Menu, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function MenuLanding({ reload }) {
  const [dataArray, setDataArray] = useState([]);

  const dataLocal = localStorage.getItem("cartData");

  useEffect(() => {
    if (dataLocal) {
      var dataSplit = dataLocal.split(",");
      setDataArray(dataSplit);
    }
  }, [reload, dataLocal]);

  return (
    <>
      <Menu
        mode="horizontal"
        selectedKeys={window.location.pathname}
        style={{ height: "50px" }}
      >
        <Menu.Item key="/">
          <Link to={"/"}>Inicio</Link>
        </Menu.Item>
        <Menu.Item key="/login">
          <Link to={"/login"}>Iniciar Sesión</Link>
        </Menu.Item>
        <Menu.Item key="/register">
          <Link to={"/register"}>Registrarse</Link>
        </Menu.Item>
        <Menu.Item key="/shop">
          <Link to={"/shop"}>
            <Badge count={dataArray.length}>
              <ShoppingCartOutlined />
            </Badge>
          </Link>
        </Menu.Item>
      </Menu>
    </>
  );
}
