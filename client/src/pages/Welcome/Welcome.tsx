import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
import { notify, request } from '../../context/AppContextProvider'

const initialData: NSCDataType = {
    dataflows: [],
    operators: [],
    accounts: [],
    users: []
}

const RequestToDashboardForm = (data: RequestDashboardType): DashboardSettingsFormType => {
    return {
        dataflows: data.dataflows.map(({name}) => name),
        operators: data.operators.map(({ name }) => name),
        accounts: data.accounts.map(({ name }) => name),
        users: data.users.map(({ name }) => name)
    }
}


const Welcome = () => {
    const [isSettinsActive, setIsSettingsActive] = useState(false)

    const [error, setError] = useState("")
    const [data, setData] = useState<NSCDataType>(initialData)
    const [dashboard, setDashboard] = useState<DashboardSettingsFormType>(initialFormState)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")

    const DashboardFormToRequest = (form: DashboardSettingsFormType): RequestDashboardType => {
        console.log(data.dataflows)
        return {
            dataflows: form.dataflows.map(name => data.dataflows.find(({ name: n }) => n === name)!),
            operators: form.operators.map(name => ({ name })),
            accounts: form.accounts.map(name => ({ operator: data.accounts.find(({ name: n }) => n === name)?.operator!, name })),
            users: form.accounts.map(name => ({
                operator: data.users.find(({ name: n }) => n === name)?.operator!,
                account: data.users.find(({ name: n }) => n === name)?.account!,
                name
            })),
        }
    }

    const fetch = useCallback(
        async () => {
            setIsLoading(true);

            try {
                const dashboard = await request.get.dashboard()

                const data = await fetchAll()

                setData(data)

                setDashboard(RequestToDashboardForm(dashboard))

            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const onSubmit = useCallback(
        async (form: DashboardSettingsFormType) => {
            setIsLoading(true);

            try {
                const response = await request.patch.dashboard(DashboardFormToRequest(form))
                
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
        [DashboardFormToRequest]
    )

    useEffect(() => {
        fetch()
    }, [fetch])

    const filteredData = useMemo(() => (
        {
            operators: data.operators.filter(({ sub }) => dashboard.operators.includes(sub)),
            accounts: data.accounts.filter(({ sub }) => dashboard.accounts.includes(sub)),
            users: data.users.filter(({ sub }) => dashboard.users.includes(sub)),
            dataflows: data.dataflows.filter(({ name }) => dashboard.dataflows.includes(name))
        }
    ), [dashboard, data])

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
                    <Button isBlue onClick={() => setIsSettingsActive(true)}>
                        Custom settings
                        <Icon icon={icons.settings} width={20} height={20} />
                    </Button>
                }
            />
            <Grid>
                {filteredData.operators.map(operator => (
                    <Card key={uuid()} data={operator} icon={icons.operator} />
                ))}
                {filteredData.accounts.map(account => (
                    <Card key={uuid()} data={account} icon={icons.account} />
                ))}
                {filteredData.users.map(user => (
                    <Card key={uuid()} data={user} icon={icons.users} />
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