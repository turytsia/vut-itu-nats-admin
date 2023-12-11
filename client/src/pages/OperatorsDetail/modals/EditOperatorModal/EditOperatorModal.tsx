import React, { useState } from 'react'

import icons from "../../../../utils/icons"
import Modal from "../../../../components/Modal/Modal"
import Input from "../../../../components/Input/Input"
import InputTags from "../../../../components/InputTags/InputTags"
import { OperatorPatchType, OperatorType } from '../../../../utils/axios'
import Checkbox from '../../../../components/Checkbox/Checkbox'

import classes from "./EditOperatorModal.module.css"

type PropsType = {
    onClose: () => void
    onSubmit: (settings: OperatorPatchType) => void
    operator: OperatorType
    error: string
}

export type EditOperatorType = {
    jwtServerUrl: string
    systemAccount: string
    tags: string[]
    serviceUrls: string[]
    isSigningKey: boolean
}

const EditOperatorModal = ({
    onClose,
    onSubmit,
    operator,
    error
}: PropsType) => {

    const [tags, setTags] = useState<string[]>(operator.nats.tags ?? [])

    const [jwtServerUrl, setJwtServerUrl] = useState<string>("")
    const [systemAccount, setSystemAccount] = useState<string>("")
    const [serviceUrls, setServerUrls] = useState<string[]>([])
    const [isSigningKey, setIsSigningKey] = useState<boolean>(false)

    const onSave = () => {
        onSubmit({
            account_jwt_server_url: null,
            require_signing_keys: false,
            rm_account_jwt_server_url: null,
            rm_service_url: null,
            rm_tag: null,
            service_url: null,
            system_account: null,
            tag: tags.join(",")
        } as OperatorPatchType)
    }

    return (
        <Modal
            title={"Update operator: " + operator.name}
            error={error}
            textProceed='Save'
            textCancel='Cancel'
            icon={icons.pen}
            onClose={onClose}
            onSubmit={onSave}>
            <div className={classes.container}>
                <Input
                    labelText="Account JWT server URL"
                    hintText='Account jwt server url for nsc sync (only http/https/nats urls supported if updating with nsc)'
                    value={jwtServerUrl}
                    onChange={(e) => setJwtServerUrl(e.target.value)} />
                <Input
                    labelText="System account"
                    hintText='System account by account by public key or name'
                    value={systemAccount}
                    onChange={(e) => setSystemAccount(e.target.value)} />
                <InputTags
                    labelText="Tags"
                    value={tags}
                    onChange={setTags} />
                <InputTags
                    labelText="Service URLs"
                    value={serviceUrls}
                    onChange={setServerUrls} />
                <Checkbox
                    labelText='Require signing keys'
                    hintText='Generate a signing key with the operator'
                    name='generateSigningKey'
                    value={isSigningKey}
                    onChange={(e) => setIsSigningKey(e.target.checked)} />
            </div>
        </Modal>
    )
}

export default EditOperatorModal