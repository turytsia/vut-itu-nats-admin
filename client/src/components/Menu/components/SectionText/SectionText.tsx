/**
 * @fileoverview Section text component
 *
 * This file contains Section text component implementation
 *
 * @module SectionText
 * 
 * @author xturyt00
 */

import React from 'react'

import classes from "./SectionText.module.css"

/** component props type */
type PropsType = {
    children: React.ReactNode
}

/**
 * SectionText generates title for specific section of Menu.tsx
 * 
 * @param props component props
 * @returns SectionText
 */
const SectionText = ({
    children
}: PropsType) => {
    return <div className={classes.container}>{children}</div>
}

export default SectionText