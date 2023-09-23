/**
 * @fileoverview Implementation for the common functions and classes
 *
 * This file contains implementation of the common functions and
 * classes that can be used in any file, component, function etc.
 *
 * @module common
 * 
 * @author xturyt00
 */
import { timeFormat } from "d3-time-format"

/** 
 * Possible placements for floating elements 
 */
export enum placements {
    TOP = "top",
    RIGHT = "right",
    BOTTOM = "bottom",
    LEFT = "left",
}

/**
 * Converts date string or miliseconds into timestamp format
 * 
 * @param date - Date string or miliseconds
 * @returns Timestamp format string
 */
export const timesecondsFormat = (date: string | number) => {
    const format = timeFormat("%H:%M:%S %Y.%m.%d")
    return format(new Date(date))
}

/**
 * Converts date string or miliseconds into date format
 * 
 * @param date - Date string or miliseconds
 * @returns Date format string
 */
export const dateFormat = (date: string | number) => {
    if(!date) return ""
    const format = timeFormat("%Y.%m.%d")
    return format(new Date(date))
}