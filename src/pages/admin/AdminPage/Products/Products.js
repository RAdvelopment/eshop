import React, { useState, useEffect } from "react";
import { List, Avatar, Button, notification, Spin, Input, Form } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  getProductApi,
  deleteProductApi,
  createProductApi,
} from "../../../../api/product";
import Modal from "../../../../components/Modal";

export default function Products() {
  const [dataApi, setDataApi] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    getProductApi().then((response) => {
      if (response?.code !== 200) {
        notification["warning"]({
          message: response.message,
        });
      } else {
        const productsData = response.products;
        setDataApi(productsData);
      }
    });
  }, [dataApi]);

  const deleteProduct = (id) => {
    if (!id) {
      notification["warning"]({
        message:
          "Este identificador no es correcto, intentelo de nuevo más tarde.",
      });
    } else {
      notification["success"]({
        message: "Producto eliminado correctamente",
      });
      deleteProductApi(id);
    }
  };

  return (
    <>
      <Button
        type="primary"
        shape="round"
        style={{ marginTop: "25px", marginLeft: "50px" }}
        onClick={() => setVisibleModal(true)}
      >
        Añadir nuevo producto
      </Button>
      <Modal
        title="Crear nuevo producto"
        content={<AddProductForm />}
        isVisibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
      />
      <List itemLayout="horizontal">
        {dataApi ? (
          dataApi.map((data) => {
            return (
              <List.Item key={data._id}>
                <List.Item.Meta
                  avatar={<Avatar src={data.img} />}
                  title={data.title}
                  description={`Descripción: ${data.description} || Cantidad: ${data.quantity} || Precio: ${data.price}`}
                />
                <div>
                  <Button>
                    <EditOutlined />
                  </Button>

                  <Button onClick={() => deleteProduct(data._id)}>
                    <DeleteOutlined />
                  </Button>
                </div>
              </List.Item>
            );
          })
        ) : (
          <Spin />
        )}
      </List>
    </>
  );
}

function AddProductForm() {
  const [dataForm, setDataForm] = useState({
    title: "",
    description: "",
    quantity: "",
    price: "",
    img: "",
  });

  const sendData = () => {
    if (
      !dataForm.title ||
      !dataForm.description ||
      !dataForm.quantity ||
      !dataForm.price ||
      !dataForm.img
    ) {
      notification["warning"]({
        message: "Los datos son obligatorios...",
      });
    } else {
      createProductApi(dataForm).then((response) => {
        notification["success"]({
          message: "Datos enviados correctamente",
        });
      });
    }
  };

  return (
    <Form onFinish={sendData}>
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
