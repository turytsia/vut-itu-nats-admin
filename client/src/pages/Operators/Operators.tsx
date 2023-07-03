import { useCallback, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContextProvider'
import Page from '../../components/Page/Page'
import Table from '../../components/Table/Table'

// types
import { OperatorType } from '../../utils/axios'

const OperatorHeaderMap = {
    "name": "Name",
    "iat": "Issued",
    "iss": "Issuer ID",
    "jti": "JWT Token",
    "sub": "Subject"
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
            />
        </Page>
    )
}

export default Operators