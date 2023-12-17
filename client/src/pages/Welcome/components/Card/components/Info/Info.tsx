/**
 * @author xturyt00
 */

import React from 'react'
import CopyButton from '../../../../../../components/CopyButton/CopyButton'

import classes from "./Info.module.css"

type PropsType = {
    title: string
    value: string
    isCopy?: boolean
}

/**
 * Info component
 *
 * @param title - Info title
 * @param value - Info value
 * @param isCopy - Copy button
 * @constructor
 */
const Info = ({
    title,
    value,
    isCopy
}: PropsType) => {
  return (
      <p className={classes.container}>
          <span className={classes.title}>{title}</span>
          <span className={classes.value}>{value}</span>
          {isCopy && <CopyButton value='value' />}
      </p>
  )
}

export default Info