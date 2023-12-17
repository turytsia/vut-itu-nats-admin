import React, {ChangeEvent, useCallback, useState} from 'react'

import icons from "../../../../utils/icons"
import Modal from "../../../../components/Modal/Modal"
import Input from "../../../../components/Input/Input"
import {AccountPatchType, AccountType} from '../../../../utils/axios'

import classes from "./EditAccountModal.module.css"
import Checkbox from "../../../../components/Checkbox/Checkbox";

type PropsType = {
    error: string
    onClose: () => void
    onSubmit: (settings: AccountPatchType) => void
    account: AccountPatchType & AccountType
}

export type EditAccountType = {}

const EditAccountModal = ({
    error,
                              onClose,
                              onSubmit,
                              account: initialAccount
                          }: PropsType) => {

    const [description, setDescription] = useState<string>(initialAccount.nats.description ?? "")
    const [payload, setPayload] = useState<number>(initialAccount.nats.limits.payload)
    const [leafConns, setLeafConns] = useState<number>(initialAccount.nats.limits.leaf)
    const [data, setData] = useState<number>(initialAccount.nats.limits.data)
    const [connections, setConnections] = useState<number>(initialAccount.nats.limits.conn)
    const [disallowBearer, setDisallowBearer] = useState<boolean>(false)
    const [exports, setExports] = useState<number>(initialAccount.nats.limits.exports)
    const [imports, setImports] = useState<number>(initialAccount.nats.limits.imports)
    const [infoUrl, setInfoUrl] = useState<string>()
    const [jsConsumer, setJsConsumer] = useState<string>()
    const [jsDiskStorage, setJsDiskStorage] = useState<string>()
    const [jsMaxAckPending, setJsMaxAckPending] = useState<number>()
    const [jsMaxBytesRequired, setJsMaxBytesRequired] = useState<number>()
    const [jsMaxDiskStream, setJsMaxDiskStream] = useState<string>()
    const [jsMaxMemStream, setJsMaxMemStream] = useState<string>()
    const [jsMemStorage, setJsMemStorage] = useState<string>()
    const [jsStreams, setJsStreams] = useState<number>()
    const [jsTier, setJsTier] = useState<string>()
    const [rmJsTier, setRmJsTier] = useState<string>()
    const [rmSk, setRmSk] = useState<string>()
    const [rmTag, setRmTag] = useState<string>()
    const [tag, setTag] = useState<string>()
    const [subscriptions, setSubscriptions] = useState<string>("")
    const [wildcardExports, setWildcardExports] = useState<boolean>()

    const onSave = () => {
        onSubmit({
            conns: connections.toString(),
            data: data.toString(),
            description: description,
            leaf_conns: leafConns.toString(),
            payload: payload.toString(),
            disallow_bearer: disallowBearer,
            exports: exports.toString(),
            imports: imports.toString(),
            info_url: infoUrl?.toString() ?? null,
            js_consumer: jsConsumer?.toString() ?? null,
            js_disk_storage: jsDiskStorage?.toString() ?? null,
            js_max_ack_pending: jsMaxAckPending?.toString() ?? null,
            js_max_bytes_required: jsMaxBytesRequired?.toString() ?? null,
            js_max_disk_stream: jsMaxDiskStream?.toString() ?? null,
            js_max_mem_stream: jsMaxMemStream?.toString() ?? null,
            js_mem_storage: jsMemStorage?.toString() ?? null,
            js_streams: jsStreams?.toString() ?? null,
            js_tier:  jsTier?.toString() ?? null,
            rm_js_tier: rmJsTier?.toString() ?? null,
            rm_sk: rmSk?.toString() ?? null,
            rm_tag: rmTag?.toString() ?? null,
            subscriptions: subscriptions?.toString() ?? null,
            tag: tag?.toString() ?? null,
            wildcard_exports: wildcardExports ?? false,
        })
    }


    return (
        <Modal
            error={error}
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
                    hintText={"set maximum data in bytes for the account (-1 is unlimited)"}
                    value={data}
                    type={"number"}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setData(parseInt(e.target.value))}/>
                <div/>
                <Input
                    labelText="Tag"
                    name="tag"
                    hintText={"add tags for user - comma separated list or option can be specified multiple times"}
                    value={tag}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTag(e.target.value)}/>
                <div/>
                <Input
                    labelText="Info URL"
                    name="info_url"
                    hintText={"Link for more info on this account"}
                    value={infoUrl}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setInfoUrl(e.target.value)}/>
                <div/>
                <Input
                    labelText="JS Tier"
                    name="js_tier"
                    hintText={"JetStream: replication tier (0 creates a configuration that applies to all assets)"}
                    value={jsTier}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setJsTier(e.target.value)}/>
                <div/>
                <Input
                    labelText="JS Max Ack Pending"
                    name="js_max_ack_pending"
                    type={"number"}
                    hintText={"JetStream: maximum number of outstanding acks allowed"}
                    value={jsMaxAckPending ?? ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setJsMaxAckPending(parseInt(e.target.value))}/>
                <div/>
                <Input
                    labelText="JS Max Bytes Required"
                    name="js_max_bytes_required"
                    hintText={"JetStream: set whether max stream is required when creating a stream"}
                    type={"number"}
                    value={jsMaxBytesRequired ?? ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setJsMaxBytesRequired(parseInt(e.target.value))}/>
                <div/>
                <Input
                    labelText="JS Max Disk Storage"
                    name="js_max_disk_storage"
                    hintText={"JetStream: set maximum size of a disk stream for the account. (-1 is unlimited / 0 disabled) (units: k/m/g/t kib/mib/gib/tib)"}
                    value={jsMaxDiskStream ?? ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setJsMaxDiskStream(e.target.value)}/>
                <div/>
                <Input
                    labelText="JS Max Mem Storage"
                    name="js_max_mem_storage"
                    hintText={"JetStream: set maximum size of a memory stream for the account (-1 is unlimited / 0 disabled) (units: k/m/g/t kib/mib/gib/tib)"}
                    value={jsMaxMemStream ?? ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setJsMaxMemStream(e.target.value)}/>
                <div/>
                <Input
                    labelText="JS Streams"
                    name="js_streams"
                    type={"number"}
                    hintText={"JetStream: set maximum streams for the account (-1 is unlimited)"}
                    value={jsStreams ?? ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setJsStreams(parseInt(e.target.value))}/>
                <div/>
                <Input
                    labelText="JS Consumer"
                    name="js_consumer"
                    value={jsConsumer ?? ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setJsConsumer(e.target.value)}/>
                <div/>
                <Input
                    labelText="JS Mem Storage"
                    name="js_mem_storage"
                    hintText={"JetStream: set maximum size of a memory stream for the account (-1 is unlimited / 0 disabled) (units: k/m/g/t kib/mib/gib/tib)"}
                    value={jsMemStorage ?? ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setJsMemStorage(e.target.value)}/>
                <div/>
                <Checkbox
                    labelText="Disallow Bearer"
                    hintText={"require user jwt to not be bearer token"}
                    name="disallow_bearer"
                    value={disallowBearer}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDisallowBearer(e.target.checked)}/>
                <div/>
                <Input
                    labelText="Subscriptions"
                    name="subscriptions"
                    hintText={"set maximum subscription for the account (-1 is unlimited)"}
                    type={"number"}
                    value={subscriptions ?? ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSubscriptions(e.target.value)}/>
                <div/>
                <Input
                    labelText="Exports"
                    name="exports"
                    hintText={"set maximum number of exports for the account (-1 is unlimited)"}
                    type={"number"}
                    value={exports ?? ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setExports(parseInt(e.target.value))}/>
                <div/>
                <Input
                    labelText="Imports"
                    name="imports"
                    hintText={"set maximum number of imports for the account (-1 is unlimited)"}
                    type={"number"}
                    value={imports ?? ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setImports(parseInt(e.target.value))}/>
                <div/>
            </div>
        </Modal>
    )
}

export default EditAccountModal