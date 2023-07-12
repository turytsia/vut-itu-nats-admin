import React from 'react'

import classes from "./Text.module.css"

type PropsType = {
    labelText: string,
    children: React.ReactNode
}

const Text = ({
    labelText,
    children
}: PropsType) => {
  return (
      <div className={classes.container}>
          <p className={classes.label}>{labelText}:</p>
          <div>{children}</div>
      </div>
  )
}

export default Text