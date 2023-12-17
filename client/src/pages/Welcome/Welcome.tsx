
/**
 * @author xturyt00
 */

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

/**
 * Initial data state
 *
 * @type {NSCDataType}
 * @constant
 * @default
 */
const initialData: NSCDataType = {
    dataflows: [],
    operators: [],
    accounts: [],
    users: []
}


/**
 * RequestDashboardType to DashboardSettingsFormType
 *
 * @param data to convert
 * @constructor
 */
const RequestToDashboardForm = (data: RequestDashboardType): DashboardSettingsFormType => {
    return {
        dataflows: data.dataflows ? data.dataflows.map(({name}) => name) : [],
        operators: data.operators ? data.operators.map(({ name }) => name) : [],
        accounts: data.accounts ? data.accounts.map(({ name }) => name) : [],
        users: data.users ? data.users.map(({ name }) => name) : []
    }
}

/**
 * Welcome page
 *
 * @constructor
 */
const Welcome = () => {
    /**
     * Hooks
     */
    // settings modal state
    const [isSettinsActive, setIsSettingsActive] = useState(false)

    // error state
    const [error, setError] = useState("")
    // data state
    const [data, setData] = useState<NSCDataType>(initialData)
    // dashboard state
    const [dashboard, setDashboard] = useState<RequestDashboardType>(initialFormState)

    // search state (for filters)
    const [search, setSearch] = useState<string>("")

    // loading state, used for grid
    const { isLoading, setIsLoading } = useContext(AppContext)

    // fetch data from server
    const fetch = useCallback(
        async () => {
            // set loading state
            setIsLoading(true);

            try {
                // fetch data
                const dashboard = await request.get.dashboard()

                // set data
                const data = await fetchAll()

                setData(data)

                // set dashboard
                setDashboard(dashboard ?? initialFormState)

            } catch (error) {
                console.error(error)
            } finally {
                // set loading state
                setIsLoading(false);
            }
        },
        []
    );

    /**
     * Callbacks
     */

    // on submit form
    const onSubmit = useCallback(
        async (form: RequestDashboardType) => {
            // set loading state
            setIsLoading(true);

            try {
                // send request
                const response = await request.patch.dashboard(form)

                // set error
                setError(response.type === "success" ? "" : response.data.message)

                // set dashboard
                if (response.type === "success") {
                    setDashboard(form)
                    // set form state
                    setIsSettingsActive(false)
                    // notify success
                    notify(response.data.message, "success")
                }

            } catch (error) {
                console.error(error)
            } finally {
                // disable loading state
                setIsLoading(false);
            }
        },
        []
    )

    // on mount fetch data
    useEffect(() => {
        fetch()
    }, [fetch])


    // function for searching
    const searchIn = (searchTarget: string, search: string) => {
        // if search is empty, return true
        return searchTarget.trim().toLowerCase().includes(search.trim().toLowerCase())
    }

    // filter data
    const filteredData = useMemo(() => ({
            operators: data.operators.filter(({ name }) => dashboard.operators?.find(({ name: n }) => n === name) && searchIn(name, search)),
            accounts: data.accounts.filter(({ operator, name }) => dashboard.accounts?.find(({ operator: o, name: n }) => o === operator && n === name ) && searchIn(name, search)),
            users: data.users.filter(({ operator, account, name }) => dashboard.users?.find(({ operator: o, account: a, name: n }) => o === operator && a === account && n === name) && searchIn(name, search)),
            dataflows: data.dataflows.filter(({ name }) => dashboard.dataflows?.find(({ name: n }) => n === name) && searchIn(name, search))
        }
    ), [dashboard, data, search])

    // render
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