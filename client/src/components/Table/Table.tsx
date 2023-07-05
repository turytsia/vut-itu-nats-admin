import React, { useMemo, useState } from 'react'
import Head from './components/Head/Head'
import Cell from './components/Cell/Cell'
import Input from "./components/Input/Input"
import { getId } from '../../utils/id'

import classes from './Table.module.css'
import useSort, { ColumnTypes, columns } from '../../hooks/useSort'

type PropsType = {
    header: { [key: string]: string }
    data: { [key: string]: any }[]
    columnDataTypes: ColumnTypes
    renderContent: (key: string, value: any) => any
}

const Table = ({
    header,
    data: initialData,
    columnDataTypes,
    renderContent
}: PropsType) => {
    const { data: sortData, sortTypeOf, sortOrderOf, changeSort, isSortable } = useSort(initialData, columnDataTypes)

    const [search, setSearch] = useState<string>("")
    const [dropdownItem, setDropdownItem] = useState("name")

    const onChangeFilter = (inputValue: string, dropdownValue: string) => {
        setSearch(inputValue)
        setDropdownItem(dropdownValue)
    }

    const hasText = useMemo(
        () => Object.values(columnDataTypes).includes(columns.TEXT),
        [columnDataTypes]
    )

    const dropdownItems = useMemo(
        () => Object.keys(header).filter(key => columnDataTypes[key] === columns.TEXT).map(key => ({ id: key, value: header[key] })),
        [header]
    )

    const data = useMemo(
        () => sortData.filter(item => item[dropdownItem].toLowerCase().includes(search.toLowerCase())),
        [sortData]
    )

    return (
        <div className={classes.outer}>
            <div className={classes.filters}>
                {hasText && <Input
                    value={search}
                    onChange={onChangeFilter}
                    dropdownItems={dropdownItems}
                    dropdownValue={dropdownItem} />}
            </div>
            <div
                className={classes.container}
                style={{ gridTemplateColumns: `repeat(${Object.keys(header).length}, minmax(min-content, 150px))` }}>
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
                {data.map((item, i) =>
                    Object.keys(header).map(key =>
                        <Cell
                            key={getId()}
                            isHover={false}>
                            {renderContent(key, item[key])}
                        </Cell>
                    )
                )}
            </div>
        </div>
    )
}

export default Table