import { ExtendedAccountType } from "../pages/Accounts/Accounts"
import { ExtendedUserType } from "../pages/Users/Users"
import { DataFlowType, OperatorType } from "./axios"

export type RequestAccountType = {
    operator: string
    accounts: string[]
}

export type RequestUserType = {
    operator: string,
    account: string
    users: string[]
}

export type NSCDataType = {
    operators: OperatorType[],
    accounts: ExtendedAccountType[],
    users: ExtendedUserType[],
    dataflows: DataFlowType[]
}

export type RequestDashboardType = {
    dataflows: DataFlowType[]
    operators: { name: string }[]
    accounts: { operator: string, name: string }[]
    users: { operator: string, account: string, name: string }[]
}

export type DataFlowMapType = DataFlowType & {
    lat: number,
    long: number
}

export type DataFlowContextFormType = {
    name: string,
    server: string,
    port: string,
    protocol: string | null,
    location: string
}