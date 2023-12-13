import React from 'react'
import classes from "./Aside.module.css"
import { Icon } from '@iconify/react'
import icons from '../../../../utils/icons'
import { DataFlowMapType } from '../../../../utils/types'

type PropsType = {
    dataflow: DataFlowMapType
}

const Aside = ({
    dataflow
}: PropsType) => {
  return (
      <aside className={classes.aside}>
          <div className={classes.header}>
              <h4>{dataflow.name}</h4>
              <Icon icon={icons.close} height={20} width={20} />
          </div>
          <div>
              {/* Insert messages here */}
          </div>
      </aside>
  )
}

export default Aside