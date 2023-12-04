/**
 * @fileoverview Filters component implementation
 *
 * This file contains implementation of a Filters component. This is a
 * common component that is used on pages where filters are necessary.
 *
 * @module Filters
 * 
 * @author xturyt00
 */
import React, { useContext } from 'react'
import classes from "./Filters.module.css"
import SearchInput, { SearchInputConfigType } from '../SearchInput/SearchInput'
import { FloatingDelayGroup } from '@floating-ui/react'
import Popover from '../Popover/Popover'
import ButtonIcon from '../ButtonIcon/ButtonIcon'
import icons from '../../utils/icons'
import MultipleDropdown from '../MultipleDropdown/MultipleDropdown'
import DateInputRange from '../DateInputRange/DateInputRange'
import { AppContext } from '../../context/AppContextProvider'
import classNames from 'classnames'

export type FiltersConfigDateRangeType = {
    items: {
        name: string,
        key: string,
    }[],
    value: {
        [k: string]: [string, string];
    }
    onChange: (name: string) => (date: [string, string]) => void
}

export type FiltersConfigColumnTogglerType = {
    label: string,
    items: string[]
    values: string[]
    onChange: (key: string) => void
}

export type FiltersConfigType = {
    searchConfig?: SearchInputConfigType,
    dateRangeConfig?: FiltersConfigDateRangeType,
    columnToggler?: FiltersConfigColumnTogglerType
}

type PropsType = {
    filtersConfig: FiltersConfigType
    renderActions?: React.ReactNode
}

/**
 * Filters component
 * 
 * @param props - Component props 
 * @param props.filtersConfig - Filters config
 * @param props.renderActions - Render elements on the right side
 * @returns Filters component
 */
const Filters = ({
    filtersConfig,
    renderActions
}: PropsType) => {

    const { isDark } = useContext(AppContext)
    
    const containerStyles = classNames(classes.container, {
        [classes.dark]: isDark
    })
 
    return (
        <div className={containerStyles}>
            <div className={classes.filters}>
                {filtersConfig.searchConfig && (
                    <SearchInput
                        searchConfig={filtersConfig.searchConfig}
                    />
                )}
                {filtersConfig.dateRangeConfig && filtersConfig.dateRangeConfig.items.map(({ name, key }) => (
                    <DateInputRange
                        key={key}
                        label={name}
                        fromDate={{
                            placeholder: "dd.mm.yyyy",
                            value: filtersConfig.dateRangeConfig?.value[key] ?? ["", ""],
                            onChange: filtersConfig.dateRangeConfig?.onChange(key) ?? (() => { })
                        }}
                        toDate={{
                            placeholder: "dd.mm.yyyy",
                            value: filtersConfig.dateRangeConfig?.value[key] ?? ["", ""],
                            onChange: filtersConfig.dateRangeConfig?.onChange(key) ?? (() => { })
                        }}
                    />
                ))}
                {filtersConfig.columnToggler && (
                    <MultipleDropdown
                        label='Manage columns'
                        icon={icons.table}
                        items={filtersConfig.columnToggler.items}
                        values={filtersConfig.columnToggler.values}
                        onChange={filtersConfig.columnToggler.onChange}
                    />
                )}
                <FloatingDelayGroup delay={150}>
                    <Popover element={<ButtonIcon icon={icons.filterOff} onClick={() => { }} />}>
                        <span>Reset filters</span>
                    </Popover>
                </FloatingDelayGroup>
            </div>
            <div className={classes.actions}>
                {renderActions}
            </div>
        </div>
    )
}

export default Filters
