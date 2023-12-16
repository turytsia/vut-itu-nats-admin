/**
 * @fileoverview Modal form component to create user
 *
 * This file contains modal form component to create user.
 *
 * @module CreateUserModal
 *
 * @author xzhuka01
 */
import { ChangeEvent, useCallback, useState } from "react";
import { UserPayload } from "../../../utils/axios";
import icons from "../../../utils/icons";

import classes from "./CreateUserModal.module.css";

// components
import Modal from "../../../components/Modal/Modal";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";

type PropsType = {
  error: string;
  onClose: () => void;
  onSubmit: (state: UserPayload) => void;
  operatorList: string[];
};



// initial state for form inputs
const initialState: UserPayload = {
  account: "",
  name: "",
  operator: "",
};

/**
 * Modal form component for creating users.
 *
 * @param props - Component props.
 * @param props.onClose - Callback to close the modal.
 * @param props.onSubmit - Callback to submit the form.
 * @param props.error - Error message to display, if any.
 * @param props.operatorList - List of operators to select from.
 * @returns Modal form component.
 */
const CreateUserModal = ({
  onClose,
  onSubmit,
  error,
  operatorList,
}: PropsType) => {
  const [state, setState] = useState<UserPayload>(initialState);

  /**
   * Handle input changes
   *
   * @param e - Input event
   */
  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleOperatorChange = (value: string | null) => {
    setState((prev) => ({ ...prev, operator: value }));
  };

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(() => {
    onSubmit(state);
  }, [state, onSubmit]);

  return (
    <Modal
      error={error}
      title="Create new user"
      textProceed="Create"
      textCancel="Cancel"
      icon={icons.plus}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className={classes.container}>
        <Input
          isRequired
          labelText="Account"
          hintText="Account under which the user will be created"
          name="account"
          value={state.account}
          onChange={handleInputChange}
        />
        <Input
          isRequired
          labelText="Name"
          name="name"
          value={state.name}
          onChange={handleInputChange}
        />
        <Select
          isRequired
          labelText="Operator"
          hintText="Operator under which the user will be created"
          value={state.operator}
          items={operatorList.map((name) => ({ id: name, value: name }))}
          name="operator"
          onChange={handleOperatorChange}
        />
      </div>
    </Modal>
  );
};

export default CreateUserModal;
