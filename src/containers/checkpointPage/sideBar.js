import "./checkpoint.scss";
import content_copy_white_24dp from "../../resources/images/content_copy_white_24dp.svg";
import clear_logo from "../../resources/images/clear_white_24dp.svg";
import logo from "../../resources/images/logo_white.svg";

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
} from "react-pro-sidebar";
import { FaLock, FaEdit, FaEye } from "react-icons/fa";
import { ButtonGroup, Spinner } from "react-bootstrap";

function SideBar({
  checkpoint,
  currentMenuItem,
  copyControl,
  deleteControl,
  renameControl,
  loading,
}) {
  const [showEditInput, setShowEditInput] = useState("");
  const [controlName, setControlName] = useState();
  const history = useHistory();

  const onSetShowEditInput = (controlPublicId, controlNameParam) => {
    if (showEditInput) {
      setShowEditInput("");
      if (controlNameParam !== controlName) {
        renameControl(controlPublicId, controlName);
      }
    } else {
      setControlName(controlNameParam);
      setShowEditInput(controlPublicId);
    }
  };

  function onCopy(controlPublicId) {
    copyControl(controlPublicId);
  }

  function onDeleteControl(controlPublicId) {
    deleteControl(controlPublicId);
  }

  return (
    <>
      <ProSidebar>
        <SidebarHeader className="sidebarHeader">
          <Link to="/">
            <img width="150px" src={logo} alt="logo AIManager" />
          </Link>
        </SidebarHeader>
        <Menu>
          {checkpoint &&
            checkpoint.controls &&
            checkpoint.controls.map((control, index) => (
              <div key={index} className="position-relative">
                {!control.initialControl ? (
                  <>
                    <span
                      className="sidebar-eye"
                      onClick={() => {
                        history.push(
                          `/checkpoints/${checkpoint.publicId}/controls/${control.publicId}`
                        );
                      }}
                    >
                      <FaEye className="fa-eye" />
                    </span>
                    <FaLock className="sidebar-lock" />
                    {!loading ? (
                      <img
                        onClick={onCopy.bind(this, control.publicId)}
                        className="sidebar_copy-action"
                        src={content_copy_white_24dp}
                      />
                    ) : (
                      <Spinner
                        className="sidebar-spinner-loading_action"
                        animation="border"
                      ></Spinner>
                    )}
                  </>
                ) : (
                  <>
                    {showEditInput === control.publicId && (
                      <input
                        value={controlName}
                        className="input-edit-name"
                        type="text"
                        onChange={(e) => setControlName(e.target.value)}
                      ></input>
                    )}
                    <span
                      className="sidebar-eye"
                      onClick={() => {
                        history.push(
                          `/checkpoints/${checkpoint.publicId}/controls/${control.publicId}`
                        );
                      }}
                    >
                      <FaEye className="fa-eye" />
                    </span>
                    <FaEdit
                      className="sidebar_edit-action"
                      onClick={() =>
                        onSetShowEditInput(control.publicId, control.name)
                      }
                    />
                    <img
                      src={clear_logo}
                      className="sidebar_clear-action"
                      onClick={onDeleteControl.bind(this, control.publicId)}
                    />
                  </>
                )}
                <SubMenu
                  className={`${
                    showEditInput === control.publicId && "on-edit-menu"
                  }`}
                  title={showEditInput === control.publicId ? "" : control.name}
                >
                  {control.diversityClasses.map((diversityClass, index) => (
                    <MenuItem
                      key={index}
                      active={
                        currentMenuItem &&
                        currentMenuItem.publicId === diversityClass.publicId
                      }
                    >
                      <Link
                        to={`/checkpoints/${checkpoint.publicId}/controls/${control.publicId}/diversity-class/${diversityClass.publicId}`}
                      ></Link>
                      {diversityClass.name}
                    </MenuItem>
                  ))}
                </SubMenu>
              </div>
            ))}

          <MenuItem
            className="imported-images_menu"
            active={currentMenuItem === "Images importées"}
          >
            Images importées
            <Link
              to={`/checkpoints/${checkpoint.publicId}/imported-images`}
            ></Link>
          </MenuItem>
        </Menu>
      </ProSidebar>
    </>
  );
}

export default SideBar;
