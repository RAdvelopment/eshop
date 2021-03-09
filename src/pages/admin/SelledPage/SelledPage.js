import React, { useEffect, useState } from "react";
import { List, Spin, Avatar, Collapse, Card, Statistic } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { getProductSelledApi } from "../../../api/product";

export default function SelledPage() {
  const [dataApi, setDataApi] = useState(null);
  var sell = 0;

  useEffect(() => {
    getProductSelledApi().then((res) => {
      if (res.code !== 200) {
        console.log(res.message);
      } else {
        const { productsGetted } = res;
        setDataApi(productsGetted);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <List
      style={{ marginLeft: "50px", marginRight: "50px", marginTop: "50px" }}
    >
      {dataApi ? (
        dataApi.map((res) => {
          var price = parseInt(res.price);
          sell = sell += price;
          const date = res.selledDate;
          return (
            <List.Item key={res._id}>
              <List.Item.Meta
                title={`${res.name} ${res.lastname}`}
                description={`Total comprado: $ ${res.price} Fecha de compra: ${
                  date.split("T")[0]
                }`}
              />
              <div>
                <Collapse>
                  <Collapse.Panel
                    header={`Productos comprados por ${res.name} ${res.lastname}`}
                  >
                    {res.products.map((data, index) => {
                      return (
                        <div key={index}>
                          <p>
                            <Avatar src={data.img} />
                            {data.title}
                          </p>
                          <p>{data.price}</p>
                        </div>
                      );
                    })}
                  </Collapse.Panel>
                </Collapse>
              </div>
            </List.Item>
          );
        })
      ) : (
        <Spin tip="Cargando ventas..." />
      )}
      <Card style={{ marginTop: "50px", textAlign: "center" }}>
        <Statistic
          title="Total vendido a la fecha"
          value={sell}
          precision={0}
          valueStyle={{ color: "#3f8600" }}
          prefix={<ArrowUpOutlined />}
          suffix="$"
        />
      </Card>
    </List>
  );
}
