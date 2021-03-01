import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

export default function Landing() {
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
      </Col>
      <Col md={4} />
    </Row>
  );
}
