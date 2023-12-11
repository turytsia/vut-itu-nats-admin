/**
 * @fileoverview Implementation for the common functions and classes
 *
 * This file contains implementation of the common functions and
 * classes that can be used in any file, component, function etc.
 *
 * @module common
 * 
 * @author xturyt00
 */
import { timeFormat } from "d3-time-format"
import { request } from "../context/AppContextProvider"
import { AccountType, OperatorType } from "./axios"
import { ExtendedAccountType } from "../pages/Accounts/Accounts"
import { DataFlowContextFormType, NSCDataType, RequestAccountType, RequestUserType } from "./types"
import { ExtendedUserType } from "../pages/Users/Users"
import { NatsConnection, connect } from "nats.ws"

/** 
 * Possible placements for floating elements 
 */
export enum placements {
    TOP = "top",
    RIGHT = "right",
    BOTTOM = "bottom",
    LEFT = "left",
}

/**
 * Converts date string or miliseconds into timestamp format
 * 
 * @param date - Date string or miliseconds
 * @returns Timestamp format string
 */
export const timesecondsFormat = (date: string | number) => {
    const format = timeFormat("%H:%M:%S %Y.%m.%d")
    return format(new Date(date))
}

/**
 * Converts date string or miliseconds into date format
 * 
 * @param date - Date string or miliseconds
 * @returns Date format string
 */
export const dateFormat = (date: string | number) => {
    if (!date) return ""
    const format = timeFormat("%Y.%m.%d")
    return format(new Date(date))
}

export const datetimeFormat = (date: string | number) => {
    if (!date) return ""
    const format = timeFormat("%Y.%m.%d %H:%M:%S")
    return format(new Date(date))
}

export const fetchOperators = async (): Promise<OperatorType[]> => {
    const { operators } = await request.get.operators();

    // Fetch operator details concurrently using Promise.allSettled
    const responses = await Promise.allSettled(
        operators.map(async (name) => await request.get.operator(name))
    );

    // Filter out fulfilled promises and extract their values
    return responses
        .filter((r): r is PromiseFulfilledResult<OperatorType> => r.status === "fulfilled")
        .map((r) => r.value)
        .filter((v) => v);
}

export const fetchAccounts = async (): Promise<ExtendedAccountType[]> => {
    const operatorsResponse = await request.get.operators()

    const fulfilledOperatorsResponse = await Promise.allSettled(
        operatorsResponse.operators.map(async (operator: string) => ({
            operator,
            accounts: (await request.get.accounts(operator)).accounts
        }))
    )

    const accountNames = fulfilledOperatorsResponse
        .filter((r): r is PromiseFulfilledResult<RequestAccountType> => r.status === "fulfilled")
        .flatMap(({ value }) => value)
        .filter((v) => v.accounts)

    const accountResponses = await Promise.allSettled(
        accountNames.map(async (accountRequest: RequestAccountType) => {
            const operator = accountRequest.operator

            const responses = await Promise.allSettled(
                accountRequest.accounts.map(async (account: string) => await request.get.account(operator, account))
            )

            return responses
                .filter((r): r is PromiseFulfilledResult<ExtendedAccountType> => r.status === "fulfilled")
                .flatMap(({ value }) => ({ ...value, operator }))
                .filter((v) => v)
        })
    )


    return accountResponses
        .filter((r): r is PromiseFulfilledResult<ExtendedAccountType[]> => r.status === "fulfilled")
        .flatMap(({ value }) => value)
        .filter((v) => v)
}

export const fetchUsers = async (): Promise<ExtendedUserType[]> => {
    const operatorsResponse = await request.get.operators()

    const fulfilledOperatorsResponse = await Promise.allSettled(
        operatorsResponse.operators.map(async (operator: string) => ({
            operator,
            accounts: (await request.get.accounts(operator)).accounts
        }))
    )

    const accountNames = fulfilledOperatorsResponse
        .filter((r): r is PromiseFulfilledResult<RequestAccountType> => r.status === "fulfilled")
        .map(({ value }) => value)
        .filter((v) => v)

    const userResponses = 
        await Promise.allSettled(
            accountNames.map(async (accountRequest: RequestAccountType) => {
                const operator = accountRequest.operator

                const responses = await Promise.allSettled(
                    accountRequest.accounts.map(async (account: string) => {

                        return {
                            operator,
                            account,
                            users: (await request.get.users(operator, account)).users
                        }
                    })
                )

                const userNameResponses = responses
                    .filter((r): r is PromiseFulfilledResult<RequestUserType> => r.status === "fulfilled")
                    .map(({ value }) => value)
                    .filter((v) => v)

                const userResponses =
                    await Promise.allSettled(
                        userNameResponses.flatMap(async ({ operator, account, users }) => {
                            const responses = await Promise.allSettled(
                                users.map(async name => {
                                    const user = await request.get.user(operator, account, name)

                                    return { ...user, operator, account } as ExtendedUserType
                                }) as Promise<ExtendedUserType>[]
                            )

                            return responses
                                .filter((r): r is PromiseFulfilledResult<ExtendedUserType> => r.status === "fulfilled")
                                .map(({ value }) => value)
                                .filter((v) => v)
                        }))

                return userResponses
                    .filter((r): r is PromiseFulfilledResult<ExtendedUserType[]> => r.status === "fulfilled")
                    .map(({ value }) => value)
                    .flat(1)
                    .filter((v) => v)
            })
        )
    


    return userResponses
        .filter((r): r is PromiseFulfilledResult<ExtendedUserType[]> => r.status === "fulfilled")
        .map(({ value }) => value)
        .flat(1)
        .filter((v) => v)
}

