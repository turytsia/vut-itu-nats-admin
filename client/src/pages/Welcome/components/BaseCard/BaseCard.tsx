import React from 'react'
import classes from "./BaseCard.module.css"
import { Icon } from '@iconify/react'
import icons from '../../../../utils/icons'
import { Link } from 'react-router-dom'
import Button from '../../../../components/Button/Button'

type PropsType = {
    icon: icons
    name: string
    children: React.ReactNode
    to: string
    actions?: React.ReactNode
}

const BaseCard = ({
    icon,
    name,
    children,
    to,
    actions,
}: PropsType) => {
  return (
      <div className={classes.container}>
          <h4 className={classes.name}>{name}</h4>
          <Icon className={classes.icon} icon={icon} />
          <div className={classes.content}>
              {children}
          </div>
          <div className={classes.actions}>
              {actions}
              <Link to={to} className={classes.btnDetails}>
                  <Button>
                      Details
                      <Icon icon={icons.open} height={20} width={20} />
                  </Button>
              </Link>
          </div>
      </div>
  )
}

export default BaseCard