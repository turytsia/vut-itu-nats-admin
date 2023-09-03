import React, { useEffect, useState } from 'react'

import classes from "./Details.module.css"
import Button from '../Button/Button'
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'
import TextSection from '../TextSection/TextSection'
import Attribute, { DetailsConfigAttributeType } from "./components/Attribute/Attribute"
import { getId } from '../../utils/id'
import Filters, { FiltersConfigType } from '../Filters/Filters'

type DetailsConfigTitleType = {
    value: any,
    icon: icons
}

export type DetailsConfigType = {
    title: DetailsConfigTitleType,
    attributes: DetailsConfigAttributeType[]
}[]

type PropsType = {
    detailsConfig: DetailsConfigType,
    filtersConfig?: FiltersConfigType
    renderActions?: React.ReactNode
}

// accessors

const getSearchValue = (filtersConfig?: FiltersConfigType) => {
    return filtersConfig?.searchConfig?.input.value ?? ""
}

const getCurrentTitle = (index: number, detailsConfig: DetailsConfigType) => {
    return detailsConfig?.[index]?.title.value ?? ""
}

const getCurrentAttributes = (index: number, detailsConfig: DetailsConfigType) => {
    return detailsConfig?.[index]?.attributes ?? []
}

// helpers

const filterAttributes = (attributes: DetailsConfigAttributeType[], filtersConfig?: FiltersConfigType) => {
    if (!filtersConfig?.searchConfig) return attributes

    return attributes
        .filter(config =>
            config.name?.toLowerCase().trim().includes(getSearchValue(filtersConfig).trim().toLowerCase())
        )
}

const filterDetailsConfig = (detailsConfig: DetailsConfigType, filtersConfig?: FiltersConfigType) => {
    return detailsConfig
        .map(config => ({ ...config, attributes: filterAttributes(config.attributes, filtersConfig) }))
        .filter(({ attributes }) => attributes.length > 0)
}

const Details = ({
    detailsConfig,
    filtersConfig,
    renderActions
}: PropsType) => {
    const [sectionIndex, setSectionIndex] = useState<number>(0)

    const config = filterDetailsConfig(detailsConfig, filtersConfig)

    const title = getCurrentTitle(sectionIndex, config)

    const attributes = getCurrentAttributes(sectionIndex, config)

    const searchValue = getSearchValue(filtersConfig)

    // If selected index is not 0, it will change it back to 0
    // if the user tries to filter attributes
    useEffect(() => {
        setSectionIndex(0)
    }, [searchValue])

    return (
        <div className={classes.container}>
            {filtersConfig && (
                <Filters
                    renderActions={renderActions}
                    filtersConfig={filtersConfig}
                />
            )}
            {config.length === 0 && (
                <p className={classes.textNotFound}>
                    Unfortunately, the search of "{searchValue}" yielded no results.
                </p>
            )}
            <div className={classes.details}>
                <aside className={classes.aside}>
                    {config.map(({ title, attributes }, i) => (
                        <Button
                            key={title.value}
                            className={classes.menuButton}
                            isTransparent={i !== sectionIndex}
                            onClick={() => setSectionIndex(i)}
                        >
                            <span>
                                <Icon icon={title.icon} height={20} width={20} />
                                {title.value}
                            </span>
                            {searchValue && (
                                <span>
                                    {attributes.length}
                                </span>
                            )}
                        </Button>
                    ))
                    }
                </aside>
                {attributes.length > 0 && (
                    <div className={classes.attributes}>
                        <TextSection text={title}>
                            {attributes.map(config => <Attribute key={getId()} attributeConfig={config} />)}
                        </TextSection>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Details
