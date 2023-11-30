import React from 'react'
import classes from "./Card.module.css"
import icons from '../../../../utils/icons'
import { Icon } from '@iconify/react'
import Info from "./components/Info/Info"
import Button from '../../../../components/Button/Button'
import ButtonIcon from '../../../../components/ButtonIcon/ButtonIcon'
import { Link } from 'react-router-dom'

type PropsType = {
    icon: icons
}

const Card = ({
    icon
}: PropsType) => {
    return (
        <div className={classes.container}>
            <h4 className={classes.name}>Name</h4>
            <Icon className={classes.icon} icon={icon} />
            <div className={classes.content}>
                <Info title='Subject ID' value='12345674325643245643' isCopy />
                <Info title='Issuer ID' value='12345674325643245643' isCopy />
                <Info title='Issued' value='--'  />
            </div>
            <div className={classes.actions}>
                <Link to="" className={classes.btnDetails}>
                    <Button>
                        Details
                        <Icon icon={icons.open} height={20} width={20} />
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Card