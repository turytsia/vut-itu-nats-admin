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

/** 
 * Enum of keys used at local storage 
 */
enum keys {
    isDark = "isDark"
}

/** 
 * Setter for the storage type 
 */
type SetStorageMethodType<T> = (v: T) => void

/** 
 * Getter from the storage type 
 */
type GetStorageMethodType<T> = () => T

/** 
 * Storage state type 
 */
type StorageStateType = {
    isDark: boolean
}

/** 
 * Object with getters type 
 */
type GetStorageType = {
    [key in keyof StorageStateType]: GetStorageMethodType<StorageStateType[key]>
}

/** 
 * Object with setters type 
 */
type SetStorageType = {
    [key in keyof StorageStateType]: SetStorageMethodType<StorageStateType[key]>
}

/** 
 * Interface of a storage protocol 
 */
interface StorageActions {
    get: GetStorageType
    set: SetStorageType
}

/** 
 * Object with storage getters 
 */
const StorageGetters: GetStorageType = {
    /**
     * Specific getter for the attribute `isDark` for dark mode
     * 
     * @returns True if dark mode is enabled, otherwise false
     */
    isDark: () => Boolean(localStorage.getItem(keys.isDark))
}

/** 
 * Object with storage setters 
 */
const StorageSetters: SetStorageType = {
    /**
     * Specific setter for the attribute `isDark` for dark mode
     * 
     * @param v - The value to be set (true for dark mode, false for light mode)
     */
    isDark: (v) => localStorage.setItem(keys.isDark, v ? "true" : "")
}

/**
 * Storage protocol
 * 
 * This protocol helps when working with local storage. Mostly it helps
 * to keep the code DRY.
 * 
 * @example
 * const storage = new Storage()
 * 
 * // returns attribute converted to its type from local storage
 * storage.get.isDark() // boolean true or false
 * // sets attribute value in a local storage
 * storage.set.isDark(true) // sets to true
 */
class Storage implements StorageActions {
    /** 
     * Getter object at local storage 
     */
    public get: GetStorageType = StorageGetters
    /** 
     * Setter object at local storage 
     */
    public set: SetStorageType = StorageSetters
}

export default Storage