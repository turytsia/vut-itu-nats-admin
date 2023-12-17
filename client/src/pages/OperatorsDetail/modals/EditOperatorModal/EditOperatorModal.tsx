import React, { useEffect, useState } from "react";

import icons from "../../../../utils/icons";
import Modal from "../../../../components/Modal/Modal";
import Input from "../../../../components/Input/Input";
import InputTags from "../../../../components/InputTags/InputTags";
import {
  AccountType,
  OperatorPatchType,
  OperatorType,
} from "../../../../utils/axios";
import Checkbox from "../../../../components/Checkbox/Checkbox";

import classes from "./EditOperatorModal.module.css";
import Select from "../../../../components/Select/Select";
import { request } from "../../../../context/AppContextProvider";
import { RequestAccountType } from "../../../../utils/types";
import { DropdownItemType } from "../../../../components/Dropdown/Dropdown";

type PropsType = {
  onClose: () => void;
  onSubmit: (settings: OperatorPatchType) => void;
  operator: OperatorType;
  error: string;
};

export type EditOperatorType = {
  jwtServerUrl: string;
  systemAccount: string;
  tags: string[];
  serviceUrls: string[];
  isSigningKey: boolean;
};

const EditOperatorModal = ({
  onClose,
  onSubmit,
  operator,
  error,
}: PropsType) => {
  const [accounts, setAccounts] = useState<DropdownItemType[]>([]);

  const [tags, setTags] = useState<string[]>(operator.nats.tags ?? []);
  const [rmTags, setRmTags] = useState<string[]>([]);

  const [jwtServerUrl, setJwtServerUrl] = useState<string>(
    operator.nats.account_server_url ?? ""
  );

  const [systemAccount, setSystemAccount] = useState<string>(
    operator.nats.system_account ?? ""
  );



  const [serviceUrls, setServiceUrls] = useState<string[]>(
    operator.nats.operator_service_urls ?? []
  );
  const [rmServiceUrls, setRmServiceUrls] = useState<string[]>([]);

  const [isSigningKey, setIsSigningKey] = useState<boolean>(false);

  const onSave = () => {
    onSubmit({
      account_jwt_server_url: jwtServerUrl,
      require_signing_keys: isSigningKey,
      rm_account_jwt_server_url:
        jwtServerUrl === "" ? operator.nats.account_server_url : null,
      rm_service_url: rmServiceUrls.join(","),
      rm_tag: rmTags.join(","),
      service_url: serviceUrls.join(","),
      system_account: systemAccount,
      tag: tags.join(","),
    } as OperatorPatchType);
  };

  const fetchAccounts = async () => {
    try {
      const { accounts } = await request.get.accounts(operator.name);

      const accountResponses = await Promise.allSettled(
        accounts.map(
          async (name) => await request.get.account(operator.name, name)
        )
      );

      const fulfilledAccountResponses = accountResponses
        .filter(
          (r): r is PromiseFulfilledResult<any> => r.status === "fulfilled"
        )
        .map(({ value }) => value);

      setAccounts(
        fulfilledAccountResponses.map(({ name, sub }) => ({
          id: sub,
          value: name,
        }))
      );
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <Modal
      title={"Update operator: " + operator.name}
      error={error}
      textProceed="Save"
      textCancel="Cancel"
      icon={icons.pen}
      onClose={onClose}
      onSubmit={onSave}
    >
      <div className={classes.container}>
        <Input
          labelText="Account JWT server URL"
          hintText="Account jwt server url for nsc sync (only http/https/nats urls supported if updating with nsc)"
          value={jwtServerUrl}
          onChange={(e) => setJwtServerUrl(e.target.value)}
        />
        <Select
          labelText="System account"
          hintText="System account by account by public key or name"
          value={systemAccount}
          onChange={(value, name) => setSystemAccount(value as string)}
          items={accounts}
          name={""}
        />
        <InputTags
          onDelete={(tag) =>
            setRmTags((prev) => (prev.includes(tag) ? prev : [...prev, tag]))
          }
          labelText="Tags"
          value={tags}
          onChange={setTags}
        />
        <InputTags
          onDelete={(tag) =>
            setRmServiceUrls((prev) =>
              prev.includes(tag) ? prev : [...prev, tag]
            )
          }
          labelText="Service URLs"
          value={serviceUrls}
          onChange={setServiceUrls}
        />
        <Checkbox
          labelText="Require signing keys"
          hintText="Generate a signing key with the operator"
          name="generateSigningKey"
          value={isSigningKey}
          onChange={(e) => setIsSigningKey(e.target.checked)}
        />
      </div>
      
    </Modal>
    
  );
  
};

export default EditOperatorModal;
