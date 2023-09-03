import { useCallback, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContextProvider'
import Page from '../../components/Page/Page'
import Table, { FiltersConfigType, TableConfigType } from '../../components/Table/Table'

import { OperatorType, OperatorPayloadType } from '../../utils/axios'
import { ColumnTypes, columns } from '../../hooks/useSort'
import { dateFormat } from '../../utils/common'
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'

import CreateOperatorModal from "./modals/CreateOperatorModal/CreateOperatorModal"

import classes from "./Operators.module.css"
import Button from '../../components/Button/Button'
import OperatorRowActions from "./components/OperatorRowActions/OperatorRowActions"

const OperatorHeaderMap = {
    "name": "Name",
    "iss": "Issuer ID",
    "sub": "Subject",
    "iat": "Issued",
    "": ""
}

const columnDataTypes: ColumnTypes = {
    name: columns.TEXT,
    iss: columns.TEXT,
    sub: columns.TEXT,
    iat: columns.NUMBER,
    "": columns.NONE
}

const tableConfig: TableConfigType = {
    columnMapNames: OperatorHeaderMap,
    columnTypes: columnDataTypes
}

const filtersConfig: FiltersConfigType = {
    searchBy: ["name", "sub", "iss"],
    dateRange: ["iat"],
    columnToggler: true
}

/**
 * 
 * @returns 
 */
const Operators = () => {

    const { request } = useContext(AppContext)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [operators, setOperators] = useState<OperatorType[]>([])

    const [error, setError] = useState<string>("")


    const [isCreateActive, setIsCreateActive] = useState<boolean>(false)

    /**
     * @todo
     */
    const fetch = useCallback(
        async () => {
            try {
                setIsLoading(true)

                const { operators } = await request.get.operators()

                const responses =
                    await Promise.allSettled(operators
                        .map(async name => await request.get.operator(name))
                    )

                setOperators(responses
                    .filter((r): r is PromiseFulfilledResult<OperatorType> => r.status === "fulfilled")
                    .map(r => r.value)
                    .filter(v => v)
                )
            } catch (e) {
                console.log(e)
            }
            finally {
                setIsLoading(false)
            }
        },
        [request]
    )

    /**
     * @todo
     */
    const onCreateOperatorSubmit = useCallback(
        async (form: OperatorPayloadType) => {
            try {
                const response = await request.post.operator(form)

                setError(response.type === "error" ? response.data?.message : "")
            } catch (e) {
                console.error(e)
            }
        },
        [request]
    )

    /**
     * @todo
     */
    const renderContent = useCallback(
        (key: string, data: any) => {
            switch (key) {
                case "name": case "iss": case "sub":
                    return data[key]
                case "iat":
                    return dateFormat(data[key])
                case "":
                    return (
                        <OperatorRowActions data={data} />
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
                tableConfig={tableConfig}
                filtersConfig={filtersConfig}
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
                    onSubmit={onCreateOperatorSubmit}
                    onClose={() => setIsCreateActive(false)}
                />
            )}
        </Page>
    )
}

export default Operators
