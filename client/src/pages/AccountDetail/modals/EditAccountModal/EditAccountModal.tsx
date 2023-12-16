import React, {ChangeEvent, useCallback, useState} from 'react'

import icons from "../../../../utils/icons"
import Modal from "../../../../components/Modal/Modal"
import Input from "../../../../components/Input/Input"
import {AccountPatchType, AccountType} from '../../../../utils/axios'

import classes from "./EditAccountModal.module.css"

type PropsType = {
    onClose: () => void
    onSubmit: (settings: AccountPatchType) => void
    account: AccountPatchType & AccountType
}

export type EditAccountType = {
}

const EditAccountModal = ({
                              onClose,
                              onSubmit,
                              account: initialAccount
                          }: PropsType) => {

    const [description, setDescription] = useState<string>(initialAccount.nats.description ?? "")
    const [payload, setPayload] = useState<number>(initialAccount.nats.limits.payload)
    const [leafConns, setLeafConns] = useState<number>(initialAccount.nats.limits.leaf)
    const [data, setData] = useState<number>(initialAccount.nats.limits.data)
    const [connections, setConnections] = useState<number>(initialAccount.nats.limits.conn)


    const onSave = () => {
        onSubmit({
            conns: connections.toString(),
            data: data.toString(),
            description: description,
            leaf_conns: leafConns.toString(),
            payload: payload.toString(),
            disallow_bearer: null,
            exports: null,
            imports: null,
            info_url: null,
            js_consumer: null,
            js_disk_storage: null,
            js_max_ack_pending: null,
            js_max_bytes_required: null,
            js_max_disk_stream: null,
            js_max_mem_stream: null,
            js_mem_storage: null,
            js_streams: null,
            js_tier: null,
            rm_js_tier: null,
            rm_sk: null,
            rm_tag: null,
            subscriptions: null,
            tag: null,
            wildcard_exports: null
        })
    }


    return (
        <Modal
            title={"Update account: " + initialAccount.name}
            textProceed="Save"
            textCancel="Cancel"
            icon={icons.pen}
            onClose={onClose}
            onSubmit={onSave}>
            <div className={classes.container}>
                <Input
                    labelText="Description"
                    name="description"
                    value={description}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}/>
                <Input
                    labelText="Payload"
                    hintText={"Set maximum message payload in bytes for the account (-1 is unlimited)"}
                    name="payload"
                    value={payload}
                    type={"number"}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPayload(parseInt(e.target.value))}/>
                <div/>
                <Input
                    labelText="Connections"
                    name="leaf_conns"
                    hintText={"Set maximum active leaf node connections for the account"}
                    value={connections}
                    type={"number"}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setConnections(parseInt(e.target.value))}/>
                <div/>
                <Input
                    labelText="Leaf Connections"
                    name="leaf_conns"
                    hintText={"Set maximum active leaf node connections for the account"}
                    value={leafConns}
                    type={"number"}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setLeafConns(parseInt(e.target.value))}/>
                <div/>
                <Input
                    labelText="Data"
                    name="data"
                    hintText={"Set maximum active leaf node connections for the account"}
                    value={data}
                    type={"number"}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setData(parseInt(e.target.value))}/>
                <div/>
            </div>
        </Modal>
    )
}

export default EditAccountModal