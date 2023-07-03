import React, { useState } from 'react'
import Head from './components/Head/Head'
import Cell from './components/Cell/Cell'
import { getId } from '../../utils/id'

import classes from './Table.module.css'
import useSort from '../../hooks/useSort'

type PropsType = {
    header: { [key: string]: string }
    data: { [key: string]: any }[]
}

const Table = ({
    header,
    data
}: PropsType) => {
    const { sorters, changeSort } = useSort()
    const [hoverRowIndex, setHoverRowIndex] = useState<null | number>(null)

    const onMouseLeave = () => {
        if (hoverRowIndex === null) return

        setHoverRowIndex(null)
    }

    console.log(sorters)

    return (
        <div
            className={classes.container}
            style={{ gridTemplateColumns: `repeat(${Object.keys(header).length}, minmax(min-content, 150px))` }}
            onMouseLeave={onMouseLeave}>
            {Object.values(header).map(name =>
                <Head key={name} onMouseEnter={onMouseLeave} changeSort={() => changeSort(name)}>{name}</Head>
            )}
            {data.map((item, i) =>
                Object.keys(header).map(key =>
                    <Cell
                        key={getId()}
                        isHover={i === hoverRowIndex}
                        onMouseEnter={() => setHoverRowIndex(i)}>
                        {item[key]}
                    </Cell>
                )
            )}
        </div>
    )
}

export default Table