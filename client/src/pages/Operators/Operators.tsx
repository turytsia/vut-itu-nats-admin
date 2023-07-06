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

import JWTModal from "./modals/JWTModal/JWTModal"
import ViewOperatorModal from "./modals/ViewOperatorModal/ViewOperatorModal"
import CreateOperatorModal, { OperatorInputTypes } from "./modals/CreateOperatorModal/CreateOperatorModal"

import classes from "./Operators.module.css"
import Button from '../../components/Button/Button'

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
    const [isJWTActive, setIsJWTActive] = useState<string>("")
    const [isOperatorActive, setIsOperatorActive] = useState<OperatorType | null>(null)
    const [isCreateActive, setIsCreateActive] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    /** Fetch page data */
    const fetch = useCallback(
        async () => {
            setIsLoading(true)

            const { operators } = await request.get.operators()

            const responses =
                await Promise.allSettled(operators.map(async name => await request.get.operator(name)))

            setOperators(responses.filter((r): r is PromiseFulfilledResult<OperatorType> => r.status === "fulfilled").map(r => r.value).filter(v => v))
        
            setIsLoading(false)
        },
        []
    )

    const onOperatorModalOpen = useCallback(
        (operator: OperatorType) => setIsOperatorActive(operator),
        []
    )

    const onOperatorModalClose = useCallback(
        () => setIsOperatorActive(null),
        []
    )

    const onJWTModalOpen = useCallback(
        (token: string) => setIsJWTActive(token),
        []
    )

    const onJWTModalClose = useCallback(
        () => setIsJWTActive(""),
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
            console.log(response)
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
                                    <button className={classes.actionIcon} onClick={() => onJWTModalOpen(data["jti"])}>
                                        <Icon icon={icons.secret} width={20} height={20} />
                                    </button>
                                }>
                                    JWT Token
                                </Popover>
                                <Popover element={
                                    <button className={classes.actionIcon} onClick={() => onOperatorModalOpen(data)}>
                                        <Icon icon={icons.eye} width={20} height={20} />
                                    </button>
                                }>
                                    Details
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
            title='Operators'
            renderActions={
                <Button onClick={onCreateOperatorOpen}>
                    Create new operator
                    <Icon icon={icons.plus} width={20} height={20} />
                </Button>
            }>
            <Table
                isLoading={isLoading}
                header={OperatorHeaderMap}
                data={operators}
                columnDataTypes={columnDataTypes}
                renderContent={renderContent}
            />
            {isCreateActive && <CreateOperatorModal onClose={onCreateOperatorClose} onSubmit={onCreateOperatorSubmit} />}
            {!!isJWTActive && <JWTModal onClose={onJWTModalClose} token={isJWTActive} />}
            {!!isOperatorActive && <ViewOperatorModal onClose={onOperatorModalClose} operator={isOperatorActive} />}
        </Page>
    )
}

export default Operators