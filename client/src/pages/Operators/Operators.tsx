/**
 * @fileoverview Operators page component
 *
 * This file contains implementation of a operators page.
 *
 * @module Operators
 * 
 * @author xturyt00
 */
import { useCallback, useContext, useEffect, useState } from 'react'
import { AppContext, notify } from '../../context/AppContextProvider'

import { OperatorType, OperatorPayloadType, NSCBaseType } from '../../utils/axios'
import { ColumnTypes, columns } from '../../hooks/useSort'
import { NSCDateFormat, SecondsToMs, dateFormat, datetimeFormat, fetchOperators } from '../../utils/common'
import icons from '../../utils/icons'

// components
import Page from '../../components/Page/Page'
import Table from '../../components/Table/Table'
import { Icon } from '@iconify/react'
import CreateOperatorModal from "./modals/CreateOperatorModal/CreateOperatorModal"
import Button from '../../components/Button/Button'
import OperatorRowActions from "./components/OperatorRowActions/OperatorRowActions"
import {defaultFiltersConfig, defaultTableConfig } from '../../utils/views/tables'


/**
 * Operators page component
 * 
 * @returns Operators page
 */
const Operators = () => {

    const { request, isLoading, setIsLoading } = useContext(AppContext)

    const [operators, setOperators] = useState<OperatorType[]>([])

    const [error, setError] = useState<string>("")

    const [isCreateActive, setIsCreateActive] = useState<boolean>(false)

    /**
     * Fetch operators and update the component state.
     */
    const fetch = useCallback(
        async () => {
            try {
                setIsLoading(true);

                const operators = await fetchOperators()

                setOperators(operators);
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false);
            }
        },
        [request]
    );

    /**
     * Submits form to create new operator
     */
    const onOperatorSubmit = useCallback(
        async (form: OperatorPayloadType) => {
            try {
                const response = await request.post.operator({
                    ...form,
                    expiry: NSCDateFormat(form.expiry),
                    start: NSCDateFormat(form.start),
                })

                if (response.type === "error") {
                    setError(response.data?.message || "An error occurred.");
                    return
                } 

                const operators = await fetchOperators()

                setOperators(operators)
                setError("");
                setIsCreateActive(false)
                notify(response.data.message, "success")
                
            } catch (e) {
                console.error(e)
            } finally {

            }
        },
        [request]
    )

    /**
     * Content function for the cell values in the table. 
     */
    const renderContent = useCallback(
        (key: string, operator: any) => {
            switch (key) {
                case "name": case "iss": case "sub":
                    return operator[key]
                case "iat":
                    return datetimeFormat(SecondsToMs(operator[key]))
                case "":
                    return (
                        <OperatorRowActions operator={operator} />
                    )
            }
        },
        []
    )

    useEffect(() => {
        fetch()
    }, [fetch])

    return (
        <Page
            title={`Operators (${operators.length})`}>
            <Table
                data={operators}
                isLoading={isLoading}
                tableConfig={defaultTableConfig}
                filtersConfig={defaultFiltersConfig}
                renderContent={renderContent}
                renderActions={
                    <Button isBlue onClick={() => setIsCreateActive(true)}>
                        Create operator
                        <Icon icon={icons.plus} width={20} height={20} />
                    </Button>
                }
            />
            {isCreateActive && (
                <CreateOperatorModal
                    error={error}
                    onSubmit={onOperatorSubmit}
                    onClose={() => setIsCreateActive(false)}
                />
            )}
        </Page>
    )
}

export default Operators
