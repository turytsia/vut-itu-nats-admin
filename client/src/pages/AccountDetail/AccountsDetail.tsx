/**
 * @fileOverview Accounts Detail Page.
 *
 * @exports AccountsDetail
 *
 * @version 1.0.0
 *
 * @author xbarza00
 */

import {useCallback, useContext, useEffect, useState} from 'react'
import Page from '../../components/Page/Page'
import Button from '../../components/Button/Button'
import {Icon} from '@iconify/react'
import icons from '../../utils/icons'
import {useParams} from 'react-router-dom'
import {AppContext, notify} from '../../context/AppContextProvider'
import {AccountPatchType, AccountType} from '../../utils/axios'
import EditAccountModal, {EditAccountType} from './modals/EditAccountModal/EditAccountModal'
import {SecondsToMs, dateFormat, datetimeFormat} from '../../utils/common'
import Details from "../../components/Details/Details"
import ButtonSourceCode from '../../components/ButtonSourceCode/ButtonSourceCode'

const AccountsDetail = () => {
    // hooks
    const { request, setIsLoading } = useContext(AppContext)
    const [error, setError] = useState<string>("")

    const {operator: operatorName, account: accountName} = useParams()

    const [search, setSearch] = useState<string>("")

    const [account, setAccount] = useState<AccountPatchType & AccountType | null>(null)

    const [isEditModal, setIsEditModal] = useState<boolean>(false)

    // fetch account
    const fetch = useCallback(
        async () => {
            try {
                // setting account from the response
                setAccount(await request.get.account(operatorName as string, accountName as string) as AccountPatchType & AccountType)
            } catch (e) {
                console.error(e)
            }
        },
        // dependencies on following
        [accountName, operatorName, request]
    )

    // edit account
    const onEditSubmit = useCallback(
        async (settings: EditAccountType) => {
            // setting loading state while fetching
            setIsLoading(true)
            try {
                // sending request to edit account
                const response = await request.patch.account(operatorName as string, accountName as string, settings as AccountPatchType)
                // fetching account again
                await fetch()

                // setting error message if the response is not success
                setError(response.type === "success" ? "" : response.data.message)
                if (response.type === "success") {
                    // closing modal and notifying user
                    setIsEditModal(false)
                    notify(response.data.message, "success")
                }
            } catch (e) {
                // setting error message if the response is not success
                console.error(e)
            } finally {
                // setting loading state to false
                setIsLoading(false)
            }
        },
        []
    )

    // callback for input change
    const onChangeInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
        []
    )

    useEffect(() => {
        fetch()
    }, [fetch])


    // create details config view
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
                                value: datetimeFormat(SecondsToMs(account?.iat!)),
                            },
                            {
                                name: "ttl",
                                value: account?.nats.default_permissions.resp ? ((account?.nats.default_permissions.resp.ttl ?? 0) / 1000000000) + "s" : null,
                            }
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
                            },
                            {
                                name: "Subscriptions",
                                value: account?.nats.limits.subs
                            },
                            {
                                name: "Wildcards",
                                value: account?.nats.limits.wildcards
                            },
                            {
                                name: "Description",
                                value: account?.nats.description
                            },
                        ]
                    },
                    {
                        title: {
                            value: "JWT",
                            icon: icons.info
                        },
                        attributes: [
                            {
                                name: "JTI (JWT ID)",
                                value: account?.jti,
                                isSecret: true
                            },
                            {
                                name: "Signing Keys",
                                value: account?.iss,
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
                            },
                            {
                                name: "Publish (allow)",
                                value: Object.entries(account?.nats.default_permissions.pub.allow ?? {}).map(([key, value]) => `${value}`).join(", ")
                            },
                            {
                                name: "Publish (deny)",
                                value: Object.entries(account?.nats.default_permissions.pub.deny ?? {}).map(([key, value]) => `${value}`).join(", ")
                            },
                            {
                                name: "Subscribe (allow)",
                                value: Object.entries(account?.nats.default_permissions.sub.allow ?? {}).map(([key, value]) => `${value}`).join(", ")
                            },
                            {
                                name: "Subscribe (deny)",
                                value: Object.entries(account?.nats.default_permissions.sub.deny ?? {}).map(([key, value]) => `${value}`).join(", ")
                            },
                        ]
                    }
                ]}/>
            {(isEditModal && account) && (
                <EditAccountModal
                    error={error}
                    account={account}
                    onSubmit={onEditSubmit}
                    onClose={() => setIsEditModal(false)}
                />
            )}
        </Page>
    )
}

export default AccountsDetail
