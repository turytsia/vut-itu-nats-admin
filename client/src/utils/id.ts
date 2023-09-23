/**
 * @fileoverview Implementation of unique id generator
 *
 * This file contains implementation of the id generator.
 * It is used when the list of elements without identificator needs to be
 * rendered. As a key we can provide return value of getId().
 *
 * @module id
 * 
 * @author xturyt00
 * 
 * @todo use uuid() instead in the future
 */

/** 
 * Unique id generator
 */
const generatorId = (function* () {
    let id = 0
    while(true) yield ++id
})()

/**
 * Generates unique id and returns it
 * 
 * @returns Unique identificator
 * 
 * @example
 * getId() // 0
 * getId() // 1
 * getId() // 2
 */
export const getId = () => generatorId.next().value