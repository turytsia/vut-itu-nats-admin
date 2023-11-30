import React, { useState } from 'react'
import Page from "../../components/Page/Page"
import Filters from '../../components/Filters/Filters'
import Grid from "./components/Grid/Grid"
import Card from "./components/Card/Card"
import icons from '../../utils/icons'

const Welcome = () => {

    const [search, setSearch] = useState<string>("")

    return (
        <Page title='Dashboard'>
            <Filters filtersConfig={{
                searchConfig: {
                    input: {
                        value: search,
                        onChange: (e) => setSearch(e.target.value)
                    },
                    
                },
                dateRangeConfig: undefined,
                columnToggler: undefined
            }} />
            <Grid>
                <Card icon={icons.account} />
                <Card icon={icons.account} />
                <Card icon={icons.account} />
                <Card icon={icons.account} />
                <Card icon={icons.account} />
                <Card icon={icons.account} />
                <Card icon={icons.account} />
                <Card icon={icons.account} />
                <Card icon={icons.account} />
            </Grid>

        </Page>
    )
}

export default Welcome