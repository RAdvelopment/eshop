import React from "react";
import { Modal as ModalAntd } from "antd";

export default function Modal(props) {
  const {
    content,
    title,
    isVisibleModal,
    okModal,
    cancelModal,
    setVisibleModal,
    ...other
  } = props;

  return (
    <ModalAntd
      title={title}
      visible={isVisibleModal}
      onCancel={() => {
        setVisibleModal(false);
      }}
      footer={false}
      {...other}
    >
      {content}
    </ModalAntd>
  );
}
