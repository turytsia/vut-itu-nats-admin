/**
 * @fileoverview Location component implementation
 *
 * This file contains implementation of Location component.
 *
 * @module Location
 *
 * @author xturyt00
 */

import React, { useContext } from 'react'
import { OverlayView } from '@react-google-maps/api';
import classes from "./Marker.module.css"
import { Icon } from '@iconify/react';
import icons from '../../../../utils/icons';
import { DataFlowType } from '../../../../utils/axios';
import classNames from 'classnames';
import { AppContext } from '../../../../context/AppContextProvider';

/**
 * Location component props
 *
 * @typedef PropsType
 *
 * @property {DataFlowType} data - Dataflow object.
 *
 * @property {(data: DataFlowType) => void} onClick - Function that closes the aside.
 */
type PropsType = {
    data: DataFlowType
    onClick: (data: DataFlowType) => void
}


/**
 *  Location component. This component renders the location
 * @param data - Dataflow object.
 * @param onClick - Function that closes the aside.
 * @constructor
 */
const Marker = ({
    data,
    onClick
}: PropsType) => {
    // hooks for theme
    const {isDark} = useContext(AppContext)

    const containerStyles = classNames(classes.container, {
        [classes.dark]: isDark
    })

    // render component
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