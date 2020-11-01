import AddUser from "./components/AddUser/AddUser";
import GetUser from "./components/GetUser/GetUser";
import Logout from "../Logout/Logout";
import React from "react";
import RemoveUser from "./components/RemoveUser/RemoveUser";

export default function Admin() {
  return (
    <React.Fragment>
      <AddUser />
      <hr />
      <GetUser />
      <hr />
      <RemoveUser />
      <hr />
    </React.Fragment>
  );
}
