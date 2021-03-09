import React, { useState } from "react";
import { Menu } from "antd";
import { PoweroffOutlined, HomeOutlined } from "@ant-design/icons";
import { Route, Redirect, Switch } from "react-router-dom";

import "./AdminPage.scss";

const { Item } = Menu;

export default function AdminPage(props) {
  const [selected, setSelected] = useState("/admin/products");
  const [actualRoute, setActualRoute] = useState("/admin/products");

  const { routes } = props;

  const setHref = (e) => {
    setSelected(e.key);
    setActualRoute(e.key);
  };

  const tokenApi = localStorage.getItem("accessToken");

  const off = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
  };

  return (
    <div>
      <Menu
        mode="horizontal"
        theme="dark"
        className="menu-admin"
        onClick={setHref}
        selectedKeys={selected}
      >
        <Item key="/">
          <HomeOutlined />
        </Item>
        <Item className="menu-admin__item" key="/admin/products">
          Productos
        </Item>
        <Item className="menu-admin__item" key="/admin/users">
          Usuarios
        </Item>
        <Item className="menu-admin__item" key="/admin/selled">
          Productos Vendidos
        </Item>
        <Item className="menu-admin__off" onClick={off}>
          <PoweroffOutlined />
        </Item>
      </Menu>
      <LoadRoutes routes={routes} />
      <Route exact path="/admin/products">
        {tokenApi ? (
          <Redirect to="/admin/products" />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Redirect to={actualRoute} />
    </div>
  );
}

function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
