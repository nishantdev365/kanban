import React from "react";
import "./deleteClearTaskModal.css";
import Backdrop from "../Backdrop/Backdrop";

const DeleteTask = ({ board }) => {
  return (
    <Backdrop>
      <div className="delete-modal">DeleteTask</div>
    </Backdrop>
  );
};

export default DeleteTask;
