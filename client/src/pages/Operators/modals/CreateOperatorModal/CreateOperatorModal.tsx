/**
 * @fileoverview Modal form component to create operator
 *
 * This file contains modal form component to create operator.
 *
 * @module CreateOperatorModal
 * 
 * @author xturyt00
 */
import { ChangeEvent, useCallback, useState } from 'react'
import { OperatorPayloadType } from '../../../../utils/axios'
import icons from '../../../../utils/icons'

import classes from "./CreateOperatorModal.module.css"

// components
import Modal from '../../../../components/Modal/Modal'
import Input from '../../../../components/Input/Input'
import Checkbox from '../../../../components/Checkbox/Checkbox'
import DateInput from '../../../../components/DateInput/DateInput'

type PropsType = {
    error: string
    onClose: () => void
    onSubmit: (state: OperatorPayloadType) => void
}

// initial state for form inputs
const initialState: OperatorPayloadType = {
    "name": "",
    "expiry": null,
    "start": null,
    "generate_signing_key": false,
    "sys": false,
    "force": false
}

/**
 * Modal form component for creating operators.
 *
 * @param props - Component props.
 * @param props.onClose - Callback to close the modal.
 * @param props.onSubmit - Callback to submit the form.
 * @param props.error - Error message to display, if any.
 * @returns Modal form component.
 */
const CreateOperatorModal = ({
    onClose,
    onSubmit,
    error,
}: PropsType) => {

    const [state, setState] = useState<OperatorPayloadType>(initialState)
    
    /**
     * Handle input changes
     * 
     * @param e - Input event
     */
    const handleInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setState(prev => ({ ...prev, [e.target.name]: e.target.value }))
        },
        []
    )
    
    /**
     * Handle date changes
     * 
     * @param date - Date value
     * @param name - Input date name
     */
    const handleDateChange = useCallback(
        (date: string, name: string) => {
            setState(prev => ({ ...prev, [name]: String(date) }))
        },
        []
    )
    
    /**
     * Handle checkbox changes
     * 
     * @param e - Checkbox input event
     */
    const handleCheckboxChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setState(prev => ({ ...prev, [e.target.name]: e.target.checked }))
        },
        []
    )
    
    /**
     * Handle form submission
     */
    const handleSubmit = useCallback(
        () => {
            onSubmit(state)
        },
        [state, onSubmit]
    )

    return (
        <Modal
            error={error}
            title="Create new operator"
            textProceed='Create'
            textCancel='Cancel'
            icon={icons.plus}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <div className={classes.container}>
                <Input
                    isRequired
                    labelText="Name"
                    name='name'
                    value={state.name}
                    onChange={handleInputChange} />
                <DateInput
                    placeholder='yyyy.mm.dd'
                    name='expiry'
                    hintText="Valid until"
                    labelText="Expiry"
                    value={state.expiry}
                    onChange={handleDateChange} />
                <DateInput
                    placeholder='yyyy.mm.dd'
                    name='start'
                    hintText="Valid from"
                    labelText="Start"
                    value={state.start}
                    onChange={handleDateChange} />
                <div />
                <Checkbox
                    labelText='Generate signing key'
                    hintText='Generate a signing key with the operator'
                    name='generate_signing_key'
                    value={state["generate_signing_key"]}
                    onChange={handleCheckboxChange} />
                <Checkbox
                    labelText='Sys'
                    hintText='Generate system account with the operator (if specified will be signed with signing key)'
                    name='sys'
                    value={state.sys}
                    onChange={handleCheckboxChange} />
                <Checkbox
                    labelText='Force'
                    hintText='On import, overwrite existing when already present'
                    name='force'
                    value={state.force}
                    onChange={handleCheckboxChange} />
            </div>
        </Modal>
    )
}

export default CreateOperatorModal
