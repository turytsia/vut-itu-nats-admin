/**
 * @fileOverview AddDataFlowContextModal component.
 *
 * @exports AddDataFlowContextModal
 *
 * @version 1.0.0
 *
 * @module AddDataFlowContextModal
 *
 * @author  xbarza00
 */

import React, {ChangeEvent, useCallback, useState} from 'react'
import Input from '../../../components/Input/Input'
import Modal from '../../../components/Modal/Modal'
import {DataFlowType} from '../../../utils/axios'
import icons from '../../../utils/icons'


import classes from "./AddDataFlowContextModal.module.css"
import Select from "../../../components/Select/Select";
import { DataFlowContextFormType } from '../../../utils/types'

const protocolOptions = ["ws://", "wss://"];

type PropsType = {
    disableName?: boolean,
    title: string,
    textProceed: string,
    defaultForm?: DataFlowContextFormType
    error: string
    icon: icons,
    onClose: () => void
    onSubmit: (df: DataFlowContextFormType) => void
}

const initialData: DataFlowContextFormType = {
    name: '',
    server: '',
    port: '9000',
    protocol: 'ws://',
    location: ''
}

const AddDataFlowContext = ({
    title,
    textProceed,
    defaultForm,
    error,
    icon,
    disableName,
    onClose,
    onSubmit
}:PropsType) => {
    const [form, setForm] = useState(defaultForm ?? initialData)

    const onSave = () => {
        onSubmit(form)
    }

    const handleInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
        },
        []
    )

    const handleProtocolChange = (value: string | null) => {
        setForm(prev => ({ ...prev, protocol: value }))
    }

    return (
        <Modal
            error={error}
            title={title}
            textProceed={textProceed}
            textCancel="Cancel"
            icon={icon}
            onClose={onClose}
            onSubmit={onSave}>
            <div className={classes.container}>
                <Input
                    isRequired
                    disabled={disableName}
                    labelText="Name"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}/>
                <Select
                    isRequired
                    labelText='Protocol'
                    value={form.protocol}
                    items={protocolOptions.map(opt => ({ id: opt, value: opt }))}
                    name={"protocol"} className={classes.selectProtocol}
                    onChange={handleProtocolChange} />
                <Input
                    isRequired
                    labelText="Server Hostname"
                    hintText={"Server context will be bound and connected to"}
                    name="server"
                    value={form.server}
                    onChange={handleInputChange}
                    width={"100%"} />
                <Input
                    isRequired
                    labelText="Port"
                    hintText={"Port of the server context will be bound and connected to"}
                    name="port"
                    value={form.port}
                    type={"number"}
                    onChange={handleInputChange}
                    width={"100%"} />
                <Input
                    isRequired
                    labelText="Server Location"
                    hintText={"Address of a server"}
                    name="location"
                    value={form.location}
                    onChange={handleInputChange}
                    width={"100%"} />
                <div/>
            </div>
        </Modal>
    )
}

export default AddDataFlowContext