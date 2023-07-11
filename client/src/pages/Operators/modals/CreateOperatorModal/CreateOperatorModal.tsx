import React, { ChangeEvent, useCallback, useState } from 'react'
import icons from '../../../../utils/icons'
import Modal from '../../../../components/Modal/Modal'
import Input from '../../../../components/Input/Input'
import Checkbox from '../../../../components/Checkbox/Checkbox'
import DateInput from '../../../../components/DateInput/DateInput'

import classes from "./CreateOperatorModal.module.css"

export type OperatorInputTypes = {
    name: string,
    expiry: null | string,
    start: null | string,
    generateSigningKey: boolean,
    sys: boolean,
    force: boolean
}

type PropsType = {
    onClose: () => void
    onSubmit: (state: OperatorInputTypes) => void
}

const initialState: OperatorInputTypes = {
    name: "",
    expiry: null,
    start: null,
    generateSigningKey: false,
    sys: false,
    force: false
}

const CreateOperatorModal = ({
    onClose,
    onSubmit: _onSubmit
}: PropsType) => {

    const [state, setState] = useState<OperatorInputTypes>(initialState)

    const onChangeInput = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setState(prev => ({ ...prev, [e.target.name]: e.target.value }))
        },
        []
    )

    const onChangeDate = useCallback(
        (date: string, name: string) => {
            setState(prev => ({ ...prev, [name]: String(date) }))
        },
        []
    )

    const onChangeCheckbox = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setState(prev => ({ ...prev, [e.target.name]: e.target.checked }))
        },
        []
    )

    const onSubmit = useCallback(
        () => {
            _onSubmit(state)
        },
        [state]
    )

    return (
        <Modal
            title="Create new operator"
            textProceed='Create'
            textCancel='Cancel'
            icon={icons.plus}
            onClose={onClose}
            onSubmit={onSubmit}>
            <div className={classes.container}>
                <Input
                    isRequired
                    labelText="Name"
                    name='name'
                    value={state.name}
                    onChange={onChangeInput} />
                <DateInput
                    placeholder='yyyy.mm.dd'
                    name='expiry'
                    hintText="Valid until"
                    labelText="Expiry"
                    value={state.expiry}
                    onChange={onChangeDate} />
                <DateInput
                    placeholder='yyyy.mm.dd'
                    name='start'
                    hintText="Valid from"
                    labelText="Start"
                    value={state.start}
                    onChange={onChangeDate} />
                <div />
                <Checkbox
                    labelText='Generate signing key'
                    hintText='Generate a signing key with the operator'
                    name='generateSigningKey'
                    value={state.generateSigningKey}
                    onChange={onChangeCheckbox} />
                <Checkbox
                    labelText='Sys'
                    hintText='Generate system account with the operator (if specified will be signed with signing key)'
                    name='sys'
                    value={state.sys}
                    onChange={onChangeCheckbox} />
                <Checkbox
                    labelText='Force'
                    hintText='On import, overwrite existing when already present'
                    name='force'
                    value={state.force}
                    onChange={onChangeCheckbox} />
            </div>
        </Modal>
    )
}

export default CreateOperatorModal