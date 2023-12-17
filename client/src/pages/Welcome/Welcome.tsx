import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Page from "../../components/Page/Page"
import Filters from '../../components/Filters/Filters'
import Grid from "./components/Grid/Grid"
import Card from "./components/Card/Card"
import icons from '../../utils/icons'
import Button from '../../components/Button/Button'
import { Icon } from '@iconify/react'
import DataflowCard from "./components/DataflowCard/DataflowCard"

import CustomSettingsModal, { DashboardSettingsFormType, initialFormState } from "./modals/CustomSettingsModal/CustomSettingsModal"
import { fetchAll } from '../../utils/common'
import { NSCDataType, RequestDashboardType } from '../../utils/types'
import uuid from 'react-uuid'
import { AppContext, notify, request } from '../../context/AppContextProvider'

const initialData: NSCDataType = {
    dataflows: [],
    operators: [],
    accounts: [],
    users: []
}

const RequestToDashboardForm = (data: RequestDashboardType): DashboardSettingsFormType => {
    return {
        dataflows: data.dataflows ? data.dataflows.map(({name}) => name) : [],
        operators: data.operators ? data.operators.map(({ name }) => name) : [],
        accounts: data.accounts ? data.accounts.map(({ name }) => name) : [],
        users: data.users ? data.users.map(({ name }) => name) : []
    }
}


const Welcome = () => {
    const [isSettinsActive, setIsSettingsActive] = useState(false)

    const [error, setError] = useState("")
    const [data, setData] = useState<NSCDataType>(initialData)
    const [dashboard, setDashboard] = useState<RequestDashboardType>(initialFormState)

    const [search, setSearch] = useState<string>("")

    const { isLoading, setIsLoading } = useContext(AppContext)

    const fetch = useCallback(
        async () => {
            setIsLoading(true);

            try {
                const dashboard = await request.get.dashboard()

                const data = await fetchAll()

                setData(data)

                setDashboard(dashboard ?? initialFormState)

            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const onSubmit = useCallback(
        async (form: RequestDashboardType) => {
            setIsLoading(true);

            try {
                const response = await request.patch.dashboard(form)
                
                setError(response.type === "success" ? "" : response.data.message)

                if (response.type === "success") {
                    setDashboard(form)
                    setIsSettingsActive(false)
                    notify(response.data.message, "success")
                }

            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false);
            }
        },
        []
    )

    useEffect(() => {
        fetch()
    }, [fetch])

    const searchIn = (searchTarget: string, search: string) => {
        return searchTarget.trim().toLowerCase().includes(search.trim().toLowerCase())
    }
    const filteredData = useMemo(() => ({
            operators: data.operators.filter(({ name }) => dashboard.operators?.find(({ name: n }) => n === name) && searchIn(name, search)),
            accounts: data.accounts.filter(({ operator, name }) => dashboard.accounts?.find(({ operator: o, name: n }) => o === operator && n === name ) && searchIn(name, search)),
            users: data.users.filter(({ operator, account, name }) => dashboard.users?.find(({ operator: o, account: a, name: n }) => o === operator && a === account && n === name) && searchIn(name, search)),
            dataflows: data.dataflows.filter(({ name }) => dashboard.dataflows?.find(({ name: n }) => n === name) && searchIn(name, search))
        }
    ), [dashboard, data, search])

    return (
        <Page title='Dashboard'>
            <Filters filtersConfig={{
                searchConfig: {
                    input: {
                        value: search,
                        onChange: (e) => setSearch(e.target.value)
                    },

                },
            }}
                renderActions={
                    <Button isBlue disabled={isLoading} onClick={() => setIsSettingsActive(true)}>
                        Custom settings
                        <Icon icon={icons.settings} width={20} height={20} />
                    </Button>
                }
            />
            <Grid isLoading={isLoading}>
                {filteredData.operators.map(operator => (
                    <Card key={uuid()} data={operator} icon={icons.operator} type='operator' />
                ))}
                {filteredData.accounts.map(account => (
                    <Card key={uuid()} data={account} icon={icons.account} type='account' />
                ))}
                {filteredData.users.map(user => (
                    <Card key={uuid()} data={user} icon={icons.users} type='user' />
                ))}
                {filteredData.dataflows.map(dataflow => (
                    <DataflowCard key={uuid()} data={dataflow} icon={icons.chat} />
                ))}
            </Grid>
            {isSettinsActive && (
                <CustomSettingsModal
                    error={error}
                    defaultForm={dashboard}
                    data={data}
                    onSubmit={onSubmit}
                    onClose={() => setIsSettingsActive(false)}
                />
            )}
        </Page>
    )
}

export default Welcome