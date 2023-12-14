import React, { useContext } from 'react'
import classes from "./Aside.module.css"
import { Icon } from '@iconify/react'
import icons from '../../../../utils/icons'
import { DataFlowMapType } from '../../../../utils/types'
import { DataFlowType } from '../../../../utils/axios'
import { AppContext } from '../../../../context/AppContextProvider'
import classNames from 'classnames'

type PropsType = {
    dataflow: DataFlowType
    onClose: () => void
}

const Aside = ({
    dataflow,
    onClose
}: PropsType) => {

    const { isDark } = useContext(AppContext)

    const asideStyles = classNames(classes.aside, {
        [classes.dark]: isDark
    })

  return (
      <aside className={asideStyles}>
          <div className={classes.header}>
              <h4>{dataflow.name}</h4>
              <Icon icon={icons.close} height={20} width={20} onClick={onClose} />
          </div>
          <div>
              {/* Insert messages here */}
          </div>
      </aside>
  )
}

export default Aside