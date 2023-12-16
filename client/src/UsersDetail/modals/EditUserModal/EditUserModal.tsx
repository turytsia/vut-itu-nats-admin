import React, { useState, ChangeEvent, useCallback, useEffect } from "react";

import icons from "../../../utils/icons";
import Modal from "../../../components/Modal/Modal";
import Input from "../../../components/Input/Input";
import InputTags from "../../../components/InputTags/InputTags";
import { AccountType, UserPatchType, UserType } from "../../../utils/axios";
import Checkbox from "../../../components/Checkbox/Checkbox";

import classes from "./EditUserModal.module.css";
import Select from "../../../components/Select/Select";
import { request } from "../../../context/AppContextProvider";
import { RequestAccountType } from "../../../utils/types";
import { DropdownItemType } from "../../../components/Dropdown/Dropdown";

type PropsType = {
  onClose: () => void;
  onSubmit: (settings: UserPatchType) => void;
  user: UserType & UserPatchType;
  error: string;
};

const EditUserModal = ({ onClose, onSubmit, user: initialUser }: PropsType) => {
  const [user, setUser] = useState<UserPatchType & UserType>(initialUser);

  const [isBearer, setIsBearer] = useState<boolean>(false);
  const [ allowPub, setAllowPub ] = useState<string[]>(initialUser.nats.pub.allow ?? []);
  const [ allowSub, setAllowSub ] = useState<string[]>([]);
  const [ rm, setRm ] = useState<string[]>([]);

  const onSave = () => {
    onSubmit({
        allow_pub: allowPub.join(","),
        allow_sub: allowSub.join(","),
        rm: rm.join(","),

        bearer: isBearer
    } as UserPatchType);
  };

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }, []);

  return (
    <Modal
      title={"Update user: " + user.name}
      textProceed="Save"
      textCancel="Cancel"
      icon={icons.pen}
      onClose={onClose}
      onSubmit={onSave}
    >
      <div className={classes.container}>
        <Input
          labelText="Payload"
          hintText={
            "Set maximum message payload in bytes for the user (-1 is unlimited)"
          }
          name="payload"
          value={user.nats?.payload}
          type={"number"}
          onChange={handleInputChange}
        />
        <Input
          labelText="Subscriptions"
          hintText={"Set maximum active subscriptions for the user"}
          name="subscriptions"
          value={user.nats?.subs}
          type={"number"}
          onChange={handleInputChange}
        />
        <Input
          labelText="Data"
          hintText={"Set data for the user"}
          name="data"
          value={user.nats?.data}
          type={"number"}
          onChange={handleInputChange}
        />
        <InputTags
          onDelete={(pub) =>
            setRm((prev) => (prev.includes(pub) ? prev : [...prev, pub]))
          }
          labelText="Allow pub"
          value={allowPub}
          onChange={setAllowPub}
        />
        <InputTags
          onDelete={(sub) =>
            setRm((prev) => (prev.includes(sub) ? prev : [...prev, sub]))
          }
          labelText="Allow sub"
          value={allowSub}
          onChange={setAllowSub}
        />
      </div>
    </Modal>
  );
};

export default EditUserModal;
