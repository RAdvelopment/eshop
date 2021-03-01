import React, { useState } from "react";
import { Form, Input, Button, notification, Row, Col } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";
import { Redirect, Route } from "react-router-dom";
import { SignInApi } from "../../../api/user";
import "./Login.scss";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const tokenApi = localStorage.getItem("accessToken");

  const onChangeData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const login = async () => {
    const result = await SignInApi(data);
    if (result.code !== 200) {
      notification["error"]({
        message: result.message,
      });
    } else {
      const { accessToken, refreshToken } = result;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);

      notification["success"]({
        message: "Datos correctos...",
      });

      window.location.href = "/admin";
    }
  };

  return (
    <Row gutter={24} className="form-login">
      <Col md={6} />
      <Col md={12}>
        <Form onChange={onChangeData} onFinish={login}>
          <h2>Iniciar sesión</h2>
          <Form.Item className="form-login__input">
            <Input
              name="email"
              placeholder="Correo electrónico"
              rules={[
                { required: true, message: "Porfavor ingrese el correo" },
              ]}
            />
          </Form.Item>
          <Form.Item className="form-login__input">
            <Input.Password
              name="password"
              placeholder="Contraseña"
              rules={[
                { required: true, message: "Porfavor ingrese el correo" },
              ]}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Ingresar</Button>
          </Form.Item>
        </Form>
      </Col>
      <Col md={6} />
      <Route exact path="/login">
        {tokenApi ? <Redirect to="/admin" /> : <Redirect to="/login" />}
      </Route>
    </Row>
  );
}
