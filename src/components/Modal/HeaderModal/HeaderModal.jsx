import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import { motion } from "framer-motion";
import "./headerModal.css";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../../features/theme/themeSlice";
import { setActiveBoard } from "../../../features/boards/boardSlice";
import { openModal } from "../../../features/global/modalSlice";
import Switch from "../../Switch/Switch";
import { dropIn } from "../../../utils/framer-animations";
import BoardIcon from "../../../assets/Icons/icon-board.svg";
import SunIcon from "../../../assets/Icons/icon-light-theme.svg";
import MoonIcon from "../../../assets/Icons/icon-dark-theme.svg";
import { NavLink } from "react-router-dom";

const HeaderModal = ({ handleClose }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const toggleTheme = () => {
    theme === "light"
      ? dispatch(setTheme("dark"))
      : dispatch(setTheme("light"));
  };
  const boards = useSelector((state) => state.boards.boards);

  const handleBoardChange = (board) => {
    dispatch(setActiveBoard(board));
    handleClose();
  };

  return (
    <Backdrop onClick={handleClose} mobile={true}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        className="modal header-modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2>ALL BOARDS ({boards.length})</h2>
        <div className="header-modal__board-list">
          {boards.map((board, index) => (
            <div
              key={index}
              onClick={() => handleBoardChange(board.id)}
              className={
                board.active
                  ? "header-modal__board-item active-board-modal"
                  : "header-modal__board-item "
              }
            >
              <img
                style={{ marginLeft: "1.5em" }}
                src={BoardIcon}
                alt="board icon"
              />{" "}
              <h3
                className={
                  board.active
                    ? "f-header-modal__board f-modal-active-board"
                    : "f-header-modal__board "
                }
              >
                {board.name}
              </h3>
            </div>
          ))}
          <div
            className="header-modal__new-board"
            onClick={() => {
              handleClose();
              dispatch(openModal("addBoardModal"));
            }}
          >
            <img
              src={BoardIcon}
              alt="add new board icon"
              fill="#635FC7"
              style={{ marginLeft: "1.5em" }}
            />{" "}
            <h3 className="f-header-modal__new-board">+ Create New Board</h3>
          </div>
        </div>

        <div className="header-modal__themes">
          <div className="header-modal__theme">
            <img src={SunIcon} alt="sun icon" />
          </div>
          <Switch
            color="#635FC7"
            isOn={theme === "dark"}
            handleToggle={() => toggleTheme()}
          />
          <div className="header-modal__theme">
            <img src={MoonIcon} alt="moon icon" />
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default HeaderModal;
