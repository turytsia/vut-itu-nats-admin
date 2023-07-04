/**
 * @fileoverview useSort custom hook
 *
 * This file contains implementation of a useSort hook. This is
 * custom hook that is being used in Table.tsx for sorting
 *
 * @module useSort
 * 
 * @author xturyt00
 */

import { useCallback, useMemo, useState } from "react"

/** Sorter type */
type SorterType = {
    order: number
    type: sort
    key: string
}

/** Collection of sorters Type */
type SortersType = {
    [key: string]: SorterType
}

/** Type of the data, that will be sorted */
type DataType = {
    [key: string]: any
}

/** Type of each column in the table */
export type ColumnTypes = {
    [key: string]: columns
}

/** Possible column types */
export enum columns {
    TEXT,
    NUMBER,
}

/** Sorting types */
export enum sort {
    ASC = 1,
    DESC,
    DEFAULT
}

/** Initial sorter state */
const initialSorter = {
    order: 1,
    type: sort.ASC,
}

/**
 * Returns next type for the given type of the sort
 * 
 * @param type given type
 * @returns Returns next type of the given type
 */
const getNextType = (type: sort) => ({
    [sort.DEFAULT]: sort.ASC,
    [sort.ASC]: sort.DESC,
    [sort.DESC]: sort.DEFAULT
}[type])

/**
 * Updates specific sorter in sorter collection by key. 
 * Updating means changing type of a sorter to the next one,
 * then it constructs new sorter collection and returns it back
 * 
 * @param sorters collection of sorters
 * @param key key of the sorter that needs to be updated
 * @returns collection of sorters with updated sorter
 */
const updateSorter = (sorters: SortersType, key: string) =>
    Object.values(sorters)
        .map(s => s.key === key ? { ...s, type: getNextType(s.type) } : s)
        .reduce((a, s) => ({ ...a, [s.key]: s }), {})

/**
 * Creates new sorter in collection of sorters,
 * assigns it to provided key and returns new collection
 * 
 * @param sorters collection of sorters
 * @param key key of the new sorter
 * @returns collection of sorters with new sorter
 */
const pushSorter = (sorters: SortersType, key: string) =>
    [...Object.values(sorters), { ...initialSorter, key }].reduce((a, s, i) => ({ ...a, [s.key]: { ...s, order: i + 1 } }), {})

/**
 * Deletes specific sorter in collection of sorters by a key
 * and returns new collection of sorters 
 * 
 * @param sorters collection of sorters
 * @param key key of the sorter that needs to be removed
 * @returns new collection of sorters 
 */
const deleteSorter = (sorters: SortersType, key: string) =>
    Object.values(sorters)
        .filter(({ key: k }) => k !== key)
        .sort((a, b) => a.order - b.order)
        .reduce((a, s, i) => ({ ...a, [s.key]: { ...s, order: i + 1 } }), {})

/**
 * Custom hook useSort is used to sort data in Table.tsx
 * 
 * @param initialData initial data (table)
 * @param columnTypes column types of initial table 
 * @returns handlers to work with this hook
 */
const useSort = ([...initialData]: DataType[], columnTypes: ColumnTypes) => {
    const [sorters, setSorters] = useState<SortersType>({})

    /**
     * Sorting change handler
     * Changes specific sorter in collection of sorters by key provided
     * 
     * @param key key of the sorter
     */
    const changeSort = useCallback(
        (key: string) => {
            setSorters(prev => {
                if (!(key in prev)) return pushSorter(sorters, key)

                const { type } = prev[key]

                if (getNextType(type) === sort.DEFAULT) {
                    return deleteSorter(sorters, key)
                }

                return updateSorter(sorters, key)
            })
        },
        [sorters]
    )

    /**
     * Data sort handler
     * It sorts data by specific column provided as a key
     * 
     * @param data data (table), that will be sorted
     * @param key key of a column in table
     */
    const sortData = useCallback(
        (data: DataType[], key: string) => {
            switch (columnTypes[key]) {
                case columns.TEXT:
                    return data.sort((a, b) => {
                        if (a[key] < b[key]) {
                            return sorters[key].type === sort.ASC ? -1 : 1
                        }
                        if (a[key] > b[key]) {
                            return sorters[key].type === sort.DESC ? 1 : -1
                        }
                        return 0
                    })
                case columns.NUMBER:
                    return data.sort((a, b) => {
                        if (sorters[key].type === sort.ASC) {
                            return Number(a[key]) - Number(b[key])
                        }
                        if (sorters[key].type === sort.DESC) {
                            return Number(b[key]) - Number(a[key])
                        }
                        return 0
                    })
                default:
                    return data
            }
        },
        [sorters, initialData, columnTypes]
    )

    // accessors

    /**
     * Returns type of a sort by column key
     * 
     * @param key column key
     * @return type of a sort
     */
    const sortTypeOf = useCallback(
        (key: string) => sorters[key]?.type ?? sort.DEFAULT,
        [sorters]
    )

    /**
     * Returns order of a sort by column key
     * 
     * @param key column key
     * @return order of a sort
     */
    const sortOrderOf = useCallback(
        (key: string) => sorters[key]?.order,
        [sorters]
    )

    /** Sorted data */
    const data = useMemo(
        () => Object.values(sorters).length > 0 ? Object.values(sorters).reduce((cache, { key }) => sortData(cache, key), initialData) : initialData,
        [sorters, initialData]
    )


    return { data, changeSort, sortTypeOf, sortOrderOf }
}

export default useSort