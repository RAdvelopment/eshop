import React, { useState, useEffect } from "react";
import MenuLanding from "../MenuLanding";
import {
  Row,
  Col,
  List,
  Button,
  Avatar,
  Form,
  Input,
  Statistic,
  notification,
} from "antd";
import Modal from "../../components/Modal";
import { getProductIdApi, postProductSelledApi } from "../../api/product";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartId, setCartId] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cleaned, setCleaned] = useState(true);
  const [reload, setReload] = useState(false);
  const [priceResult, setPriceResult] = useState(0);
  const [priceIva, setPriceIva] = useState(0);
  const [isVisibleModal, setVisibleModal] = useState(false);
  const priceId = [];

  //Obtengo los id's del localstorage
  var localCart = localStorage.getItem("cartData");

  useEffect(() => {
    setTimeout(() => {
      setReload(!reload);
    }, 1);
    if (localCart) {
      //convierto los datos en un array y lo envío a un useState
      const cartSplit = localCart.split(",");
      setCartId(cartSplit);
      //Compruebo si hay datos en cartId y ejecuto un for que se ejecuta por la longitud de cartId
      if (cartId) {
        for (let i = 0; i < cartId.length; i++) {
          const itemCart = cartId[i];
          //Si cartId es más o igual de largo que cartItems llama el api
          if (cartId.length >= cartItems.length) {
            if (cleaned) {
              getProductIdApi(itemCart).then((res) => {
                if (res.code !== 200) {
                  notification["warning"]({
                    message:
                      "Ha ocurrido un error en el servidor, posiblemente este id no sea correcto.",
                    description:
                      "Para solucionar esto oprima F12, vaya al apartado aplicación y oprima click derecho en cartData, luego eliminar.",
                    duration: 0,
                  });
                } else {
                  //guardo productGetted en cartItems
                  const { productGetted } = res;
                  setReload(!reload);
                  setCartItems((cartItems) => [...cartItems, productGetted]);
                }
              });
            }
          }
        }
      }
    } else {
      setCartId(0);
    }
    return function cleanup() {
      setCleaned(false);
      setCartId([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  useEffect(() => {
    if (priceId.length <= cartItems.length - 1) {
      cartItems.map((data) => {
        const dataParsed = parseInt(data.price);
        return priceId.push(dataParsed);
      });
      if (priceId) {
        setPriceResult(priceId.reduce((a, b) => a + b, 0));
        setPriceIva(priceResult * 0.05 + priceResult);
      }
    } else {
      console.log("nada");
    }
  }, [cartItems, priceResult]);

  const ivaPrice = (iva) => {
    return priceResult * iva;
  };

  const resetPrice = () => {
    localStorage.removeItem("cartData");
    window.location.reload();
  };

  const buyProducts = () => {
    setVisibleModal(true);
  };

  return (
    <Row>
      <Modal
        title="Comprar productos"
        isVisibleModal={isVisibleModal}
        setVisibleModal={setVisibleModal}
        content={
          <CartModal
            priceResult={priceResult}
            priceIva={priceIva}
            cartItems={cartItems}
          />
        }
      ></Modal>
      <Col md={4} />
      <Col md={16}>
        <MenuLanding reload={reload} setVisibleModal={setVisibleModal} />
        <List
          itemLayout="horizontal"
          bordered
          onClick={() => setReload(!reload)}
        >
          {cartItems
            ? cartItems.map((e, index) => {
                return (
                  <List.Item key={e._id + index}>
                    <List.Item.Meta
                      avatar={<Avatar src={e.img} alt={e.title} />}
                      title={e.title}
                      description={e.description}
                    />
                    <div>{e.price + "$"}</div>
                  </List.Item>
                );
              })
            : console.log("nada")}
        </List>
        {cartId ? (
          <div>
            <Statistic title="Total en el carrito" value={priceResult + "$"} />
            <Statistic
              title="Impuestos aplicados del 5%"
              value={ivaPrice(0.05) + "$"}
            />
            <h1>Total a pagar:</h1>
            <h1>{priceIva + "$"}</h1>
            <div>
              <div>
                <Button
                  type="primary"
                  style={{
                    left: "550px",
                    top: "-150px",
                    width: "25%",
                    height: "2rem",
                  }}
                  onClick={() => buyProducts()}
                >
                  Pagar
                </Button>
                <Button
                  type="danger"
                  style={{
                    marginLeft: "50px",
                    left: "550px",
                    top: "-150px",
                    width: "15%",
                    height: "2rem",
                  }}
                  onClick={() => resetPrice()}
                >
                  Reiniciar Carro
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 style={{ textAlign: "center" }}>
              No hay productos en el carrito
            </h2>
            <Button style={{ width: "100%" }} type="primary">
              <Link to="/">Inicio</Link>
            </Button>
          </div>
        )}
      </Col>
      <Col md={4} />
    </Row>
  );
}

function CartModal({ priceIva, cartItems }) {
  const [dataDb, setDataDb] = useState({
    products: cartItems,
    name: "",
    lastname: "",
    price: priceIva,
  });

  const changeData = (e) => {
    setDataDb({
      ...dataDb,
      [e.target.name]: e.target.value,
    });
  };

  const sendData = () => {
    if (!dataDb.products || !dataDb.name || !dataDb.lastname || !dataDb.price) {
      notification["warning"]({
        message:
          "Los datos son obligatorios, si ya rellenó los datos reinicie la página",
      });
    } else {
      postProductSelledApi(dataDb).then((res) => {
        if (res.code !== 200) {
          notification["error"]({
            message: res.message,
          });
        } else {
          notification["success"]({
            message: "Datos enviados exitosamente",
          });
        }
      });
    }
  };

  return (
    <Form onChange={changeData} onFinish={sendData}>
      <Form.Item>
        <Input placeholder="Nombre" name="name" value={dataDb.name} />
      </Form.Item>
      <Form.Item>
        <Input placeholder="Apellido" name="lastname" value={dataDb.value} />
      </Form.Item>
      <Button
        htmlType="submit"
        type="primary"
        style={{ width: "100%", margin: "1rem auto" }}
      >
        Enviar datos
      </Button>
      <h2 style={{ textAlign: "center" }}>Total a pagar: {priceIva}$</h2>
    </Form>
  );
}
