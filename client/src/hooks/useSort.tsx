import { useState } from "react"

type SorterType = {
    order: number
    type: sort
}

type SortersType = {
    [key: string]: SorterType
}

enum sort {
    ASC,
    DESC,
    DEFAULT
}

class Sortable implements SorterType {

    public order: number
    public type: sort

    private static _order = 0

    constructor(sorter: SorterType) {
        this.order = sorter.order
        this.type = sorter.type
    }

    public static createSorter(order: number = this._order++, type: sort = sort.ASC) {
        return new this({ order, type } as SorterType)
    }

    public getSorter() {
        return { order: this.order, type: this.type } as SorterType
    }

    public increaseOrder() {
        this.order++
        return this
    }

    public decreaseOrder() {
        this.order--
        return this
    }
    
    public next() {
        this.type = this.getNextType()
        return this
    }

    private getNextType() {
        return {
            [sort.DEFAULT]: sort.ASC,
            [sort.ASC]: sort.DESC,
            [sort.DESC]: sort.DEFAULT
        }[this.type]
    }
}

const toSorter = (sorter: SorterType) => new Sortable(sorter).getSorter()
const getSorterKeys = (sorters: SortersType) => Object.keys(sorters)
const arrayToSorters = (keys: (keyof SortersType)[], sorters: SortersType) => keys.reduce((a, k) => ({ ...a, [k]: toSorter(sorters[k]) }), {})
const getSorters = (sorters: SortersType) => arrayToSorters(getSorterKeys(sorters), sorters)
const sliceSorters = (sorters: SortersType, from: number, to: number = getSorterKeys(sorters).length) => arrayToSorters(getSorterKeys(sorters).slice(from, to), sorters)
const decreaseSorters = (sorters: SortersType) => getSorterKeys(sorters).reduce((a, k) => ({ ...a, [k]: new Sortable(sorters[k]).decreaseOrder().getSorter() }), {})
const getSortersAndDelete = (sorters: SortersType, key: keyof SortersType) => ({ ...sliceSorters(sorters, 0, getSorterKeys(sorters).indexOf(String(key))), ...decreaseSorters(sliceSorters(sorters, getSorterKeys(sorters).indexOf(String(key)))) })


const useSort = () => {
    const [sorters, setSorters] = useState<SortersType>({})

    const changeSort = (key: keyof SortersType) => {
        let _sorters: SortersType = {} 
        let sorter: Sortable

        if (key in sorters) {
            sorter = new Sortable(sorters[key]).next()

            if (sorter.type === sort.DEFAULT) {
                _sorters = getSortersAndDelete(sorters, key)
                delete _sorters[key]
            } else {
                _sorters = getSorters(sorters)
                _sorters[key] = sorter.getSorter()
            }

        } else {
            sorter = Sortable.createSorter()

            _sorters = getSorters(sorters)

            _sorters[key] = sorter
        }

        setSorters(_sorters)
    }

    return { sorters, changeSort }
}

export default useSort