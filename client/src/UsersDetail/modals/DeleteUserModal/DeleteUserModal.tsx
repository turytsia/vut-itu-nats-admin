import React, { useState, ChangeEvent, useCallback, useEffect } from "react";

import icons from "../../../utils/icons";
import Modal from "../../../components/Modal/Modal";
import Input from "../../../components/Input/Input";
import InputTags from "../../../components/InputTags/InputTags";
import { AccountType, UserPatchType, UserType } from "../../../utils/axios";
import Checkbox from "../../../components/Checkbox/Checkbox";

import classes from "./DeleteUserModal.module.css";
import { request } from "../../../context/AppContextProvider";

type PropsType = {
  onClose: () => void;
  onSubmit: () => void;
  user: UserType & UserPatchType;
  error: string;
};

const DeleteUserModal = ({ onClose, onSubmit, user }: PropsType) => {
  return (
    <Modal
      title={"Delete user: " + user.name}
      textProceed="Delete"
      textCancel="Cancel"
      icon={icons.delete}
      onClose={onClose}
      onSubmit={onSubmit}
    >
        <div className={classes.text_question}>Are you sure to delete this user?</div>
    </Modal>
  );
};

export default DeleteUserModal;
