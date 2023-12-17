/**
 * @fileoverview Modal form component to create operator
 *
 * This file contains modal form component to create operator.
 *
 * @module CreateOperatorModal
 *
 * @author xbarza00
 */

import {ChangeEvent, useCallback, useState} from 'react'

import classes from "./CreateOperatorModal.module.css"

import {AccountPayloadType} from '../../../utils/axios'
import Modal from '../../../components/Modal/Modal'
import icons from '../../../utils/icons'
import DateInput from '../../../components/DateInput/DateInput'
import Input from '../../../components/Input/Input'
import Select from '../../../components/Select/Select'
import InputContainer from '../../../components/InputContainer/InputContainer'


type PropsType = {
    error: string
    onClose: () => void
    onSubmit: (state: AccountPayloadType) => void
    operatorList: string[]
    setErr: (err: string) => void
}

// initial state for form inputs
const initialState: AccountPayloadType = {
    "operator": null,
    "name": "",
    "expiry": null,
    "start": null,
    "allow_pub": null,
    "allow_pub_response": null,
    "allow_pubsub": null,
    "allow_sub": null,
    "deny_pub": null,
    "deny_pubsub": null,
    "deny_sub": null,
    "public_key": null,
    "response_ttl": null,
}

/**
 * Modal form component for creating operators.
 *
 * @param props - Component props.
 * @param props.onClose - Callback to close the modal.
 * @param props.onSubmit - Callback to submit the form.
 * @param props.error - Error message to display, if any.
 * @param props.operatorList - List of operators to select from.
 * @returns Modal form component.
 */
const CreateAccountModal = ({onClose, onSubmit, error, operatorList, setErr}: PropsType) => {
    // set active operator as default

    const [state, setState] = useState<AccountPayloadType>(initialState)

    /**
     * Handle input changes
     *
     * @param e - Input event
     */
    const handleInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
            setState(prev => ({...prev, [e.target.name]: e.target.value}))
        },
        []
    )

    const handleOperatorChange = (value: string | null) => {
        setState(prev => ({ ...prev, operator: value }))
    } 

    /**
     * Handle date changes
     *
     * @param date - Date value
     * @param name - Input date name
     */
    const handleDateChange = useCallback(
        (date: string, name: string) => {
            setState(prev => ({...prev, [name]: String(date)}))
        },
        []
    )

    /**
     * Handle form submission
     */
    const handleAccountModalSubmit = useCallback(
        () => {
            if (state.operator === null) {
                setErr("Error: Operator is required")
                return
            }
            if (state.name === "") {
                setErr("Error: Name is required")
                return
            }
            if (state.response_ttl !== null) {
                if (Number(state.response_ttl) < 0) {
                    setErr("Error: Response TTL must be positive")
                    return
                }
                state.response_ttl = String(Number(state.response_ttl)) + "s"
            }

            onSubmit(state)
        },
        [state, onSubmit]
    )

    return (
        <Modal
            error={error}
            title="Create new account"
            textProceed='Create'
            textCancel='Cancel'
            icon={icons.plus}
            onClose={onClose}
            onSubmit={handleAccountModalSubmit}>
            <div className={classes.container}>
                <Input
                    isRequired
                    labelText="Name"
                    name='name'
                    value={state.name}
                    onChange={handleInputChange} />
                <Select
                    labelText='Operator'
                    hintText="Operator under which the account will be created"
                    isRequired={true}
                    value={state.operator}
                    items={operatorList.map(name => ({ id: name, value: name }))}
                    name="operator"
                    onChange={handleOperatorChange}
                />
                <DateInput
                    placeholder='yyyy.mm.dd'
                    name='expiry'
                    hintText="Valid until"
                    labelText="Expiry"
                    value={state.expiry}
                    onChange={handleDateChange}/>
                <DateInput
                    placeholder='yyyy.mm.dd'
                    name='start'
                    hintText="Valid from"
                    labelText="Start"
                    value={state.start}
                    onChange={handleDateChange}/>
                <Input
                    labelText="Response TTL"
                    name='response_ttl'
                    value={state.response_ttl}
                    type={'number'}
                    onChange={handleInputChange}/>
                <Input
                    labelText="Allow Subscribe"
                    name='allow_sub'
                    value={state.allow_sub}
                    onChange={handleInputChange}/>
                <div/>
                <Input
                    labelText="Deny Subscribe"
                    name='deny_sub'
                    value={state.deny_sub}
                    onChange={handleInputChange}/>
                <div/>
            </div>
        </Modal>
    )
}

export default CreateAccountModal
