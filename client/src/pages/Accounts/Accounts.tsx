/**
 * @module Accounts
 *
 * @author xbarza00
 */

import React, {useCallback, useContext, useEffect, useState} from 'react'
import Page from '../../components/Page/Page'
import {AppContext, notify} from "../../context/AppContextProvider";
import {AccountPayloadType, AccountType} from "../../utils/axios";
import Table, {TableConfigType} from "../../components/Table/Table";
import {defaultFiltersConfig} from "../../utils/views/tables";
import Button from "../../components/Button/Button";
import {Icon} from "@iconify/react";
import icons from "../../utils/icons";
import {dateFormat, datetimeFormat, fetchAccounts, NSCDateFormat, SecondsToMs} from "../../utils/common";
import {columns, ColumnTypes} from "../../hooks/useSort";
import CreateAccountModal from "./modals/CreateAccountModal";
import AccountRowActions from "./components/AccountRowActions/AccountRowActions";

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

export type AccountsExtention = { operator: string }
export type ExtendedAccountType = AccountType & AccountsExtention

const Accounts = () => {
    // hooks
    const { request, isLoading, setIsLoading } = useContext(AppContext)
    const [accounts, setAccounts] = useState<ExtendedAccountType[]>([])

    const [error, setError] = useState<string>("")

    const [isCreateActive, setIsCreateActive] = useState<boolean>(false)

    const [operators, setOperators] = useState<string[]>([])

    /**
     * Fetches data from the server.
     */
    const fetch = useCallback(
        async () => {
            // setting loading state while fetching
            setIsLoading(true);

            try {
                // fetch all operators,
                //  operators will be set via hook but in lazy mode, due to fetch data races.
                const operatorsResponse = await request.get.operators()

                const accounts = await fetchAccounts()

                // setting operators and accounts
                setOperators(operatorsResponse.operators)
                setAccounts(accounts)

            } catch (error) {
                console.error(error)
            } finally {
                // disabling loading state
                setIsLoading(false);
            }
        },
        [request]
    );

    /**
     * Content function for the cell values in the table.
     */
    const renderContent = useCallback(
        (key: string, account: ExtendedAccountType) => {
            switch (key) {
                case "operator":
                case "name":
                case "iss":
                case "sub":
                    return account[key]
                case "iat":
                    return datetimeFormat(SecondsToMs(account[key]))
                case "":
                    return (
                        <AccountRowActions operatorName={account.operator} account={account} />
                    )
            }
        },
        []
    )

    /**
     * Submits form to create new operator
     */
    const onAccountSubmit = useCallback(
        async (form: AccountPayloadType) => {
            try {
                // sending request to create account
                const response = await request.post.account(form.operator as string, {
                    ...form,
                    expiry: NSCDateFormat(form.expiry),
                    start: NSCDateFormat(form.start),
                })

                /**
                 * if the response is success, then we are closing modal and notifying user,
                 */
                if (response.type === "error") {
                    setError(response.data?.message || "An error occurred.");
                } else {
                    setError("");
                    // closing modal and notifying user
                    setIsCreateActive(false)
                    // fetching accounts again
                    fetch()
                    // notifying user
                    notify(response.data.message, "success")
                }
            } catch (e) {
                console.error(e)
            }
        },
        [request, fetch]
    )

    useEffect(() => {
        // fetch on mount
        fetch()
    }, [fetch])

    // render template
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
                <CreateAccountModal
                    error={error}
                    setErr={setError}
                    onSubmit={onAccountSubmit}
                    onClose={() => setIsCreateActive(false)}
                    operatorList={operators}
                />
            )}
        </Page>
    )
}

export default Accounts