/**
 * @fileoverview Storage protocol implementation
 *
 * This file contains implementation of a Storage. This is
 * an interface protocol in order to communicate with local storage.
 *
 * @module storage
 * 
 * @author xturyt00
 */

/** Enum of keys used at local storage */
enum keys {
    isDark = "isDark"
}

/** Setter method type */
type SetStorageMethodType<T> = (v: T) => void

/** Getter method type */
type GetStorageMethodType<T> = () => T

/** Storage state type */
type StorageStateType = {
    isDark: boolean
}

/** Type of the object with getters */
type GetStorageType = {
    [key in keyof StorageStateType]: GetStorageMethodType<StorageStateType[key]>
}

/** Type of the object with setters */
type SetStorageType = {
    [key in keyof StorageStateType]: SetStorageMethodType<StorageStateType[key]>
}

/** Interface of a storage protocol */
interface StorageActions {
    get: GetStorageType
    set: SetStorageType
}

/** Object with storage getters */
const StorageGetters: GetStorageType = {
    /**
     * Specific getter for the attribute `isDark` for dark mode
     * 
     * @returns true if dark mode is enabled, otherwise false
     */
    isDark: () => Boolean(localStorage.getItem(keys.isDark))
}

/** Object with storage setters */
const StorageSetters: SetStorageType = {
    /**
     * Specific setter for the attribute `isDark` for dark mode
     * 
     * @param v value to be set
     */
    isDark: (v) => localStorage.setItem(keys.isDark, v ? "true" : "")
}

/**
 * Storage protocol
 * 
 * This protocol helps when working with local storage. Mostly it helps
 * to keep the code DRY.
 * 
 * ```ts
 * const storage = new Storage()
 * 
 * // returns attribute converted to its type from local storage
 * storage.get.someAttribute()
 * // sets attribute value in a local storage
 * storage.set.someAttribute(true)
 * ```
 */
class Storage implements StorageActions {
    /** accessor of the attributes at local storage */
    public get: GetStorageType = StorageGetters
    /** setter of the attributes at local storage */
    public set: SetStorageType = StorageSetters
}

export default Storage