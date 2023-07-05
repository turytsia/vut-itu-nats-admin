import { useCallback, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContextProvider'
import Page from '../../components/Page/Page'
import Table from '../../components/Table/Table'

// types
import { OperatorType } from '../../utils/axios'
import { ColumnTypes, columns } from '../../hooks/useSort'
import { timestampFormat } from '../../utils/common'

const OperatorHeaderMap = {
    "name": "Name",
    "iss": "Issuer ID",
    "sub": "Subject",
    "iat": "Issued",
    "jti": "JWT Token",
}

const columnDataTypes: ColumnTypes = {
    name: columns.TEXT,
    iss: columns.TEXT,
    sub: columns.TEXT,
    iat: columns.NUMBER,
    jti: columns.NONE,
}

const renderContent = (key: string, data: any) => {
    switch (key) {
        case "name":
        case "iss":
        case "sub":
            return data
        case "iat":
            return timestampFormat(data)
        case "jti":
            return <span>Icon</span>
    }
}

const Operators = () => {

    const { request } = useContext(AppContext)
    const [operators, setOperators] = useState<OperatorType[]>([])

    /** Fetch page data */
    const fetch = useCallback(
        async () => {
            const { operators } = await request.get.operators()

            const responses =
                await Promise.allSettled(operators.map(async name => await request.get.operator(name)))

            setOperators(responses.filter((r): r is PromiseFulfilledResult<OperatorType> => r.status === "fulfilled").map(r => r.value))
        },
        []
    )

    useEffect(() => {
        fetch()
    }, [])


    return (
        <Page title='Operators'>
            <Table
                header={OperatorHeaderMap}
                data={operators}
                columnDataTypes={columnDataTypes}
                renderContent={renderContent}
            />
        </Page>
    )
}

export default Operators