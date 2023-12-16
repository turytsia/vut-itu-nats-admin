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
    const {isLoading, setIsLoading} = useContext(AppContext)

    const [map, setMap] = useState<GoogleMap | null>(null)
    const [dataflows, setDataflows] = useState<DataFlowType[]>()
    const [currentDataflow, setCurrentDataflow] = useState<DataFlowType | null>(null)

    const onLoad = useCallback((map: any) => {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback((map: any) => {
        setMap(null)
    }, [])

    const clickLocationHandler = (location: DataFlowType) => {
        if(!map) return
        map.panTo({ lat: location.lat, lng: location.lon })
        setCurrentDataflow(location)
    }

    const  closeLocationHandler = () => {
        setCurrentDataflow(null)
    }

    const fetchDataFlows = useCallback(
        async () => {
            setIsLoading(true)
            try {
                const response = await request.get.dataflows();

                if (response["dataflows"] === undefined) return;
                setDataflows(response["dataflows"] ?? []);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false)
            }
        },
        [request]
    )

    useEffect(() => {
        fetchDataFlows()
    }, [])

    // console.log(map)
    
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
