import React from "react";
import { Redirect } from "react-router-dom";

export default function Error() {
  return <Redirect to={"/"} />;
}
