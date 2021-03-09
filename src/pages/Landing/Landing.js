import React, { useState, useEffect } from "react";
import { Row, Col, Card, notification, Spin, Badge } from "antd";
import {
  ShoppingCartOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { getProductApi } from "../../api/product";
import { Link } from "react-router-dom";
import MenuLanding from "../MenuLanding";

export default function Landing() {
  const [dataProduct, setDataProduct] = useState(null);
  const [reload, setReload] = useState(false);
  const [dataId, setDataId] = useState([]);

  useEffect(() => {
    getProductApi().then((response) => {
      if (response?.code !== 200) {
        notification["warning"]({
          message: response.message,
        });
      } else {
        const productsData = response.products;
        setDataProduct(productsData);
      }
    });
  }, []);

  const setData = (idData) => {
    setReload(!reload);
    setDataId([...dataId, idData]);
    localStorage.setItem("cartData", dataId);
  };

  const deleteData = (idData) => {
    setReload(!reload);
    if (dataId) {
      const dataStorage = localStorage.getItem("cartData");
      var dataFiltered = dataId.filter((id) => id !== idData);
      setDataId(dataFiltered);
      if (dataFiltered == dataStorage) {
        localStorage.removeItem("cartData");
        setReload(!reload);
      } else {
        localStorage.setItem("cartData", dataId);
        setReload(!reload);
      }
    }
  };

  return (
    <Row>
      <Col md={4} />
      <Col md={16}>
        <MenuLanding reload={reload} />
        <Row gutter={16}>
          {dataProduct ? (
            dataProduct.map((data) => {
              return (
                <Col md={8} key={data._id}>
                  <CardItem
                    title={data.title}
                    description={`Descripción: ${data.description} || Precio: ${data.price} || Cantidad: ${data.quantity}`}
                    img={data.img}
                    id={data._id}
                    setData={setData}
                    deleteData={deleteData}
                    reload={reload}
                  />
                </Col>
              );
            })
          ) : (
            <div style={{ userSelect: "none" }}>
              <h1
                style={{
                  display: "block",
                  alignItems: "center",
                  marginTop: "50px",
                  textAlign: "center",
                  color: "#f35",
                }}
              >
                NO DATA TO SHOW
              </h1>
              <h2
                style={{
                  display: "block",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                No hay datos para mostrar por ahora, quizá nuestra base de datos
                se encuentra ocupada o simplemente no hay datos que mostrar,
                intente volver luego.
              </h2>
              <Spin
                style={{
                  display: "block",
                  alignItems: "center",
                  marginTop: "2rem",
                }}
                tip="Intentando recuperar los datos..."
              />
            </div>
          )}
        </Row>
      </Col>
      <Col md={4} />
    </Row>
  );
}

function CardItem(props) {
  const { title, description, img, setData, id, deleteData, reload } = props;
  return (
    <div style={{ width: "250px", marginTop: "20px" }}>
      <Card
        cover={
          img ? (
            <img alt={title} src={img} />
          ) : (
            <img
              alt="img"
              src="https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg"
            />
          )
        }
        actions={[
          <PlusSquareOutlined onClick={() => setData(id)} />,
          <CartShopLink id={id} reload={reload} />,
          <MinusSquareOutlined onClick={() => deleteData(id)} />,
        ]}
      >
        <Card.Meta title={title} description={description} />
      </Card>
    </div>
  );
}

function CartShopLink({ id, reload }) {
  const [badgeData, setBadgeData] = useState(null);
  const dataLocal = localStorage.getItem("cartData");

  useEffect(() => {
    if (dataLocal) {
      const dataSplit = dataLocal.split(",");
      const badgeNumber = dataSplit.filter((data) => data === id);
      setBadgeData(badgeNumber.length);
    }
  }, [reload]);

  return (
    <Link to={"/shop"}>
      <Badge count={badgeData ? badgeData : 0}>
        <ShoppingCartOutlined />
      </Badge>
    </Link>
  );
}
