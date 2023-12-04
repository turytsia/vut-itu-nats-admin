/**
 * @fileoverview Details component implementation
 *
 * This file contains implementation of a Details component.
 * It generates details page based on given config.
 *
 * @module Details
 * 
 * @author xturyt00
 */
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

type DeletableSectionType = {
    isDeletable?: boolean,
    onDelete: (details: string, i: number) => void
}

type PropsType = {
    detailsConfig: DetailsConfigType,
    filtersConfig?: FiltersConfigType
    renderActions?: React.ReactNode,
    children?: React.ReactNode,
    sectionChangeCb?: (index: number) => void
    deletable?: DeletableSectionType
}

// accessors

/**
 * Retrieves search filter's value
 * 
 * @param filtersConfig - Filters config
 * @returns Search filter's value
 */
const getSearchValue = (filtersConfig?: FiltersConfigType) => {
    return filtersConfig?.searchConfig?.input.value ?? ""
}

/**
 * Retrieve title's value from Details config based on index
 * 
 * @param index - Current index
 * @param detailsConfig - Details config
 * @returns Title's value from Details config based on index
 */
const getCurrentTitle = (index: number, detailsConfig: DetailsConfigType) => {
    return detailsConfig?.[index]?.title.value ?? ""
}

/**
 * Retrieve attributes from Details config based on index
 * 
 * @param index - Current index
 * @param detailsConfig - Details config
 * @returns Attributes from Details config based on index
 */
const getCurrentAttributes = (index: number, detailsConfig: DetailsConfigType) => {
    return detailsConfig?.[index]?.attributes ?? []
}

// helpers

/**
 * Filter attributes
 * 
 * @param attributes - Attributes
 * @param filtersConfig - Filters config
 * @returns Filtered attributes
 */
const filterAttributes = (attributes: DetailsConfigAttributeType[], filtersConfig?: FiltersConfigType) => {
    if (!filtersConfig?.searchConfig) return attributes

    return attributes
        .filter(config =>
            config.name?.toLowerCase().trim().includes(getSearchValue(filtersConfig).trim().toLowerCase())
        )
}

/**
 * Filter details
 * 
 * @param detailsConfig - Details config
 * @param filtersConfig - Filters config
 * @returns Filtered details
 */
const filterDetailsConfig = (detailsConfig: DetailsConfigType, filtersConfig?: FiltersConfigType) => {
    return detailsConfig
        .map(config => ({ ...config, attributes: filterAttributes(config.attributes, filtersConfig) }))
        .filter(({ attributes }) => attributes.length > 0)
}

/**
 * Details component
 * 
 * @param props - Component props
 * @param props.detailsConfig - Details config
 * @param props.filtersConfig - Filters config
 * @param props.renderActions - Renders element to the right of the filters
 * @returns Details component
 */
const Details = ({
    detailsConfig,
    filtersConfig,
    renderActions,
    children = null,
    sectionChangeCb = (_: number) => {
    },
    deletable = {
        isDeletable: false,
        onDelete: (_: string, __: number) => {}
    }
}: PropsType) => {
    const [sectionIndex, setSectionIndex] = useState<number>(0)

    const config = filterDetailsConfig(detailsConfig, filtersConfig)

    const title = getCurrentTitle(sectionIndex, config)

    const attributes = getCurrentAttributes(sectionIndex, config)

    const searchValue = getSearchValue(filtersConfig)

    const onSectionChange = (i: number) => {
        sectionChangeCb(i)
        setSectionIndex(i)
    }

    // If selected index is not 0, it will change it back to 0
    // if the user tries to filter attributes
    useEffect(() => {
        setSectionIndex(0)
    }, [searchValue])

    const yieldDeleteHandler = (name: string, sectionIndex: number) => {
        return (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
            e.stopPropagation()
            deletable.onDelete(name, sectionIndex)
        }
    }

    return (
        <div className={classes.container}>
            {filtersConfig && (
                <Filters
                    renderActions={renderActions}
                    filtersConfig={filtersConfig}
                />
            )}
            {(config.length === 0 && detailsConfig.length !== 0) && (
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
                            onClick={() => onSectionChange(i)}
                        >
                            <span>
                                <Icon icon={title.icon} height={20} width={20}/>
                                {title.value}
                            </span>
                            {searchValue && (
                                <span>
                                    {attributes.length}
                                </span>
                            )}
                            {deletable.isDeletable && (
                                <span>
                                    <Icon color={"red"} icon={icons.close} height={20} width={20} onClick={yieldDeleteHandler(title.value, i)}/>
                                </span>
                            )}
                        </Button>
                    ))
                    }
                </aside>
                {children ? children : attributes.length > 0 && (
                    <div className={classes.attributes}>
                        <TextSection text={title}>
                            {attributes.map(config => <Attribute key={getId()} attributeConfig={config}/>)}
                        </TextSection>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Details
