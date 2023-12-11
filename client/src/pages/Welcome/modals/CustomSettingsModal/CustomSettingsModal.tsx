import React, { useState } from 'react'
import classes from "./CustomSettingsModal.module.css"
import Modal from '../../../../components/Modal/Modal'
import icons from '../../../../utils/icons'
import { NSCDataType } from '../../../../utils/types'
import Checkbox from '../../../../components/Checkbox/Checkbox'
import CheckboxList, { CheckboxListType } from "./components/CheckboxList/CheckboxList"
import { DataFlowType, NSCBaseType } from '../../../../utils/axios'
import uuid from 'react-uuid'

export type DashboardSettingsFormType = {
    operators: string[],
    accounts: string[],
    users: string[],
    dataflows: string[]
}

type PropsType = {
    error: string
    defaultForm?: DashboardSettingsFormType,
    data: NSCDataType
    onClose: () => void
    onSubmit: (form: DashboardSettingsFormType) => void
}

export const initialFormState: DashboardSettingsFormType = {
    operators: [],
    accounts: [],
    users: [],
    dataflows: []
}

const NSCBaseToCheckboxList = (data: NSCBaseType[]): CheckboxListType[] => {
    return data.map(({ name, sub }) => ({ id: sub, value: name }))
}

const DataflowToCheckboxList = (data: DataFlowType[]): CheckboxListType[] => {
    return data.map(({ name }) => ({ id: name, value: name }))
}

const CustomSettingsModal = ({
    defaultForm,
    data,
    onClose,
    onSubmit,
    error
}: PropsType) => {
    const [form, setForm] = useState<DashboardSettingsFormType>(defaultForm ?? initialFormState)

    const handleSubmit = () => {
        onSubmit(form)
    }

    const changeOperators = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({
            ...prev,
            operators: prev.operators.includes(e.target.name) ? prev.operators.filter(sub => sub !== e.target.name) : [...prev.operators, e.target.name]
        }))
    }

    const changeAccounts = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({
            ...prev,
            accounts: prev.accounts.includes(e.target.name) ? prev.accounts.filter(sub => sub !== e.target.name) : [...prev.accounts, e.target.name]
        }))
    }

    const changeUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({
            ...prev,
            users: prev.users.includes(e.target.name) ? prev.users.filter(sub => sub !== e.target.name) : [...prev.users, e.target.name]
        }))
    }

    const changeDataflows = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({
            ...prev,
            dataflows: prev.dataflows.includes(e.target.name) ? prev.dataflows.filter(sub => sub !== e.target.name) : [...prev.users, e.target.name]
        }))
    }

    console.log(form)


    return (
        <Modal
            error={error}
            title="Custom settings"
            textProceed='Save'
            textCancel='Cancel'
            icon={icons.settings}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <div className={classes.container}>
                <CheckboxList
                    values={form.operators}
                    title='Operators'
                    items={NSCBaseToCheckboxList(data.operators)}
                    onChange={changeOperators}
                />
                <CheckboxList
                    values={form.accounts}
                    title='Accounts'
                    items={NSCBaseToCheckboxList(data.accounts)}
                    onChange={changeAccounts}
                />
                <CheckboxList
                    values={form.users}
                    title='Users'
                    items={NSCBaseToCheckboxList(data.users)}
                    onChange={changeUsers}
                />
                <CheckboxList
                    values={form.dataflows}
                    title='Dataflows'
                    items={DataflowToCheckboxList(data.dataflows)}
                    onChange={changeDataflows}
                />
            </div>
        </Modal>
    )
}

export default CustomSettingsModal