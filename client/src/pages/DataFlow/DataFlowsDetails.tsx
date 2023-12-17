/**
 * @file DataFlowsDetails.tsx
 *
 * @brief Data flows details page
 *
 * This file contains DataFlowsDetails page component implementation.
 *
 * @module DataFlowsDetails
 *
 * @author xbarza00
 */

import Page from "../../components/Page/Page";
import Button from "../../components/Button/Button";
import { Icon } from "@iconify/react";
import icons from "../../utils/icons";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AppContext, notify } from "../../context/AppContextProvider";
import { DataFlowType } from "../../utils/axios";
import Details from "../../components/Details/Details";
import AddDataFlowContext from "./modals/AddDataFlowContextModal";
import DataflowWindow from "./components/DataflowWindow";
import { DataFlowContextFormType } from "../../utils/types";
import { dataflowContextToServerUrl } from "../../utils/common";

const DataFlowsDetails = () => {
    /**
     * Hooks
     *
     * @see https://reactjs.org/docs/hooks-reference.html
     *
     * @see https://reactjs.org/docs/hooks-state.html
     *
     * @see https://reactjs.org/docs/hooks-effect.html
     *
     * request - Axios request object
     * error - Error message
     * setError - Error message setter
     * dataFlows - Data flows
     * setDataFlows - Data flows setter
     * search - Search string
     * setSearch - Search string setter
     * currentLocationName - Current location name
     * setCurrentLocationName - Current location name setter
     * dataFlowIndex - Data flow index
     * setDataFlowIndex - Data flow index setter
     * isCreateModal - Create modal flag
     * setIsCreateModal - Create modal flag setter
     * isUpdateModal - Update modal flag
     * setIsUpdateModal - Update modal flag setter
     * isLoading - Loading flag
     * setIsLoading - Loading flag setter
     * onChangeInput - Input change handler
     * fetchDataFlows - Fetch data flows
     * handleSectionChange - Section change handler
     * onContextCreation - Context creation handler
     * onContextUpdate - Context update handler
     * getLocationName - Get location name
     * getDataflow - Get data flow
     * handleDelete - Delete handler
     */
    const { request, isLoading, setIsLoading } = useContext(AppContext)

    const [error, setError] = useState("")
    const [dataFlows, setDataFlows] = useState<DataFlowType[]>([])
    const [search, setSearch] = useState<string>("")
    const [currentLocationName, setCurrentLocationName] = useState<string>("")
    const [dataFlowIndex, setDataFlowIndex] = useState<number>(0)
    const [isCreateModal, setIsCreateModal] = useState<boolean>(false)
    const [isUpdateModal, setIsUpdateModal] = useState<boolean>(false)

    // Input change handler
    const onChangeInput = useCallback(
        // @ts-ignore
        (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
        []
    )

    // Fetch data flows
    const fetchDataFlows = useCallback(
        async () => {
            // Set loading state
            setIsLoading(true)
            try {
                // Fetch data flows
                const response = await request.get.dataflows();

                // oh no
                // if dataflows is undefined, return
                if (response["dataflows"] === undefined) return;
                // otherwise set data flows
                setDataFlows(response["dataflows"] ?? []);
            } catch (e) {
                console.error(e);
            } finally {
                // Disable loading state
                setIsLoading(false)
            }
        },
        // dependencies
        [request]
    )

    const handleSectionChange = useCallback(
        (index: number) => {
            // Set data flow index
            setDataFlowIndex(index)

        },
        []
    )

    // Context creation handler
    const onContextCreation = useCallback(
        async (dataflowContext: DataFlowContextFormType) => {
            // Set loading state
            setIsLoading(true)

            try {
                // Fetch location data
                // via HTTP get to backend via axis
                const data = await request.get.location(dataflowContext.location);

                // extract results
                const results = data.results

                // if results is undefined or empty, return
                if (!(results && results.length > 0)) {
                    // Set error message
                    setError("Error: Server location was not found.")
                    return
                } else {
                    // otherwise set error message to empty string
                    setError("")
                }

                // extract lat and lng from results
                const { lat, lng } = results[0].geometry.location;

                // create data flow object with data from form
                const dataflow: DataFlowType = {
                    name: dataflowContext.name,
                    server: dataflowContextToServerUrl(dataflowContext),
                    lat,
                    lon: lng
                }

                // send data flow object to backend via HTTP post
                const response = await request.post.dataflows(dataflow);
                // update data flows
                await fetchDataFlows();
                // close modal
                setIsCreateModal(false);
                // notify user
                notify(response.data.message, response.type)
            } catch (e) {
                console.error(e);
            } finally {
                // disable loading state
                setIsLoading(false)
            }
        },
        [fetchDataFlows, request]
    )

    const onContextUpdate = async (dataflowContext: DataFlowContextFormType) => {
        // Set loading state
        setIsLoading(true)

        try {
            // Fetch location data
            // via HTTP get to backend via axis
            const data = await request.get.location(dataflowContext.location);

            // extract results
            const results = data.results

            // if results is undefined or empty, return
            if (!(results && results.length > 0)) {
                setError("Error: Server location was not found.")
                return
            } else {
                setError("")
            }

            // extract lat and lng from results
            const { lat, lng } = results[0].geometry.location;

            // create data flow object with data from form
            const dataflow: DataFlowType = {
                name: dataflowContext.name,
                server: dataflowContextToServerUrl(dataflowContext),
                lat,
                lon: lng
            }

            // send data flow object to backend via HTTP patch
            const response = await request.patch.dataflows(dataflow);
            // update data flows
            await fetchDataFlows();
            // close modal
            setIsUpdateModal(false);
            // notify user
            notify(response.data.message, "success")
        } catch (e) {
            console.error(e);
        } finally {
            // disable loading state
            setIsLoading(false)
        }
    }

    /**
     * Get location name
     * @param lat latitude
     * @param lng longitude
     */
    const getLocationName = async (lat: number, lng: number) => {
        // Set loading state
        setIsLoading(true)
        try {
            // Fetch location data
            const data = await request.get.reverseLocation(lat, lng);

            // in case of error, return empty string
            if (data.results.length === 0) return ""

            // otherwise return formatted address
            return data.results[0].formatted_address;
        } catch (error) {
            
        } finally {
            // disable loading state
            setIsLoading(false)
        }
    }

    const getDataflow = useCallback(
        (index: number) => {
            // if data flows is undefined or index is out of bounds, return null
            if (dataFlows.length <= index) return null
            // otherwise return data flow at index
            return dataFlows[index]
        },
        [dataFlows]
    )

    /**
     * Delete handler
     */
    const handleDelete = useCallback(
        async (name: string, _: number) => {
            // Set loading state
            setIsLoading(true)
            try {
                // send delete request to backend
                const response = await request.delete.dataflow(name);
                // update data flows
                await fetchDataFlows();

                // notify(response.data.message, "success")
            } catch (e) {
                console.error(e);
            } finally {
                // disable loading state
                setIsLoading(false)
            }
        },
        [fetchDataFlows, request]
    )

    /**
     *  Open update handler
     *
     *  @version 0.1.0
     */
    const openUpdateHandler = async () => {

        try {
            // fetch location name
            const name = await getLocationName(dataFlows[dataFlowIndex].lat, dataFlows[dataFlowIndex].lon)

            // set current location name
            setCurrentLocationName(name)

            // open update modal
            setIsUpdateModal(true)
        } catch (error) {
            console.error(error)
        }

    }

    /**
     * Component side effects
     */

    // Fetch data flows on mount
    useEffect(() => {
        fetchDataFlows();
    }, [fetchDataFlows])

    /**
     * Component render
     */

    // Render component
    return (
        <Page title={"Data flows"}>
            <Details
                sectionChangeCb={handleSectionChange}
                renderActions={
                    <Button isBlue onClick={() => setIsCreateModal(true)}>
                        New data flow
                        <Icon icon={icons.plus} width={20} height={20} />
                    </Button>
                }
                filtersConfig={{
                    searchConfig: {
                        input: {
                            value: search,
                            onChange: onChangeInput
                        }
                    }
                }}
                detailsConfig={
                    dataFlows.map((df) => {
                        return {
                            title: {
                                value: df.name,
                                icon: icons.chat
                            },
                            attributes: [
                                {
                                    name: "Name",
                                    value: df.name,
                                },
                                {
                                    name: "Server",
                                    value: df.server,
                                },
                            ]
                        }
                    })
                }
                deletable={{
                    isDeletable: true,
                    onDelete: handleDelete
                }}
                editConfig={{
                    onUpdate: openUpdateHandler
                }}
            >
                {getDataflow(dataFlowIndex) && (
                    <DataflowWindow
                        server={dataFlows[dataFlowIndex]?.server}
                        name={dataFlows[dataFlowIndex]?.name}
                    />
                )}
            </Details>
            {(isCreateModal) && (
                <AddDataFlowContext
                    icon={icons.plus}
                    title="New Data Flow Context"
                    textProceed="Add"
                    error={error}
                    onSubmit={onContextCreation}
                    onClose={() => setIsCreateModal(false)}
                />
            )}
            {(isUpdateModal) && (
                <AddDataFlowContext
                    disableName
                    icon={icons.pen}
                    title="Update Data Flow Context"
                    textProceed="Update"
                    defaultForm={{
                        name: dataFlows[dataFlowIndex]?.name ?? "",
                        server: new URL(dataFlows[dataFlowIndex]?.server).hostname,
                        port: new URL(dataFlows[dataFlowIndex]?.server).port,
                        protocol: new URL(dataFlows[dataFlowIndex]?.server).protocol + "//",
                        location: currentLocationName
                    }}
                    error={error}
                    onSubmit={onContextUpdate}
                    onClose={() => setIsUpdateModal(false)}
                />
            )}
        </Page>
    )
}

export default DataFlowsDetails
