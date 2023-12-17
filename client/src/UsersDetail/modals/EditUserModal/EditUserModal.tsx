/**
 * Edit user modal
 *
 * @author xzhuka01
 */

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
import { NSCDateFormat, SecondsToMs } from "../../../utils/common";

/**
 * EditUserModal component props
 *
 * @param onClose - callback to close modal
 *
 * @param onSubmit - callback to submit form
 *
 * @param user - user to edit
 */
type PropsType = {
  onClose: () => void;
  onSubmit: (settings: UserPatchType) => void;
  user: UserType & UserPatchType;
  error: string;
};

/**
 * EditUserModal component
 *
 * @param onClose - callback to close modal
 *
 * @param onSubmit - callback to submit form
 *
 * @param user - user to edit
 *
 * @constructor
 */
const initialState: UserPayload = {
  account: "",
  name: "",
  operator: "",
  expiry: null,
  start: null,
  conn_type: "",
};

/**
 * EditUserModal component
 * @param onClose - callback to close modal
 * @param onSubmit - callback to submit form
 * @param initialUser - user to edit
 * @param error - error message
 * @constructor
 */
const EditUserModal = ({
  onClose,
  onSubmit,
  user: initialUser,
  error
}: PropsType) => {
  /**
   * HOOKS
   */

  // initial state for form inputs
  const [state, setState] = useState<UserPayload>({
    ...initialState,
    expiry: initialUser.exp ? new Date(SecondsToMs(initialUser.exp)).toISOString() : null,
    start: initialUser.nbf ? new Date(SecondsToMs(initialUser.nbf)).toISOString() : null
  });

  // initial state for form inputs
  const [user, setUser] = useState<UserPatchType & UserType>(initialUser);

  // hooks for form inputs
  const [isBearer, setIsBearer] = useState<boolean>(user.nats.bearer_token ?? false);
  const [allowPub, setAllowPub] = useState<string[]>(
    initialUser.nats.pub.allow ?? []
  );
  const [DenyPub, setDenyPub] = useState<string[]>(user.nats.pub.deny ?? []);
  const [allowPubResp, setAllowPubResp] = useState<string>(user.nats?.pub.response ?? "1");
  const [allowPubSub, setAllowPubSub] = useState<string[]>([]);
  const [denyPubSub, setDenyPubSub] = useState<string[]>([]);
  const [connType, setConnType] = useState<string[]>([]);
  const [sourceNet, setSourceNet] = useState<string[]>(user.nats.src ?? []);
  const [tag, setTag] = useState<string[]>(user.nats.tags ?? []);
  const [time, setTime] = useState<string[]>([]);

  const [data, setData] = useState<number>(user.nats.data ?? -1)
  const [subscriptions, setSubscriptions] = useState<number>(user.nats?.subs ?? -1)
  const [payload, setPayload] = useState<number>(user.nats.payload ?? -1)

  const [allowSub, setAllowSub] = useState<string[]>(
    initialUser.nats.sub.allow ?? []
  );
  const [denySub, setDenySub] = useState<string[]>(user?.nats.sub.deny ?? []);

  const [rm, setRm] = useState<string[]>([]);
  const [rmConn, setRmConn] = useState<string[]>([]);
  const [rmNetwork, setRmNetwork] = useState<string[]>([]);
  const [rmTag, setRmTag] = useState<string[]>([]);
  const [rmTime, setRmTime] = useState<string[]>([]);

  // on save format strings
  const onSave = () => {
    onSubmit({
      allow_pub: allowPub.join(","),
      deny_pub: DenyPub.join(","),

      allow_pub_response: allowPubResp,
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
      data: data.toString(),
      subs: subscriptions.toString(),
      payload: payload.toString()
    } as UserPatchType);
  };

  // on close reset state
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

  // render modal
  return (
    <Modal
      error={error}
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
          value={payload}
          type={"number"}
          onChange={e => setPayload(+e.target.value)}
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
          value={subscriptions}
          type={"number"}
          onChange={e => setSubscriptions(+e.target.value)}
        />
        <Input
          labelText="Data"
          hintText={"Set data for the user"}
          name="data"
          value={data}
          type={"number"}
          onChange={e => setData(+e.target.value)}
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
          value={allowPubResp}
          type={"number"}
          onChange={e => setAllowPubResp(e.target.value)}
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
