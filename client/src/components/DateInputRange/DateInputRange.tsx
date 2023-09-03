import React from 'react'
import DatePicker from 'react-datepicker'
import { dateFormat } from '../../utils/common'

import classes from "./DateInputRange.module.css"

type DateInputType = {
    placeholder?: string,
    value: [string ,string],
    onChange: (value: [string, string]) => void
}

type PropsType = {
    label?: string
    disabled?: boolean,
    fromDate: DateInputType,
    toDate: DateInputType,
}

// accessors

// TODO

const DateInputRange = ({
    label,
    disabled,
    fromDate,
    toDate
}: PropsType) => {
    return (
        <div className={classes.container}>
            {label && <span className={classes.label}>{label}</span>}
            <div className={classes.inputContainer}>
                <DatePicker
                    className={classes.input}
                    placeholderText={fromDate.placeholder}
                    disabled={disabled}
                    value={fromDate.value ? dateFormat(fromDate.value[0]) : ""}
                    onChange={date => fromDate.onChange([date?.toISOString() ?? "", toDate.value?.[1] ?? ""])} />
            </div>
            <div className={classes.separator} />
            <div className={classes.inputContainer}>
                <DatePicker
                    className={classes.input}
                    placeholderText={toDate.placeholder}
                    disabled={disabled}
                    value={toDate.value ? dateFormat(toDate.value[1]) : ""}
                    onChange={date => toDate.onChange([fromDate.value?.[0] ?? "", date?.toISOString() ?? ""])} />
            </div>
        </div>
    )
}

export default DateInputRange