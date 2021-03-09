import React, { useState, useEffect } from "react";
import {
  List,
  Avatar,
  Button,
  notification,
  Spin,
  Input,
  Form,
  Modal as ModalAntd,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  getProductApi,
  deleteProductApi,
  createProductApi,
  updateProductApi,
} from "../../../../api/product";
import Modal from "../../../../components/Modal";
import "./Products.scss";

export default function Products() {
  const [dataApi, setDataApi] = useState(null);
  const [reload, setReload] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [dataId, setDataId] = useState("");

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
  }, [reload]);

  const deleteProduct = (id) => {
    if (!id) {
      notification["warning"]({
        message:
          "Este identificador no es correcto, intentelo de nuevo más tarde.",
      });
    } else {
      notification["success"]({
        message: "Producto eliminado correctamente",
        placement: "topLeft",
      });
      deleteProductApi(id);
      setReload(!reload);
    }
  };

  const setId = (id) => {
    setVisibleModalEdit(true);
    setDataId(id);
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
        content={
          <AddProductForm
            setReload={setReload}
            reload={reload}
            setVisibleModal={setVisibleModal}
          />
        }
        isVisibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
      />
      <EditProductModal
        reload={reload}
        setReload={setReload}
        id={dataId}
        visibleModalEdit={visibleModalEdit}
        setVisibleModalEdit={setVisibleModalEdit}
      />
      <List itemLayout="horizontal" className="list-product">
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
                  <Button type="primary" onClick={() => setId(data._id)}>
                    <EditOutlined />
                  </Button>

                  <Button
                    type="primary"
                    danger
                    onClick={() => deleteProduct(data._id)}
                  >
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

function EditProductModal({
  visibleModalEdit,
  setVisibleModalEdit,
  id,
  setReload,
  reload,
}) {
  const [dataEdit, setDataEdit] = useState({});

  const updateProductData = async () => {
    if (
      !dataEdit.title ||
      !dataEdit.description ||
      !dataEdit.quantity ||
      !dataEdit.price ||
      !dataEdit.img
    ) {
      notification["warning"]({
        message: "Los datos son obligatorios, no deje datos en blanco.",
      });
    } else {
      updateProductApi(dataEdit, id).then(() => {
        notification["success"]({
          message: "Datos actualizados correctamente",
        });
      });
      setReload(!reload);
      setDataEdit({});
      setVisibleModalEdit(false);
    }
  };

  const changeData = (e) => {
    setDataEdit({
      ...dataEdit,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <ModalAntd
      title="Editar Producto"
      visible={visibleModalEdit}
      footer={false}
      onCancel={() => setVisibleModalEdit(false)}
    >
      <Form onFinish={updateProductData} onChange={changeData}>
        <Form.Item>
          <Input
            name="title"
            value={dataEdit.title}
            placeholder="Título del producto"
          />
        </Form.Item>
        <Form.Item>
          <Input
            name="description"
            value={dataEdit.description}
            placeholder="Descripción del producto"
          />
        </Form.Item>
        <Form.Item>
          <Input
            name="quantity"
            value={dataEdit.quantity}
            placeholder="Cantidad de productos disponibles"
          />
        </Form.Item>
        <Form.Item>
          <Input name="price" value={dataEdit.price} placeholder="Precio" />
        </Form.Item>
        <Form.Item>
          <Input
            name="img"
            value={dataEdit.img}
            placeholder="Url de la imágen del producto"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" style={{ width: "100%" }} htmlType="submit">
            Enviar datos
          </Button>
        </Form.Item>
      </Form>
    </ModalAntd>
  );
}

function AddProductForm({ reload, setReload, setVisibleModal }) {
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
      setReload(!reload);
      setVisibleModal(false);
      setDataForm({});
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
