import { timeFormat } from "d3-time-format"

/** Possible placements for floating elements */
export enum placements {
    TOP = "top",
    RIGHT = "right",
    BOTTOM = "bottom",
    LEFT = "left",
}

/**
 * Converts date string or miliseconds into timestamp format
 * 
 * @param date date string or miliseconds
 * @returns timestamp format string
 */
export const timesecondsFormat = (date: string | number) => {
    const format = timeFormat("%H:%M:%S %Y.%m.%d")
    return format(new Date(date))
}

export const dateFormat = (date: string | number) => {
    const format = timeFormat("%Y.%m.%d")
    return format(new Date(date))
}