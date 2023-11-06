/**
 * @module Accounts
 *
 * @author xbarza00
 */

import React, {useCallback, useContext, useEffect, useState} from 'react'
import Page from '../../components/Page/Page'
import {AppContext} from "../../context/AppContextProvider";
import {AccountType, OperatorPayloadType} from "../../utils/axios";
import Table, {TableConfigType} from "../../components/Table/Table";
import {defaultFiltersConfig} from "../../utils/views/tables";
import Button from "../../components/Button/Button";
import {Icon} from "@iconify/react";
import icons from "../../utils/icons";
import CreateOperatorModal from "../Operators/modals/CreateOperatorModal/CreateOperatorModal";
import {dateFormat} from "../../utils/common";
import {columns, ColumnTypes} from "../../hooks/useSort";

export const accountHeaderMap = {
    "operator": "Operator",
    "name": "Name",
    "iss": "Issuer ID",
    "sub": "Subject",
    "iat": "Issued",
    "": ""
}

export const accountColumnDataTypes: ColumnTypes = {
    operator: columns.TEXT,
    name: columns.TEXT,
    iss: columns.TEXT,
    sub: columns.TEXT,
    iat: columns.NUMBER,
    "": columns.NONE
}

export const accountTableConfig: TableConfigType = {
    columnMapNames: accountHeaderMap,
    columnTypes: accountColumnDataTypes
}

export type ExtendedAccountType = AccountType & { operator: string }

const Accounts = () => {
    const {request} = useContext(AppContext)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [accounts, setAccounts] = useState<AccountType[]>([])

    const [error, setError] = useState<string>("")

    const [isCreateActive, setIsCreateActive] = useState<boolean>(false)

    const fetchAccounts = useCallback(
        async () => {
            setIsLoading(true);

            try {
                // fetch all operators
                const {operators} = await request.get.operators();

                const fullFilledResponseSet: ExtendedAccountType[] = [];
                // fetch all users
                operators.forEach((operator: string): void => {
                    (async () => {
                        const accountListResponsesSet = await Promise.allSettled(
                            (await request.get.accounts(operator)).accounts.map(
                                async (name: string): Promise<AccountType> => {
                                    return await request.get.account(operator, name)
                                }
                            ))

                        // Filter out fulfilled promises and extract their values
                        fullFilledResponseSet.push(...(accountListResponsesSet
                                .filter((r): r is PromiseFulfilledResult<AccountType> => r.status === "fulfilled")
                                .map((r) => r.value)
                                .filter((v) => v)
                        ).map((t: AccountType) => {
                            let m = t as ExtendedAccountType;
                            m.operator = operator;
                            return m
                        } ))
                    })()
                })

                console.log(fullFilledResponseSet)
                setAccounts(fullFilledResponseSet)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false);
            }
        },
        [request]
    );

    /**
     * Content function for the cell values in the table.
     */
    const renderContent = useCallback(
        (key: string, account: any) => {
            switch (key) {
                case "operator":
                case "name":
                case "iss":
                case "sub":
                    return account[key]
                case "iat":
                    return dateFormat(account[key])
                case "":
                    return ""
            }
        },
        [accounts]
    )

    /**
     * Submits form to create new operator
     */
    const onAccountSubmit = useCallback(
        async (form: OperatorPayloadType) => {
            try {
                const response = await request.post.operator(form)

                if (response.type === "error") {
                    setError(response.data?.message || "An error occurred.");
                } else {
                    setError("");
                }
            } catch (e) {
                console.error(e)
            }
        },
        [request]
    )

    useEffect(() => {
        fetchAccounts()
    }, [fetchAccounts])

    return (
        <Page title={`Accounts (${accounts.length})`}>
            <Table
                data={accounts}
                isLoading={isLoading}
                tableConfig={accountTableConfig}
                filtersConfig={defaultFiltersConfig}
                renderContent={renderContent}
                renderActions={
                    <Button isBlue onClick={() => setIsCreateActive(true)}>
                        Create account
                        <Icon icon={icons.plus} width={20} height={20}/>
                    </Button>
                }
            />
            {isCreateActive && (
                <CreateOperatorModal
                    error={error}
                    onSubmit={onAccountSubmit}
                    onClose={() => setIsCreateActive(false)}
                />
            )}
        </Page>
    )
}

export default Accounts