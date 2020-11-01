import { CustomButton } from "../../style/CustomButton";
import React from "react";
import { deleteUser } from "../../redux/Redux-actions/UserActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Logout() {
  let history = useHistory();
  const dispatch = useDispatch();

  const logoutUser = () => {
    console.log("Logging user out...");
    dispatch(deleteUser());
    console.log("Logged out!");
    history.push("/");
  };

  return <CustomButton onClick={logoutUser}>Logout</CustomButton>;
}
