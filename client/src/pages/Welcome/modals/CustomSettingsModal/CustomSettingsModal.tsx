import React, { ChangeEvent, useState } from 'react'
import classes from "./CustomSettingsModal.module.css"
import Modal from '../../../../components/Modal/Modal'
import icons from '../../../../utils/icons'
import { NSCDataType, RequestDashboardType } from '../../../../utils/types'
import Checkbox from '../../../../components/Checkbox/Checkbox'
import CheckboxList, { CheckboxListType } from "./components/CheckboxList/CheckboxList"
import { DataFlowType, NSCBaseType, OperatorType } from '../../../../utils/axios'
import uuid from 'react-uuid'
import Input from '../../../../components/Input/Input'
import { ExtendedAccountType } from '../../../Accounts/Accounts'
import { ExtendedUserType } from '../../../Users/Users'

export type DashboardSettingsFormType = {
    operators: string[],
    accounts: string[],
    users: string[],
    dataflows: string[]
}

type PropsType = {
    error: string
    defaultForm?: RequestDashboardType,
    data: NSCDataType
    onClose: () => void
    onSubmit: (form: RequestDashboardType) => void
}

export const initialFormState: RequestDashboardType = {
    operators: [],
    accounts: [],
    users: [],
    dataflows: []
}

const NSCBaseToCheckboxList = (data: NSCBaseType[], type: "operator" | "account" | "user"): CheckboxListType[] => {
    switch (type) {
        case "operator":
            return data.map(({ name }) => ({ id: name, value: name }))
        case "account":
            return (data as ExtendedAccountType[]).map(({ operator, name }) => ({
                id: `${operator} / ${name}`, value: `${operator} / ${name}`
            }))
        case "user":
            return (data as ExtendedUserType[]).map(({ operator, account, name }) => ({
                id: `${operator} / ${account} / ${name}`, value: `${operator} / ${account} / ${name}`
            }))
    }
}

const DataflowToCheckboxList = (data: DataFlowType[]): CheckboxListType[] => {
    return data.map(({ name }) => ({ id: name, value: name }))
}

const getOperatorValues = (operators: { name: string }[]) => {
    return operators.map(({ name }) => name)
}

const getAccountValues = (accounts: { operator: string, name: string }[]) => {
    return accounts.map(({ operator, name }) => `${operator} / ${name}`)
}

const getUsersValues = (users: { operator: string, account: string, name: string }[]) => {
    return users.map(({ operator, account, name }) => `${operator} / ${account} / ${name}`)
}

const getDataflowValues = (dataflows: { name: string }[]) => {
    return dataflows.map(({ name }) => name)
}

const CustomSettingsModal = ({
    defaultForm,
    data,
    onClose,
    onSubmit,
    error
}: PropsType) => {
    const [form, setForm] = useState<RequestDashboardType>(defaultForm ?? initialFormState)
    const [search, setSearch] = useState("")

    const handleSubmit = () => {
        onSubmit(form)
    }


    const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const changeOperators = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        setForm(prev => ({
            ...prev,
            operators: prev.operators.find(({ name: n }) => n === name) ? prev.operators.filter(({ name: n }) => n !== name) : [...prev.operators, filteredData.operators.find(({ name: n }) => n === name)!]
        }))
    }

    const changeAccounts = (e: React.ChangeEvent<HTMLInputElement>) => {
        const [operator, name] = e.target.name.split(" / ")

        setForm(prev => ({
            ...prev,
            accounts: prev.accounts.find(({ operator: o, name: n }) => n === name && o === operator) ? prev.accounts.filter(({ operator: o, name: n }) => o !== operator && n !== name) : [...prev.accounts, filteredData.accounts.find(({ operator:o, name: n }) => o === operator && n === name)!]
        }))
    }

    const changeUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
        const [operator, account, name] = e.target.name.split(" / ")
        setForm(prev => ({
            ...prev,
            users: prev.users.find(({ operator: o, account: a, name: n }) => n === name && a === account && o === operator) ? prev.users.filter(({ operator: o, account: a, name: n }) => o !== operator && a === account && n !== name) : [...prev.users, filteredData.users.find(({ operator: o, account: a, name: n }) => o === operator && a === account && n === name)!]
        }))
    }

    const changeDataflows = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({
            ...prev,
            dataflows: prev.dataflows.find(({ name }) => name === e.target.name) ? prev.dataflows.filter(({ name }) => name !== e.target.name) : [...prev.dataflows, filteredData.dataflows.find(({ name }) => e.target.name=== name)!]
        }))
    }

    const filteredData = {
        operators: data.operators.filter(({ name }) => name.trim().toLowerCase().includes(search.trim().toLowerCase())),
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
                        values={getOperatorValues(form.operators)}
                        title='Operators'
                        items={NSCBaseToCheckboxList(filteredData.operators, "operator")}
                        onChange={changeOperators}
                    />
                )}
                {filteredData.accounts.length > 0 && (
                    <CheckboxList
                        values={getAccountValues(form.accounts)}
                        title='Accounts'
                        items={NSCBaseToCheckboxList(filteredData.accounts, "account")}
                        onChange={changeAccounts}
                    />
                )}
                {filteredData.users.length > 0 && (
                    <CheckboxList
                        values={getUsersValues(form.users)}
                        title='Users'
                        items={NSCBaseToCheckboxList(filteredData.users, "user")}
                        onChange={changeUsers}
                    />
                )}
                {filteredData.dataflows.length > 0 && (
                    <CheckboxList
                        values={getDataflowValues(form.dataflows)}
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