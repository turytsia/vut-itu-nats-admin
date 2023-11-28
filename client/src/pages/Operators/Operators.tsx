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
import { AppContext } from '../../context/AppContextProvider'

import { OperatorType, OperatorPayloadType } from '../../utils/axios'
import { ColumnTypes, columns } from '../../hooks/useSort'
import { dateFormat } from '../../utils/common'
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

    const { request } = useContext(AppContext)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [operators, setOperators] = useState<OperatorType[]>([])

    const [error, setError] = useState<string>("")

    const [isCreateActive, setIsCreateActive] = useState<boolean>(false)

    /**
     * Fetch operators and update the component state.
     */
    const fetchOperators = useCallback(
        async () => {
            try {
                setIsLoading(true);

                // Fetch the list of operators
                const { operators } = await request.get.operators();

                // Fetch operator details concurrently using Promise.allSettled
                const responses = await Promise.allSettled(
                    operators.map(async (name) => await request.get.operator(name))
                );

                // Filter out fulfilled promises and extract their values
                const fulfilledResponses = responses
                    .filter((r): r is PromiseFulfilledResult<OperatorType> => r.status === "fulfilled")
                    .map((r) => r.value)
                    .filter((v) => v);

                setOperators(fulfilledResponses);
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

    /**
     * Content function for the cell values in the table. 
     */
    const renderContent = useCallback(
        (key: string, operator: any) => {
            switch (key) {
                case "name": case "iss": case "sub":
                    return operator[key]
                case "iat":
                    return dateFormat(operator[key])
                case "":
                    return (
                        <OperatorRowActions operator={operator} />
                    )
            }
        },
        []
    )

    useEffect(() => {
        fetchOperators()
    }, [fetchOperators])

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
