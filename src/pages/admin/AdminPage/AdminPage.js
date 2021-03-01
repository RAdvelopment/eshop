import React from "react";
import { Menu } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import { Route, Redirect } from "react-router-dom";

import "./AdminPage.scss";

const { Item } = Menu;

export default function AdminPage() {
  const tokenApi = localStorage.getItem("accessToken");

  const off = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
  };

  return (
    <div>
      <Menu mode="horizontal" theme="dark" className="menu-admin">
        <Item className="menu-admin__item">Productos</Item>
        <Item className="menu-admin__item">Usuarios</Item>
        <Item className="menu-admin__off" onClick={off}>
          <PoweroffOutlined />
        </Item>
      </Menu>
      <h1>Administración</h1>
      <Route exact path="/admin">
        {tokenApi ? <Redirect to="/admin" /> : <Redirect to="/login" />}
      </Route>
    </div>
  );
}
