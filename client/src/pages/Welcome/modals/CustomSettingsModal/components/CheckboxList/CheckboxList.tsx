/**
 * @author xturyt00
 */

import React from 'react'
import classes from "./CheckboxList.module.css"
import Checkbox from '../../../../../../components/Checkbox/Checkbox'
import { NSCBaseType, NameType } from '../../../../../../utils/axios'
import uuid from 'react-uuid'
import { AccountsExtention } from '../../../../../Accounts/Accounts'
import { UsersExtention } from '../../../../../Users/Users'

// part of props
export type CheckboxListType = {
    id: string
    value: string | React.ReactNode
}


/**
 * CheckboxList component props
 */
type PropsType = {
    values: string[]
    items: CheckboxListType[]
    title: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * CheckboxList component
 *
 * @param values - Values
 * @param items - Items to render
 * @param title - Title of the list
 * @param onChange - On change handler
 * @constructor
 */
const CheckboxList = ({
    values,
    items,
    title,
    onChange
}: PropsType) => {
    // just render
  return (
      <div className={classes.container}>
          <h4 className={classes.title}>{title} ({items.length})</h4>
          <div className={classes.list}>
              {items.map(item => (
                  <div key={uuid()} className={classes.item}>
                      <Checkbox onChange={onChange} value={values.includes(item.id)} name={item.id} />
                      <p>{item.value}</p>
                  </div>
              ))}
          </div>
      </div>
  )
}

export default CheckboxList