export const fetchAll = async (): Promise<NSCDataType> => {
    const operatorsResponse = await request.get.operators()

    const operatorsSettled = await Promise.allSettled(
        operatorsResponse.operators.map(async operator => await request.get.operator(operator))
    )

    const operators = operatorsSettled
        .filter((r): r is PromiseFulfilledResult<OperatorType> => r.status === "fulfilled")
        .map(({ value }) => value)
        .filter((v) => v)

    const accountNamesSettled = await Promise.allSettled(
        operatorsResponse.operators.map(async (operator: string) => ({
            operator,
            accounts: (await request.get.accounts(operator)).accounts
        } as RequestAccountType))
    )

    const accountNamesFulfilled = accountNamesSettled
        .filter((r): r is PromiseFulfilledResult<RequestAccountType> => r.status === "fulfilled")
        .flatMap(({ value }) => value)
        .filter((v) => v)

    const accountResponses = await Promise.allSettled(
        accountNamesFulfilled.map(async (accountRequest: RequestAccountType) => {
            const operator = accountRequest.operator

            const responses = await Promise.allSettled(
                accountRequest.accounts.map(async (account: string) => await request.get.account(operator, account))
            )

            return responses
                .filter((r): r is PromiseFulfilledResult<ExtendedAccountType> => r.status === "fulfilled")
                .flatMap(({ value }) => ({ ...value, operator }))
                .filter((v) => v)
        }))
    


    const accounts = accountResponses
        .filter((r): r is PromiseFulfilledResult<ExtendedAccountType[]> => r.status === "fulfilled")
        .flatMap(({ value }) => value)
        .filter((v) => v)

    const userResponses =
        await Promise.allSettled(
            accountNamesFulfilled.map(async (accountRequest: RequestAccountType) => {
                const operator = accountRequest.operator

                const responses = await Promise.allSettled(
                    accountRequest.accounts.map(async (account: string) => {

                        return {
                            operator,
                            account,
                            users: (await request.get.users(operator, account)).users
                        }
                    })
                )

                const userNameResponses = responses
                    .filter((r): r is PromiseFulfilledResult<RequestUserType> => r.status === "fulfilled")
                    .map(({ value }) => value)
                    .filter((v) => v)

                const userResponses =
                    await Promise.allSettled(
                        userNameResponses.flatMap(async ({ operator, account, users }) => {
                            const responses = await Promise.allSettled(
                                users.map(async name => {
                                    const user = await request.get.user(operator, account, name)

                                    return { ...user, operator, account } as ExtendedUserType
                                }) as Promise<ExtendedUserType>[]
                            )

                            return responses
                                .filter((r): r is PromiseFulfilledResult<ExtendedUserType> => r.status === "fulfilled")
                                .map(({ value }) => value)
                                .filter((v) => v)
                        }))

                return userResponses
                    .filter((r): r is PromiseFulfilledResult<ExtendedUserType[]> => r.status === "fulfilled")
                    .map(({ value }) => value)
                    .flat(1)
                    .filter((v) => v)
            })
        )

    const users = userResponses
        .filter((r): r is PromiseFulfilledResult<ExtendedUserType[]> => r.status === "fulfilled")
        .map(({ value }) => value)
        .flat(1)
        .filter((v) => v)
    
    const dataflowsResponse = await request.get.dataflows();

    const dataflows = dataflowsResponse.dataflows ?? []

    return {
        operators,
        accounts,
        users,
        dataflows
    }
}

export const NSCDateFormat = (date: string | number | null) => {
    if (date === null) return date
    
    const format = timeFormat("%Y-%m-%d")
    return format(new Date(date))
}

export const SecondsToMs = (date: number) => {
    return date * 1000
}

export const dataflowContextToServerUrl = (context: DataFlowContextFormType): string => {
    return context.protocol + context.server + ":" + context.port
}