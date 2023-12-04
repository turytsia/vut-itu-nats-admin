import { ExtendedAccountType } from "../pages/Accounts/Accounts"
import { ExtendedUserType } from "../pages/Users/Users"
import { OperatorType } from "./axios"

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
    users: ExtendedUserType[]
}