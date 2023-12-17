/**
 * @fileoverview Location component implementation
 *
 * This file contains implementation of Location component.
 *
 * @module Location
 *
 * @author xturyt00
 */

import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import Page from '../../components/Page/Page'
import uuid from 'react-uuid'
// import { APIProvider, Map } from '@vis.gl/react-google-maps
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Marker from "./components/Marker/Marker"
import Aside from "./components/Aside/Aside"
import classes from "./Map.module.css"
import { DataFlowMapType } from '../../utils/types';
import { DataFlowType } from '../../utils/axios';
import { AppContext, request } from '../../context/AppContextProvider';
import Location from "./components/Location/Location"

/**
 * Map component. This component renders the map
 */
const containerStyle = {
    width: '100%',
    height: '400px'
};

/**
 * Center of the map
 */
const center = {
    lat: 49.195061,
    lng: 16.606836
};

/**
 * JsApiLoader config
 *
 * @type {{id: string, googleMapsApiKey: string}}
 *
 * @property {string} id - Id of the map.
 *
 * @property {string} googleMapsApiKey - Google maps api key.
 */
const jsApiLoaderConfig = {
    id: "id123",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string
}

/**
 * Custom styles for the map
 */
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

/**
 * Map component. This component renders the map
 * @constructor
 *
 *  @param {DataFlowType} dataflow - Dataflow object.
 *
 *  @param {() => void} onClose - Function that closes the aside.
 */
const Map = () => {
    /**
     * Hooks
     */
    const { isLoaded } = useJsApiLoader(jsApiLoaderConfig)
    const {isLoading, setIsLoading} = useContext(AppContext)

    const [map, setMap] = useState<GoogleMap | null>(null)
    // dataflows hooks created with useState
    const [dataflows, setDataflows] = useState<DataFlowType[]>()
    const [currentDataflow, setCurrentDataflow] = useState<DataFlowType | null>(null)

    /**
     * Callbacks
     */

    // onLoad callback used to set the map instance
    const onLoad = useCallback((map: any) => {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    // onUnmount callback used to reset the map instance
    const onUnmount = useCallback((map: any) => {
        setMap(null)
    }, [])

    // clickLocationHandler callback used to set the current dataflow
    const clickLocationHandler = (location: DataFlowType) => {
        if(!map) return
        map.panTo({ lat: location.lat, lng: location.lon })
        setCurrentDataflow(location)
    }

    // closeLocationHandler callback used to reset the current dataflow
    const  closeLocationHandler = () => {
        setCurrentDataflow(null)
    }

    // fetchDataFlows callback used to fetch dataflows from the server
    const fetchDataFlows = useCallback(
        async () => {
            setIsLoading(true)
            try {
                // fetch dataflows from the server
                const response = await request.get.dataflows();

                // check if response is valid
                if (response["dataflows"] === undefined) return;
                // set dataflows
                setDataflows(response["dataflows"] ?? []);
            } catch (e) {
                console.error(e);
            } finally {
                // disable loading
                setIsLoading(false)
            }
        },
        [request]
    )

    //  useEffect hook used to fetch dataflows from the server
    useEffect(() => {
        fetchDataFlows()
    }, [])

    // console.log(map)

    // render component
    return (
        <Page
            title={`Map`}>
            <div className={classes.locations}>
                {dataflows?.map(dataflow => <Location key={uuid()} data={dataflow} onClick={clickLocationHandler} />)}
            </div>
            {isLoaded && (
                // @REVIEW https://github.com/google-map-react/google-map-react/issues/1143 This is why markers are jumping
                <GoogleMap
                    options={{
                        styles: customStyles
                    }}
                    
                    mapContainerClassName='map'
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    {map && (
                        dataflows?.map(dataflow => <Marker key={uuid()} data={dataflow} onClick={clickLocationHandler} />)
                    )}
                    {currentDataflow && <Aside dataflow={currentDataflow} onClose={closeLocationHandler} />}
                </GoogleMap>
            )}
        </Page>
    )
}

export default Map
