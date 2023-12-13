import React from 'react'
import { OverlayView } from '@react-google-maps/api';
import classes from "./Marker.module.css"
import { Icon } from '@iconify/react';
import icons from '../../../../utils/icons';

type PropsType = {
    position: google.maps.LatLng | google.maps.LatLngLiteral
}

const Marker = ({
    position
}: PropsType) => {
  return (
      <OverlayView
          position={position}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >

          <div className={classes.container}>
              <Icon icon={icons.chat} height={20} width={20} />
          </div>
      </OverlayView>
  )
}

export default React.memo(Marker, (prev, next) => prev.position !== next.position)