/**
 * @fileoverview useSort custom hook
 *
 * This file contains the implementation of the useSort hook.
 * It is a custom hook used in Table.tsx for sorting data.
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

/** Type of the data that will be sorted */
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
    NONE,
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
 * Returns the next type for the given type of the sort.
 *
 * @param type Given type
 * @returns Next type of the given type
 */
const getNextType = (type: sort) => ({
    [sort.DEFAULT]: sort.ASC,
    [sort.ASC]: sort.DESC,
    [sort.DESC]: sort.DEFAULT
}[type])

/**
 * Updates a specific sorter in the sorter collection by key.
 * Updating means changing the type of a sorter to the next one.
 * It then constructs a new sorter collection and returns it back.
 *
 * @param sorters Collection of sorters
 * @param key Key of the sorter that needs to be updated
 * @returns Collection of sorters with the updated sorter
 */
const updateSorter = (sorters: SortersType, key: string) =>
    Object.values(sorters)
        .map(s => s.key === key ? { ...s, type: getNextType(s.type) } : s)
        .reduce((a, s) => ({ ...a, [s.key]: s }), {})

/**
 * Creates a new sorter in the collection of sorters,
 * assigns it to the provided key, and returns the new collection.
 *
 * @param sorters Collection of sorters
 * @param key Key of the new sorter
 * @returns Collection of sorters with the new sorter
 */
const pushSorter = (sorters: SortersType, key: string) =>
    [...Object.values(sorters), { ...initialSorter, key }].reduce((a, s, i) => ({ ...a, [s.key]: { ...s, order: i + 1 } }), {})

/**
 * Deletes a specific sorter in the collection of sorters by a key
 * and returns a new collection of sorters.
 *
 * @param sorters Collection of sorters
 * @param key Key of the sorter that needs to be removed
 * @returns New collection of sorters
 */
const deleteSorter = (sorters: SortersType, key: string) =>
    Object.values(sorters)
        .filter(({ key: k }) => k !== key)
        .sort((a, b) => a.order - b.order)
        .reduce((a, s, i) => ({ ...a, [s.key]: { ...s, order: i + 1 } }), {})

/**
 * Custom hook useSort is used to sort data in Table.tsx.
 *
 * @param initialData Initial data (table)
 * @param columnTypes Column types of the initial table
 * @returns Handlers to work with this hook
 */
const useSort = ([...initialData]: DataType[], columnTypes: ColumnTypes) => {
    const [sorters, setSorters] = useState<SortersType>({})

    /**
     * Sorting change handler.
     * Changes a specific sorter in the collection of sorters by the provided key.
     *
     * @param key Key of the sorter
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
     * Data sort handler.
     * It sorts data by a specific column provided as a key.
     *
     * @param data Data (table) that will be sorted
     * @param key Key of a column in the table
     * @returns Sorted data
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

    // Accessors

    /**
     * Returns the type of a sort by column key.
     *
     * @param key Column key
     * @returns Type of a sort
     */
    const sortTypeOf = useCallback(
        (key: string) => sorters[key]?.type ?? sort.DEFAULT,
        [sorters]
    )

    /**
     * Returns the order of a sort by column key.
     *
     * @param key Column key
     * @returns Order of a sort
     */
    const sortOrderOf = useCallback(
        (key: string) => sorters[key]?.order,
        [sorters]
    )

    /**
     * Checks if a column is sortable.
     *
     * @param key Column key
     * @returns True if the column is sortable, false otherwise
     */
    const isSortable = useCallback(
        (key: string) => columnTypes[key] !== columns.NONE,
        [columnTypes]
    )

    /** Sorted data */
    const data = useMemo(
        () => Object.values(sorters).length > 0 ? Object.values(sorters).reduce((cache, { key }) => sortData(cache, key), initialData) : initialData,
        [sorters, initialData]
    )


    return { data, changeSort, sortTypeOf, sortOrderOf, isSortable }
}

export default useSort