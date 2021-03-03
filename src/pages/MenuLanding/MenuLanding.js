import React, { useState } from "react";
import { Menu, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";

export default function MenuLanding(props) {
  const [selected, setSelected] = useState("/");
  const [actualRoute, setActualRoute] = useState("/");

  const { dataCart } = props;

  const setKeys = (e) => {
    setSelected(e.key);
    setActualRoute(e.key);
  };

  return (
    <>
      <Menu
        mode="horizontal"
        selectedKeys={selected}
        onClick={setKeys}
        style={{ height: "50px" }}
      >
        <Menu.Item key="/">Inicio</Menu.Item>
        <Menu.Item key="login">Iniciar Sesión</Menu.Item>
        <Menu.Item key="register">Registrarse</Menu.Item>
        <Menu.Item key="shop">
          <Badge count={dataCart}>
            <ShoppingCartOutlined />
          </Badge>
        </Menu.Item>
      </Menu>
      <Redirect to={actualRoute} />
    </>
  );
}
