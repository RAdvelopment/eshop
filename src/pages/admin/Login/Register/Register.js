import React, { useState } from "react";
import { Form, Input, Button, notification, Row, Col } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { SignUpApi } from "../../../../api/user";
import "./Register.scss";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    lastname: "",
    contact: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const sendData = async () => {
    const { name, lastname, contact, email, password } = data;
    if (!name || !lastname || !contact || !email || !password) {
      notification["warning"]({
        message: "Los datos son obligatorios.",
      });
    } else {
      const response = await SignUpApi(data);
      console.log(response);

      if (response.code !== 200) {
        notification["warning"]({
          message: response.message,
        });
      } else {
        notification["success"]({
          message: response.message,
        });
      }
    }
  };

  return (
    <Row gutter={24} className="form-login">
      <Col md={6} />
      <Col md={12}>
        <Form onChange={onChange} onFinish={sendData}>
          <h2>Registrarse</h2>
          <Form.Item className="form-login__input">
            <Input
              name="name"
              placeholder="Nombres"
              rules={[
                { required: true, message: "Porfavor ingrese el correo" },
              ]}
            />
          </Form.Item>
          <Form.Item className="form-login__input">
            <Input
              name="lastname"
              placeholder="Apellidos"
              rules={[
                { required: true, message: "Porfavor ingrese el correo" },
              ]}
            />
          </Form.Item>
          <Form.Item className="form-login__input">
            <Input
              name="contact"
              placeholder="Número de contacto"
              rules={[
                { required: true, message: "Porfavor ingrese el correo" },
              ]}
            />
          </Form.Item>
          <Form.Item className="form-login__input">
            <Input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              rules={[
                { required: true, message: "Porfavor ingrese el correo" },
              ]}
            />
          </Form.Item>
          <Form.Item className="form-login__input">
            <Input.Password
              type="password"
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
    </Row>
  );
}
