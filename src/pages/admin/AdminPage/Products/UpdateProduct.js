import React, { useState } from "react";
import { Form, Button, notification, Input } from "antd";

export default function UpdateProduct() {
  const [dataForm, setDataForm] = useState({
    title: "",
    description: "",
    quantity: "",
    price: "",
    img: "",
  });

  const updateProduct = (id) => {
    if (!id) {
      notification["warning"]({
        message:
          "Los datos son obligatorios, no deje datos vacios o puede generar errores.",
      });
    }
  };

  return (
    <Form onFinish={console.log("updated")}>
      <Form.Item>
        <Input
          value={dataForm.title}
          onChange={(e) => setDataForm({ ...dataForm, title: e.target.value })}
          placeholder="Título del producto"
        />
      </Form.Item>
      <Form.Item>
        <Input
          value={dataForm.description}
          onChange={(e) =>
            setDataForm({ ...dataForm, description: e.target.value })
          }
          placeholder="Descripción del producto"
        />
      </Form.Item>
      <Form.Item>
        <Input
          value={dataForm.quantity}
          onChange={(e) =>
            setDataForm({ ...dataForm, quantity: e.target.value })
          }
          placeholder="Cantidad de productos disponibles"
        />
      </Form.Item>
      <Form.Item>
        <Input
          value={dataForm.price}
          onChange={(e) => setDataForm({ ...dataForm, price: e.target.value })}
          placeholder="Precio"
        />
      </Form.Item>
      <Form.Item>
        <Input
          value={dataForm.img}
          onChange={(e) => setDataForm({ ...dataForm, img: e.target.value })}
          placeholder="Url de la imágen del producto"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" style={{ width: "100%" }} htmlType="submit">
          Enviar datos
        </Button>
      </Form.Item>
    </Form>
  );
}
