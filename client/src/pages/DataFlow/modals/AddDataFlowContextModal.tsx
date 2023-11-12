import React, {ChangeEvent, useCallback, useState} from 'react'
import Input from '../../../components/Input/Input'
import Modal from '../../../components/Modal/Modal'
import {DataFlowType} from '../../../utils/axios'
import icons from '../../../utils/icons'


import classes from "./AddDataFlowContextModal.module.css"
import Select from "../../../components/Select/Select";

const protocolOptions = ["ws://", "wss://"];

type PropsType = {
    onClose: () => void
    onSubmit: (df: DataFlowType) => void
}

const AddDataFlowContext = ({onClose, onSubmit}: PropsType) => {
    const [name, setName] = useState<string>("")
    const [server, setServer] = useState<string>("")
    const [port, setPort] = useState<string>("9000")
    const [protocol, setProtocol] = useState<string>("ws://")

    const onSave = () => {
        onSubmit({
            name,
            server: protocol + server + ":" + port
        })
    }

    const handleInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target
            switch (name) {
                case "name":
                    setName(value)
                    break
                case "server":
                    setServer(value)
                    break
                case "port":
                    setPort(value)
                    break
            }
        },
        []
    )

    const handleProtocolChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const {value} = e.target
        setProtocol(value)
    }

    return (
        <Modal
            title={"New Data Flow Context"}
            textProceed="Add"
            textCancel="Cancel"
            icon={icons.pen}
            onClose={onClose}
            onSubmit={onSave}>
            <div className={classes.container}>
                <Input
                    labelText="Name"
                    name="name"
                    value={name}
                    onChange={handleInputChange}/>
                <div>
                    <div className={classes.serverContainer}>
                        <Select options={protocolOptions} name={"protocol"} className={classes.selectProtocol}
                        onChange={handleProtocolChange}/>
                        <div className={classes.horizontalSpacer}/>
                        <Input
                            labelText="Server Hostname"
                            hintText={"Server context will be bound and connected to"}
                            name="server"
                            value={server}
                            onChange={handleInputChange}
                            width={"100%"}/>
                        <div className={classes.horizontalSpacer}/>
                        <Input
                            labelText="Port"
                            hintText={"Port of the server context will be bound and connected to"}
                            name="port"
                            value={port}
                            type={"number"}
                            onChange={handleInputChange}
                            width={"100%"}/>
                    </div>
                </div>
                <div/>
            </div>
        </Modal>
    )
}

export default AddDataFlowContext