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
import Input from "./components/Input/Input"
import { getId } from '../../utils/id'
import useSort, { ColumnTypes, columns } from '../../hooks/useSort'

import classes from './Table.module.css'
import { AppContext } from '../../context/AppContextProvider'
import classNames from 'classnames'
import ButtonIcon from '../ButtonIcon/ButtonIcon'
import icons from '../../utils/icons'
import Popover from '../Popover/Popover'
import { FloatingDelayGroup } from '@floating-ui/react'

/** Component props type */
type PropsType = {
    header: { [key: string]: string }
    data: { [key: string]: any }[]
    columnDataTypes: ColumnTypes
    renderContent: (key: string, value: any) => any
    isLoading?: boolean
    renderActions?: React.ReactNode
}

/**
 * Table component, renders a table with given data
 * 
 * @param props Component props
 * @returns Table component
 */
const Table = ({
    isLoading,
    header,
    data: initialData,
    columnDataTypes,
    renderContent,
    renderActions = null
}: PropsType) => {
    const [search, setSearch] = useState<string>("")
    const [dropdownItem, setDropdownItem] = useState("name")

    const { isDark } = useContext(AppContext)

    const {
        data: sortData,
        sortTypeOf,
        sortOrderOf,
        changeSort,
        isSortable
    } = useSort(initialData, columnDataTypes)

    const onChangeFilter = useCallback(
        (inputValue: string, dropdownValue: string) => {
            setSearch(inputValue)
            setDropdownItem(dropdownValue)
        },
        []
    )

    const hasText = Object.values(columnDataTypes).includes(columns.TEXT)

    const dropdownItems = useMemo(
        () => Object.keys(header).filter(key => columnDataTypes[key] === columns.TEXT).map(key => ({ id: key, value: header[key] })),
        [header]
    )

    const data = sortData.filter(item => item[dropdownItem].toLowerCase().includes(search.toLowerCase()))

    const columnCount = Object.keys(header).length

    const containerStyles = classNames(classes.container, { [classes.dark]: isDark })

    return (
        <div className={classes.outer}>
            <div className={classes.outerFilters}>
                <div className={classes.filters}>
                    {hasText && <Input
                        value={search}
                        onChange={onChangeFilter}
                        dropdownItems={dropdownItems}
                        dropdownValue={dropdownItem} />}
                    <FloatingDelayGroup delay={150}>
                        <Popover offset={0} element={<ButtonIcon icon={icons.filterOff} onClick={() => { }} />}>
                            <span>Reset filters</span>
                        </Popover>
                    </FloatingDelayGroup>
                </div>
                <div className={classes.actions}>
                    {renderActions}
                </div>
            </div>
            <div
                className={containerStyles}
                style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}>
                {Object.keys(header).map(key =>
                    <Head
                        key={key}
                        changeSort={() => changeSort(key)}
                        isSortable={isSortable(key)}
                        sort={sortTypeOf(key)}
                        order={sortOrderOf(key)}>
                        {header[key]}
                    </Head>
                )}
                {isLoading ? Array(20).fill(Cell).map((CellSkeleton, i) => <CellSkeleton key={getId()} isLoading />) :
                    data.map((item, i) =>
                        Object.keys(header).map(key =>
                            <Cell
                                isDark={i % 2 === 1}
                                key={getId()}>
                                {renderContent(key, item)}
                            </Cell>
                        )
                    )}
            </div>
        </div>
    )
}

export default Table