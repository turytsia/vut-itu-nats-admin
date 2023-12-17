import React, { useState, ChangeEvent, useCallback, useEffect } from "react";

import icons from "../../../utils/icons";
import Modal from "../../../components/Modal/Modal";
import Input from "../../../components/Input/Input";
import InputTags from "../../../components/InputTags/InputTags";
import { UserPayload, UserPatchType, UserType } from "../../../utils/axios";
import Checkbox from "../../../components/Checkbox/Checkbox";

import classes from "./EditUserModal.module.css";
import Select from "../../../components/Select/Select";
import { request } from "../../../context/AppContextProvider";
import { RequestAccountType } from "../../../utils/types";
import { DropdownItemType } from "../../../components/Dropdown/Dropdown";
import DateInput from "../../../components/DateInput/DateInput";
import { NSCDateFormat } from "../../../utils/common";

type PropsType = {
  onClose: () => void;
  onSubmit: (settings: UserPatchType) => void;
  user: UserType & UserPatchType;
  error: string;
};

const initialState: UserPayload = {
  account: "",
  name: "",
  operator: "",
  expiry: null,
  start: null,
  conn_type: "",
};

const EditUserModal = ({ onClose, onSubmit, user: initialUser }: PropsType) => {
  const [state, setState] = useState<UserPayload>(initialState);
  const [user, setUser] = useState<UserPatchType & UserType>(initialUser);

  const [isBearer, setIsBearer] = useState<boolean>(false);
  const [allowPub, setAllowPub] = useState<string[]>(
    initialUser.nats.pub.allow ?? []
  );
  const [DenyPub, setDenyPub] = useState<string[]>([]);
  const [allowPubResp, setAllowPubResp] = useState<string[]>([]);
  const [allowPubSub, setAllowPubSub] = useState<string[]>([]);
  const [denyPubSub, setDenyPubSub] = useState<string[]>([]);
  const [connType, setConnType] = useState<string[]>([]);
  const [sourceNet, setSourceNet] = useState<string[]>([]);
  const [tag, setTag] = useState<string[]>([]);
  const [time, setTime] = useState<string[]>([]);

  const [allowSub, setAllowSub] = useState<string[]>(
    initialUser.nats.sub.allow ?? []
  );
  const [denySub, setDenySub] = useState<string[]>([]);

  const [rm, setRm] = useState<string[]>([]);
  const [rmConn, setRmConn] = useState<string[]>([]);
  const [rmNetwork, setRmNetwork] = useState<string[]>([]);
  const [rmTag, setRmTag] = useState<string[]>([]);
  const [rmTime, setRmTime] = useState<string[]>([]);

  const onSave = () => {
    onSubmit({
      allow_pub: allowPub.join(","),
      deny_pub: DenyPub.join(","),

      allow_pub_response: allowPubResp.join(","),
      allow_pubsub: allowPubSub.join(","),
      conn_type: connType.join(","),

      allow_sub: allowSub.join(","),
      deny_sub: denySub.join(","),

      expiry: NSCDateFormat(state.expiry),
      start: NSCDateFormat(state.start),

      rm: rm.join(","),
      rm_conn_type: rmConn.join(","),
      rm_source_network: rmNetwork.join(","),
      rm_tag: rmTag.join(","),

      source_network: sourceNet.join(","),
      tag: tag.join(","),

      bearer: isBearer,
    } as UserPatchType);
  };

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }, []);

  /**
   * Handle date changes
   *
   * @param date - Date value
   * @param name - Input date name
   */
  const handleDateChange = useCallback((date: string, name: string) => {
    setState((prev) => ({ ...prev, [name]: String(date) }));
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
        <Checkbox
          labelText="Require bearer"
          hintText="Generate a bearer with for the user"
          name="generateBearer"
          value={isBearer}
          onChange={(e) => setIsBearer(e.target.checked)}
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
          onDelete={(pub) =>
            setRm((prev) => (prev.includes(pub) ? prev : [...prev, pub]))
          }
          labelText="Deny pub"
          value={DenyPub}
          onChange={setDenyPub}
        />
        <Input
          labelText="Allow pub response"
          hintText={
            "Set permissions to limit how often a client can publish to reply subjects"
          }
          name="subscriptions"
          value={user.nats?.pub.response}
          type={"number"}
          onChange={handleInputChange}
        />
        <InputTags
          onDelete={(type) =>
            setRmConn((prev) =>
              prev.includes(type) ? prev : [...prev, type]
            )
          }
          labelText="Conn_type"
          value={connType}
          onChange={setConnType}
        />
        <InputTags
          onDelete={(sub) =>
            setRm((prev) => (prev.includes(sub) ? prev : [...prev, sub]))
          }
          labelText="Allow sub"
          value={allowSub}
          onChange={setAllowSub}
        />
        <InputTags
          onDelete={(sub) =>
            setRm((prev) => (prev.includes(sub) ? prev : [...prev, sub]))
          }
          labelText="Deny sub"
          value={denySub}
          onChange={setDenySub}
        />
        <InputTags
          onDelete={(pub_sub) =>
            setRm((prev) =>
              prev.includes(pub_sub) ? prev : [...prev, pub_sub]
            )
          }
          labelText="Allow pub sub"
          value={denySub}
          onChange={setAllowPubSub}
        />
        <InputTags
          onDelete={(pub_sub) =>
            setRm((prev) =>
              prev.includes(pub_sub) ? prev : [...prev, pub_sub]
            )
          }
          labelText="Deny pub sub"
          value={denyPubSub}
          onChange={setDenyPubSub}
        />
        <DateInput
          placeholder="yyyy.mm.dd"
          name="start"
          hintText="Valid from"
          labelText="Start"
          value={state?.start}
          onChange={handleDateChange}
        />
        <DateInput
          placeholder="yyyy.mm.dd"
          name="expiry"
          hintText="Valid until"
          labelText="Expiry"
          value={state?.expiry}
          onChange={handleDateChange}
        />
        <InputTags
          onDelete={(source) =>
            setRmNetwork((prev) =>
              prev.includes(source) ? prev : [...prev, source]
            )
          }
          labelText="Source Network"
          value={sourceNet}
          onChange={setSourceNet}
        />
        <InputTags
          onDelete={(source) =>
            setRmTag((prev) =>
              prev.includes(source) ? prev : [...prev, source]
            )
          }
          labelText="Tag"
          value={tag}
          onChange={setTag}
        />
      </div>
    </Modal>
  );
};

export default EditUserModal;
