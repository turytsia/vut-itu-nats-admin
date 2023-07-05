/**
 * @fileoverview Switch component
 *
 * This file contains Switch component implementation
 *
 * @module Header
 * 
 * @author xturyt00
 */

import { useContext } from "react";
import ReactSwitch from "react-switch";
import icons from "../../../../utils/icons"
import colors from "../../../../utils/colors"
import { Icon } from '@iconify/react';
import { AppContext } from "../../../../context/AppContextProvider";

import classes from "./Switch.module.css"

/**
 * Switch component, that toggles dark mode at Header.tsx
 * 
 * @returns Configured react switch
 */
const Switch = () => {

    const { isDark, toggleIsDark } = useContext(AppContext)

    return <ReactSwitch
        checked={isDark}
        onChange={toggleIsDark}
        onColor={colors.blue}
        offColor={colors.gray}
        onHandleColor={colors.darkBlueLight}
        handleDiameter={24}
        checkedIcon={false}
        uncheckedIcon={false}
        uncheckedHandleIcon={<Icon icon={icons.sun} className={classes.icon} />}
        checkedHandleIcon={<Icon icon={icons.moon} className={classes.icon} />}/>
}

export default Switch