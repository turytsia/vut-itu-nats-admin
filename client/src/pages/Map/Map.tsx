import React, { useCallback, useState } from 'react'
import Page from '../../components/Page/Page'
import uuid from 'react-uuid'
// import { APIProvider, Map } from '@vis.gl/react-google-maps
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Marker from "./components/Marker/Marker"
import Aside from "./components/Aside/Aside"
import classes from "./Map.module.css"
import { DataFlowMapType } from '../../utils/types';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 49.195061,
    lng: 16.606836
};

const jsApiLoaderConfig = {
    id: "id123",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string
}

const customStyles = [
    {
        featureType: 'all',
        elementType: 'labels',
        stylers: [
            { invert_lightness: 'true' },
            { saturation: -100 },
            { lightness: -10 },
            { visibility: 'off' } // Set visibility to off for all labels
        ]
    }
];

const Map = () => {
    const { isLoaded } = useJsApiLoader(jsApiLoaderConfig)

    const [map, setMap] = useState(null)
    const [dataflows, setDataflows] = useState<DataFlowMapType>()
    const [currentDataflow, setCurrentDataflow] = useState<DataFlowMapType | null>(null)

    const onLoad = useCallback((map: any) => {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = useCallback((map: any) => {
        setMap(null)
    }, [])

    return (
        <Page
            title={`Map`}>
            {isLoaded && (
                <GoogleMap
                    options={{
                        styles: customStyles
                    }}
                    mapContainerClassName='map'
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    {map && (
                        <Marker position={center} />
                    )}
                    {currentDataflow && <Aside dataflow={currentDataflow} />}
                </GoogleMap>
            )}
        </Page>
    )
}

export default Map
