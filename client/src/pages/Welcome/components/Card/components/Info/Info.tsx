import React from 'react'
import CopyButton from '../../../../../../components/CopyButton/CopyButton'

import classes from "./Info.module.css"

type PropsType = {
    title: string
    value: string
    isCopy?: boolean
}

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