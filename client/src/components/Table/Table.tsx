import React, { useState } from 'react'
import Head from './components/Head/Head'
import Cell from './components/Cell/Cell'
import { getId } from '../../utils/id'

import classes from './Table.module.css'
import useSort, { ColumnTypes } from '../../hooks/useSort'

type PropsType = {
    header: { [key: string]: string }
    data: { [key: string]: any }[]
    columns: ColumnTypes
}

const Table = ({
    header,
    data: initialData,
    columns
}: PropsType) => {
    const { data, sortTypeOf, sortOrderOf, changeSort } = useSort(initialData, columns)

    return (
        <div
            className={classes.container}
            style={{ gridTemplateColumns: `repeat(${Object.keys(header).length}, minmax(min-content, 150px))` }}>
            {Object.keys(header).map(key =>
                <Head
                    key={key}
                    changeSort={() => changeSort(key)}
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
                        {item[key]}
                    </Cell>
                )
            )}
        </div>
    )
}

export default Table