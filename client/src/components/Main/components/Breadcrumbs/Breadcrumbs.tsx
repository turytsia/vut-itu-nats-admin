/**
 * @fileoverview Breadcrumbs component
 *
 * This file contains Breadcrumbs component implementation
 *
 * @module Breadcrumbs
 * 
 * @author xturyt00
 */

import React, { useMemo } from 'react'
import { Link, useLocation, useNavigate, useRoutes } from 'react-router-dom'

import classes from "./Breadcrumbs.module.css"
import icons from '../../../../utils/icons'
import ButtonIcon from '../../../ButtonIcon/ButtonIcon'

/**
 * Parses url into array of strings
 * 
 * @param p current url
 * @returns array of strings
 * 
 * ```ts
 * getPath("/) // []
 * getPath("/a/b) // ['a', 'b']
 * getPath("/a/b/c?d=5&e=6") // ['a', 'b', 'c', 'd']
 * ```
 */
const getPath = (p: string) => ["Jetono", ...p.split(/\/([^/?]+)/g).slice(1).filter(p => p)]

/**
 * Constructs reference based on url and index of the page
 * 
 * @param paths array of strings
 * @param i index of current page
 * @returns reference to a specific page
 * 
 * ```ts
 * getRef(["a","b","c","d"], 0) // /
 * getRef(["a","b","c","d"], 1) // /a
 * getRef(["a","b","c","d"], 2) // /a/b
 * ```
 */
const getRef = (pathname: string) => map.find(([regex]) => regex.test(pathname))

const map: [regex: RegExp, path: string][] = [
    [/^\/operators$/, "/"],
    [/^\/accounts$/, "/"],
    [/^\/users$/, "/"],
    [/^\/dataflows$/, "/"],
    [/^\/map$/, "/"],
    [/^\/operators\/[^\/]+$/, "/operators"],
    [/^\/operators\/[^\/]+\/accounts\/[^\/]+$/, "/accounts"],
    [/^\/operators\/[^\/]+\/accounts\/[^\/]+\/users\/[^\/]+$/, "/users"]
]

/**
 * Breadcrumbs component, generates breadcrumbs based on url
 */
const Breadcrumbs = () => {

    const { pathname } = useLocation()
    const navigate = useNavigate()

    const paths = useMemo(() => getPath(pathname), [pathname])

    const handleReturn = () => {
        const path = getRef(pathname)
        console.log(pathname)
        navigate(path ? path[1] : "")
    }

    return (
        <div className={classes.container}>
            <ButtonIcon icon={icons.arrowBack} onClick={handleReturn} />
            {paths.map((p, i) => (
                <React.Fragment key={i}>
                    <span className={classes.separator}>{i > 0 ? "•" : ""}</span>
                    <span className={classes.link}>{p}</span>
                </React.Fragment>
            ))}
        </div>
    )
}

export default Breadcrumbs