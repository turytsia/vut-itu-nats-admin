/**
 * @fileoverview Table implementation
 *
 * This file contains implementation of the Table. This component
 * is being used as a table on different pages in order to easily
 * present dynamicly changing data to the user.
 *
 * @module Table
 * 
 * @author xturyt00
 */

import React, { useCallback, useContext, useMemo, useState } from 'react'
import Head from './components/Head/Head'
import Cell from './components/Cell/Cell'
import Filters from "../Filters/Filters"
import { getId } from '../../utils/id'
import useSort, { ColumnTypes } from '../../hooks/useSort'

import classes from './Table.module.css'
import { AppContext } from '../../context/AppContextProvider'
import classNames from 'classnames'

type ColumnMapNamesType = {
    [key: string]: string
}

export type FiltersConfigType = {
    searchBy?: string[],
    dateRange?: string[],
    columnToggler?: boolean
}

export type TableConfigType = {
    columnTypes: ColumnTypes,
    columnMapNames: ColumnMapNamesType
}

/** Component props type */
type PropsType = {
    data: { [key: string]: any }[]
    renderContent: (key: string, value: any) => any
    isLoading?: boolean
    renderActions?: React.ReactNode
    tableConfig?: TableConfigType
    filtersConfig?: FiltersConfigType
}

const initialTableConfig: TableConfigType = {
    columnMapNames: {},
    columnTypes: {}
}

/**
 * Table component, renders a table with given data
 * 
 * @param props - Component props
 * @param props.isLoading - Set loading state for the table
 * @param props.data - Table data
 * @param props.renderContent - Function that wraps each cell's value and modifies it
 * @param props.renderActions - Render elements in the filter container to the right
 * @param props.tableConfig - Table config
 * @param props.filtersConfig - Filter config
 * @returns Table component
 */
const Table = ({
    isLoading,
    data: initialData,
    renderContent,
    renderActions = null,
    tableConfig = initialTableConfig,
    filtersConfig = {},
}: PropsType) => {

    // filters

    const [search, setSearch] = useState<string>("")
    const [dropdownItem, setDropdownItem] = useState("name")
    const [date, setDate] = useState<{ [k: string]: [string, string] }>({})
    const [activeColumns, setActiveColumns] = useState<string[]>(Object.values(tableConfig.columnMapNames))

    const { isDark } = useContext(AppContext)

    const {
        data: sortData,
        sortTypeOf,
        sortOrderOf,
        changeSort,
        isSortable
    } = useSort(initialData, tableConfig.columnTypes)

    // FIXME

    /**
     * TODO
     */
    const onChangeInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
        []
    )

    /**
     * TODO
     */
    const onChangeDropdown = useCallback(
        (value: string) => setDropdownItem(value),
        []
    )
    
    /**
     * TODO
     */
    const onChangeDate = useCallback(
        (name: string) => (date: [string, string]) => setDate(prev => ({ ...prev, [name]: date })),
        []
    )
    
    /**
     * TODO
     */
    const onToggleColumn = useCallback(
        (key: string) => setActiveColumns(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]),
        []
    )

    /**
     * TODO
     */
    const searchByItems = useMemo(
        () => filtersConfig.searchBy ? filtersConfig.searchBy.map(key => ({ id: key, value: tableConfig.columnMapNames[key] })) : [],
        [filtersConfig, tableConfig]
    )

    const searchData = sortData.filter(item => item[dropdownItem]?.trim().toLowerCase()?.includes(search.trim().toLowerCase()))

    const columns = Object.keys(tableConfig.columnMapNames).filter(k => activeColumns.includes(tableConfig.columnMapNames[k]))

    const containerStyles = classNames(classes.container, { [classes.dark]: isDark })

    return (
        <div className={classes.outer}>
            <Filters
                renderActions={renderActions}
                filtersConfig={{
                    searchConfig: {
                        input: {
                            value: search,
                            onChange: onChangeInput
                        },
                        dropdown: {
                            value: dropdownItem,
                            items: searchByItems,
                            onChange: onChangeDropdown,
                        }
                    },
                    dateRangeConfig: {
                        items: filtersConfig.dateRange?.map(key => ({ key, name: tableConfig.columnMapNames[key] })) ?? [],
                        value: date,
                        onChange: onChangeDate
                    },
                    columnToggler: {
                        label: 'Manage columns',
                        items: Object.values(tableConfig.columnMapNames),
                        values: activeColumns,
                        onChange: onToggleColumn
                    }
                }}
            />
            <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(${activeColumns.length}, 1fr)`
            }}>
                {columns.map(key =>
                    <Head
                        key={key}
                        changeSort={() => changeSort(key)}
                        isSortable={isSortable(key)}
                        sort={sortTypeOf(key)}
                        order={sortOrderOf(key)}>
                        {tableConfig.columnMapNames[key]}
                    </Head>
                )}
            </div>
            <div style={{
                flex: 1,
                overflow: "auto",
                position: "relative"
            }}>
                <div
                    className={containerStyles}
                    style={{ gridTemplateColumns: `repeat(${activeColumns.length}, 1fr)` }}>
                    {isLoading ?
                        Array(20).fill(Cell).map((CellSkeleton, i) => <CellSkeleton key={getId()} isLoading />)
                        :
                        searchData.map((item, i) =>
                            columns.map(key =>
                                <Cell
                                    isDark={i % 2 === 1}
                                    key={getId()}>
                                    {renderContent(key, item)}
                                </Cell>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Table
