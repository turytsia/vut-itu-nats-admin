import React, { ChangeEvent, useState } from 'react'
import classes from "./CustomSettingsModal.module.css"
import Modal from '../../../../components/Modal/Modal'
import icons from '../../../../utils/icons'
import { NSCDataType } from '../../../../utils/types'
import Checkbox from '../../../../components/Checkbox/Checkbox'
import CheckboxList, { CheckboxListType } from "./components/CheckboxList/CheckboxList"
import { DataFlowType, NSCBaseType } from '../../../../utils/axios'
import uuid from 'react-uuid'
import Input from '../../../../components/Input/Input'

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
    const [search, setSearch] = useState("")

    const handleSubmit = () => {
        onSubmit(form)
    }


    const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
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

    const filteredData = {
        operators: data.operators.filter(({name}) => name.trim().toLowerCase().includes(search.trim().toLowerCase())),
        accounts: data.accounts.filter(({ name }) => name.trim().toLowerCase().includes(search.trim().toLowerCase())),
        users: data.users.filter(({ name }) => name.trim().toLowerCase().includes(search.trim().toLowerCase())),
        dataflows: data.dataflows.filter(({ name }) => name.trim().toLowerCase().includes(search.trim().toLowerCase())),
    } as NSCDataType  

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
                <Input className={classes.search} value={search} onChange={changeSearch} placeholder='Search...' />
                {filteredData.operators.length > 0 && (
                    <CheckboxList
                        values={form.operators}
                        title='Operators'
                        items={NSCBaseToCheckboxList(filteredData.operators)}
                        onChange={changeOperators}
                    />
                )}
                {filteredData.accounts.length > 0 && (
                    <CheckboxList
                        values={form.accounts}
                        title='Accounts'
                        items={NSCBaseToCheckboxList(filteredData.accounts)}
                        onChange={changeAccounts}
                    />
                )}
                {filteredData.users.length > 0 && (
                    <CheckboxList
                        values={form.users}
                        title='Users'
                        items={NSCBaseToCheckboxList(filteredData.users)}
                        onChange={changeUsers}
                    />
                )}
                {filteredData.dataflows.length > 0 && (
                    <CheckboxList
                        values={form.dataflows}
                        title='Dataflows'
                        items={DataflowToCheckboxList(filteredData.dataflows)}
                        onChange={changeDataflows}
                    />
                )}
            </div>
        </Modal>
    )
}

export default CustomSettingsModal