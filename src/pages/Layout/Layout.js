import React from "react";
import { Row, Col } from "antd";
import { Switch, Route } from "react-router-dom";
import MenuLanding from "../MenuLanding";

export default function Layout(props) {
  const { routes } = props;

  return (
    <>
      <Row>
        <Col lg={4} />
        <Col lg={16}>
          <MenuLanding />
        </Col>
        <Col lg={4} />
      </Row>
      <LoadRouters routes={routes} />
    </>
  );
}

function LoadRouters({ routes }) {
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
