/**
 * @fileoverview Loading component implementation
 *
 * This file contains implementation of a loading for the application
 *
 * @module Loading
 * 
 * @author xturyt00
 */
import React from 'react'
import classes from "./Loading.module.css"
import { FloatingPortal } from '@floating-ui/react'
import { floatingRoot } from '../../context/AppContextProvider'

const Loading = () => {
  return (
      <FloatingPortal root={floatingRoot}>
          <div className={classes.loading}><div></div><div></div><div></div><div></div></div>
      </FloatingPortal>
  )
}

export default Loading