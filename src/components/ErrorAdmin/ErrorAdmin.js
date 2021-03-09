import React from "react";
import { Redirect } from "react-router-dom";

export default function ErrorAdmin() {
  return <Redirect to={"/admin"} />;
}
