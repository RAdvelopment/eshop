import React, { useState, useEffect } from "react";
import { Row, Col, Card, notification, Spin } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { getProductApi } from "../../api/product";
import MenuLanding from "../MenuLanding";

export default function Landing() {
  const [dataProduct, setDataProduct] = useState(null);
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
    setDataId([...dataId, idData]);
  };

  return (
    <Row>
      <Col md={4} />
      <Col md={16}>
        <MenuLanding dataCart={dataId.length} />
        <Row gutter={16}>
          {dataProduct ? (
            dataProduct.map((data) => {
              return (
                <Col md={8} key={data._id} onClick={() => setData(data._id)}>
                  <CardItem
                    title={data.title}
                    description={data.description}
                    img={data.img}
                    id={data._id}
                  />
                </Col>
              );
            })
          ) : (
            <Spin
              style={{ textAlign: "center" }}
              tip="Cargando datos..."
              size="large"
            />
          )}
        </Row>
      </Col>
      <Col md={4} />
    </Row>
  );
}

function CardItem(props) {
  const { title, description, img } = props;

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
        actions={[<ShoppingCartOutlined />]}
      >
        <Card.Meta title={title} description={description} />
      </Card>
    </div>
  );
}
