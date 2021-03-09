import React, { useState, useEffect } from "react";
import { getUsersApi } from "../../../../api/user";
import { List, Spin } from "antd";

export default function Users() {
  const [dataUsers, setDataUsers] = useState(null);

  useEffect(() => {
    getUsersApi().then((res) => {
      if (res?.code !== 200) {
        console.log(res.message);
      } else {
        const users = res.users;
        setDataUsers(users);
      }
    });
  }, []);

  return (
    <List
      itemLayout="horizontal"
      style={{ marginTop: "50px", marginLeft: "50px", marginRight: "50px" }}
    >
      {dataUsers ? (
        dataUsers.map((data) => {
          return (
            <List.Item key={data._id}>
              <List.Item.Meta
                title={`${data.name} ${data.lastname}`}
                description={`Contacto: ${data.contact} || Correo: ${data.email}`}
              />
              <div>
                <p>{`${data.email}`}</p>
                <p>{data.password} </p>
              </div>
            </List.Item>
          );
        })
      ) : (
        <Spin />
      )}
    </List>
  );
}
