import React, { useContext } from "react";
import classes from "./Aside.module.css";
import { Icon } from "@iconify/react";
import icons from "../../../../utils/icons";
import useNats from "../../../../hooks/useNats";
import { DataFlowType } from "../../../../utils/axios";
import { AppContext } from "../../../../context/AppContextProvider";
import classNames from "classnames";
import MessageBox from "../../../DataFlow/components/MessageBox";
import MessageForm from "../../../DataFlow/components/MessageForm";

/**
 * @fileoverview Aside component implementation
 *
 * This file contains implementation of Aside component.
 *
 * @module Aside
 *
 * @author xturyt00
 */

/**
 * Aside component props
 *
 * @typedef PropsType
 *
 * @property {DataFlowType} dataflow - Dataflow object.
 *
 * @property {() => void} onClose - Function that closes the aside.
 *
 */
type PropsType = {
  dataflow: DataFlowType;
  onClose: () => void;
};


/**
 * Aside component. This component renders the aside
 *
 * @param props - Component props.
 *
 * @param props.dataflow - Dataflow object.
 *
 * @param props.onClose - Function that closes the aside.
 *
 *
 * @param dataflow - Dataflow object.
 * @param onClose - Function that closes the aside.
 * @constructor
 */
const Aside = ({ dataflow, onClose }: PropsType) => {
  /**
   * Hooks for nats
   */

  // hooks for nats
  const { messages, isOwn, publish, isConnected } = useNats(dataflow.server);

  // hooks for theme
  const { isDark } = useContext(AppContext);

  // hooks for component state, headers and styles
  const asideStyles = classNames(classes.aside, {
    [classes.dark]: isDark,
  });

  // render component
  return (
    <aside className={asideStyles}>
      <div className={classes.main}>
        <div className={classes.header}>
          <h4>
            {dataflow.name}
            {isConnected() ? (
              <span className={classes.online}>Online</span>
            ) : (
              <span className={classes.offline}>Offline</span>
            )}
          </h4>
          <Icon icon={icons.close} height={20} width={20} onClick={onClose} />
        </div>
        <div className={classes.container}>
          {messages.map((message) => (
            <MessageBox
              key={message.subject}
              message={message}
              isOwn={isOwn(message)}
            />
          ))}
        </div>
        <div className={classes.formContainer}>
          <MessageForm onSubmit={publish}></MessageForm>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
