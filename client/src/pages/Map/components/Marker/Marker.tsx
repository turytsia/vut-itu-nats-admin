import React, { useContext } from 'react'
import { OverlayView } from '@react-google-maps/api';
import classes from "./Marker.module.css"
import { Icon } from '@iconify/react';
import icons from '../../../../utils/icons';
import { DataFlowType } from '../../../../utils/axios';
import classNames from 'classnames';
import { AppContext } from '../../../../context/AppContextProvider';

type PropsType = {
    data: DataFlowType
    onClick: (data: DataFlowType) => void
}

const Marker = ({
    data,
    onClick
}: PropsType) => {

    const {isDark} = useContext(AppContext)

    const containerStyles = classNames(classes.container, {
        [classes.dark]: isDark
    })

    return (
        <OverlayView
            position={{ lat: data.lat, lng: data.lon }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >

            <div className={containerStyles} onClick={() => onClick(data)}>
                <Icon icon={icons.chat} height={20} width={20} />
            </div>
        </OverlayView>
    )
}

export default Marker