import React from 'react'
import DatePicker from 'react-datepicker'
import { dateFormat } from '../../utils/common'

import classes from "./DateInputRange.module.css"

type DateInputType = {
    placeholder?: string,
    value: string,
    onChange: (value: string) => void
}

type PropsType = {
    label?: string
    disabled?: boolean,
    fromDate: DateInputType,
    toDate: DateInputType,
}

const DateInputRange = ({
    label,
    disabled,
    fromDate,
    toDate
}: PropsType) => {
    return (
        <div className={classes.container}>
            {label && <span className={classes.label}>{label}</span>}
            <DatePicker
                className={classes.input}
                placeholderText={fromDate.placeholder}
                disabled={disabled}
                value={fromDate.value ? dateFormat(fromDate.value) : ""}
                onChange={date => fromDate.onChange(date?.toISOString() ?? "")} />
            <div className={classes.separator} />
            <DatePicker
                className={classes.input}
                placeholderText={toDate.placeholder}
                disabled={disabled}
                value={toDate.value ? dateFormat(toDate.value) : ""}
                onChange={date => toDate.onChange(date?.toISOString() ?? "")} />
        </div>
    )
}

export default DateInputRange