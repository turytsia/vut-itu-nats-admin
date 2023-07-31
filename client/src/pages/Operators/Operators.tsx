import { useCallback, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContextProvider'
import Page from '../../components/Page/Page'
import Table from '../../components/Table/Table'

import { OperatorType } from '../../utils/axios'
import { ColumnTypes, columns } from '../../hooks/useSort'
import { dateFormat } from '../../utils/common'
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'
import Popover from '../../components/Popover/Popover'
import { FloatingDelayGroup } from '@floating-ui/react'

import CreateOperatorModal, { OperatorInputTypes } from "./modals/CreateOperatorModal/CreateOperatorModal"

import classes from "./Operators.module.css"
import Button from '../../components/Button/Button'
import { Link } from 'react-router-dom'

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

const Operators = () => {

    const { request } = useContext(AppContext)
    const [operators, setOperators] = useState<OperatorType[]>([])
    const [isCreateActive, setIsCreateActive] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    /** Fetch page data */
    const fetch = useCallback(
        async () => {
            setIsLoading(true)

            try {
                const { operators } = await request.get.operators()

                const responses =
                    await Promise.allSettled(operators.map(async name => await request.get.operator(name)))

                setOperators(responses.filter((r): r is PromiseFulfilledResult<OperatorType> => r.status === "fulfilled").map(r => r.value).filter(v => v))
            } catch (e) {
                console.error(e)
            }
            finally {
                setIsLoading(false)
            }
        },
        []
    )

    const onCreateOperatorOpen = useCallback(
        () => setIsCreateActive(true),
        []
    )

    const onCreateOperatorClose = useCallback(
        () => setIsCreateActive(false),
        []
    )

    const onCreateOperatorSubmit = useCallback(
        async (state: OperatorInputTypes) => {
            const response = await request.post.operator(state)

            if (response.type === "error") {
                setError(response.data?.message)
            }
        },
        []
    )

    const renderContent = useCallback(
        (key: string, data: any) => {
            switch (key) {
                case "name":
                case "iss":
                case "sub":
                    return data[key]
                case "iat":
                    return dateFormat(data[key])
                case "":
                    return (
                        <div className={classes.actions}>
                            <FloatingDelayGroup delay={150}>
                                <Popover element={
                                    <Link className={classes.actionIcon} to={data["name"]}>
                                        <Icon icon={icons.open} width={20} height={20} />
                                    </Link>
                                }>
                                    Describe
                                </Popover>
                            </FloatingDelayGroup>
                        </div>
                    )
            }
        },
        []
    )

    useEffect(() => {
        fetch()
    }, [])


    return (
        <Page
            title={`Operators (${operators.length})`}>
            <Table
                filters={{
                    searchBy: ["name", "sub", "iss"]
                }}
                isLoading={isLoading}
                header={OperatorHeaderMap}
                data={operators}
                columnDataTypes={columnDataTypes}
                renderContent={renderContent}
                renderActions={
                    <Button isBlue onClick={onCreateOperatorOpen}>
                        Create operator
                        <Icon icon={icons.plus} width={20} height={20} />
                    </Button>
                }
            />
            {isCreateActive && <CreateOperatorModal error={error} onClose={onCreateOperatorClose} onSubmit={onCreateOperatorSubmit} />}
        </Page>
    )
}

export default Operators