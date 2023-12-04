import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Page from "../../components/Page/Page"
import Filters from '../../components/Filters/Filters'
import Grid from "./components/Grid/Grid"
import Card from "./components/Card/Card"
import icons from '../../utils/icons'
import Button from '../../components/Button/Button'
import { Icon } from '@iconify/react'

import CustomSettingsModal, { DashboardSettingsFormType, initialFormState } from "./modals/CustomSettingsModal/CustomSettingsModal"
import { fetchAll } from '../../utils/common'
import { NSCDataType } from '../../utils/types'
import uuid from 'react-uuid'

const initialData: NSCDataType = {
    operators: [],
    accounts: [],
    users: []
}


const Welcome = () => {
    const [isSettinsActive, setIsSettingsActive] = useState(false)

    const [data, setData] = useState<NSCDataType>(initialData)
    const [form, setForm] = useState<DashboardSettingsFormType>(initialFormState)
    
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")

    const fetch = useCallback(
        async () => {
            setIsLoading(true);

            try {

                const data = await fetchAll()

                setData(data)

            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const onSubmit = (form: DashboardSettingsFormType) => {
        setForm(form)
        setIsSettingsActive(false)
    }

    useEffect(() => {
        fetch()
    }, [fetch])

    const filteredData = useMemo(() => (
        {
            operators: data.operators.filter(({ sub }) => form.operators.includes(sub)),
            accounts: data.accounts.filter(({ sub }) => form.accounts.includes(sub)),
            users: data.users.filter(({ sub }) => form.users.includes(sub))
        }
    ), [form, data])

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
            </Grid>
            {isSettinsActive && (
                <CustomSettingsModal
                    defaultForm={form}
                    data={data}
                    onSubmit={onSubmit}
                    onClose={() => setIsSettingsActive(false)} 
                />
            )}
        </Page>
    )
}

export default Welcome