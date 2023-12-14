import {useCallback, useContext, useEffect, useState} from 'react'
import Page from '../../components/Page/Page'
import Button from '../../components/Button/Button'
import {Icon} from '@iconify/react'
import icons from '../../utils/icons'
import {useParams} from 'react-router-dom'
import {AppContext} from '../../context/AppContextProvider'
import {AccountPatchType, AccountType} from '../../utils/axios'
import EditAccountModal, {EditAccountType} from './modals/EditAccountModal/EditAccountModal'
import {dateFormat} from '../../utils/common'
import Details from "../../components/Details/Details"
import ButtonSourceCode from '../../components/ButtonSourceCode/ButtonSourceCode'

const AccountsDetail = () => {
    const {request} = useContext(AppContext)

    const {operator: operatorName, account: accountName} = useParams()

    const [search, setSearch] = useState<string>("")

    const [account, setAccount] = useState<AccountPatchType & AccountType | null>(null)

    const [isEditModal, setIsEditModal] = useState<boolean>(false)

    const fetch = useCallback(
        async () => {
            try {
                setAccount(await request.get.account(operatorName as string, accountName as string) as AccountPatchType & AccountType)
            } catch (e) {
                console.error(e)
            }
        },
        [accountName, operatorName, request]
    )

    const onEditSubmit = useCallback(
        async (settings: EditAccountType) => {
            try {
                await request.patch.account(operatorName as string, accountName as string, settings as AccountPatchType)
                await fetch()
                setIsEditModal(false)
            } catch (e) {
                console.error(e)
            }
        },
        []
    )

    const onChangeInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
        []
    )

    useEffect(() => {
        fetch()
    }, [fetch])

    return (
        <Page title={accountName as string}>
            <Details
                renderActions={
                    <>
                        <ButtonSourceCode data={account ?? {}} />
                        <Button isBlue onClick={() => setIsEditModal(true)}>
                            Update Account
                            <Icon icon={icons.pen} width={20} height={20} />
                        </Button>
                    </>
                }
                filtersConfig={{
                    searchConfig: {
                        input: {
                            value: search,
                            onChange: onChangeInput
                        }
                    }
                }}
                detailsConfig={[
                    {
                        title: {
                            value: "General",
                            icon: icons.settings
                        },
                        attributes: [
                            {
                                name: "Name",
                                value: accountName,
                            },
                            {
                                name: "Operator",
                                value: operatorName,
                            },
                            {
                                name: "Issuer",
                                value: account?.iss,
                            },
                            {
                                name: "Subject",
                                value: account?.sub,
                            },
                            {
                                name: "Created at",
                                value: dateFormat(account?.iat!),
                            },
                        ]
                    },
                    {
                        title: {
                            value: "Limits",
                            icon: icons.limit
                        },
                        attributes: [
                            {
                                name: "Leaf Node Connections",
                                value: account?.nats.limits.leaf,
                            },
                            {
                                name: "Payload",
                                value: account?.nats.limits.payload
                            },
                            {
                                name: "Connections",
                                value: account?.nats.limits.conn
                            },
                            {
                                name: "Data",
                                value: account?.nats.limits.data
                            }
                        ]
                    },
                    {
                        title: {
                            value: "Secret",
                            icon: icons.lock
                        },
                        attributes: [
                            {
                                name: "JWT Token",
                                value: account?.jti,
                                isSecret: true
                            },
                            {
                                name: "Signing Keys",
                                value: account?.jti,
                                isSecret: true
                            }
                        ]
                    },
                    {
                        title: {
                            value: "Nats",
                            icon: icons.message
                        },
                        attributes: [
                            {
                                name: "Type",
                                value: account?.nats.type,
                            },
                            {
                                name: "Version",
                                value: account?.nats.version
                            }
                        ]
                    }
                ]}/>
            {(isEditModal && account) && (
                <EditAccountModal
                    account={account}
                    onSubmit={onEditSubmit}
                    onClose={() => setIsEditModal(false)}
                />
            )}
        </Page>
    )
}

export default AccountsDetail
