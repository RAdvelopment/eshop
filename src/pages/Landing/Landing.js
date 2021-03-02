import React, { useState, useEffect } from "react";
import { Row, Col, Card, notification } from "antd";
import { Link } from "react-router-dom";
import { getProductApi } from "../../api/product";

export default function Landing() {
  const [dataProduct, setDataProduct] = useState(null);

  useEffect(() => {
    getProductApi().then((response) => {
      if (response?.code !== 200) {
        notification["warning"]({
          message: response.message,
        });
      } else {
        setDataProduct(response.products);
      }
    });
  }, []);

  return (
    <Row>
      <Col md={4} />
      <Col md={16}>
        <h1>Página de inicio</h1>
        <p>Prueba</p>
        <p>
          <Link to="/login">Iniciar sesion</Link>
        </p>
        <p>
          <Link to="/register">Registrarse</Link>
        </p>
        <Row gutter={16}>
          {dataProduct.map((data) => {
            return (
              <Col md={8} key={data._id}>
                <CardItem
                  title={data.title}
                  description={data.description}
                  img={data.img}
                />
              </Col>
            );
          })}
        </Row>
      </Col>
      <Col md={4} />
    </Row>
  );
}

function CardItem(props) {
  const { title, description, img } = props;

  return (
    <div style={{ width: "250px" }}>
      <Card cover={<img alt={title} src={img} />}>
        <Card.Meta title={title} description={description} />
      </Card>
    </div>
  );
}
