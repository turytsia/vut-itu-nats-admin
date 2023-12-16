import React, {ChangeEvent, useCallback, useState} from 'react'

import icons from "../../../../utils/icons"
import Modal from "../../../../components/Modal/Modal"
import Input from "../../../../components/Input/Input"
import {AccountPatchType, AccountType} from '../../../../utils/axios'

import classes from "./EditAccountModal.module.css"

type PropsType = {
    onClose: () => void
    onSubmit: (settings: AccountPatchType & AccountType) => void
    account: AccountPatchType & AccountType
}

export type EditAccountType = {
}

const EditAccountModal = ({
                              onClose,
                              onSubmit,
                              account: initialAccount
                          }: PropsType) => {

    const [account, setAccount] = useState<AccountPatchType & AccountType>(initialAccount)

    const onSave = () => {
        onSubmit(account)
    }

    const handleInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target
            setAccount(prev => ({...prev, [name]: value}))
        },
        []
    )

    return (
        <Modal
            title={"Update account: " + account.name}
            textProceed="Save"
            textCancel="Cancel"
            icon={icons.pen}
            onClose={onClose}
            onSubmit={onSave}>
            <div className={classes.container}>
                <Input
                    labelText="Description"
                    name="description"
                    value={account.nats.description}
                    onChange={handleInputChange}/>
                <Input
                    labelText="Payload"
                    hintText={"Set maximum message payload in bytes for the account (-1 is unlimited)"}
                    name="payload"
                    value={account.nats?.limits.payload}
                    type={"number"}
                    onChange={handleInputChange}/>
                <div/>
                <Input
                    labelText="Connections"
                    name="leaf_conns"
                    hintText={"Set maximum active leaf node connections for the account"}
                    value={account.nats?.limits.conn}
                    type={"number"}
                    onChange={handleInputChange}/>
                <div/>
                <Input
                    labelText="Leaf Connections"
                    name="leaf_conns"
                    hintText={"Set maximum active leaf node connections for the account"}
                    value={account.nats?.limits.leaf}
                    type={"number"}
                    onChange={handleInputChange}/>
                <div/>
                <Input
                    labelText="Data"
                    name="leaf_conns"
                    hintText={"Set maximum active leaf node connections for the account"}
                    value={account.nats?.limits.data}
                    type={"number"}
                    onChange={handleInputChange}/>
                <div/>
            </div>
        </Modal>
    )
}

export default EditAccountModal