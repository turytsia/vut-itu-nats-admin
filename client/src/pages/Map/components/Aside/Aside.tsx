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

type PropsType = {
  dataflow: DataFlowType;
  onClose: () => void;
};

const Aside = ({ dataflow, onClose }: PropsType) => {
  const { messages, isOwn, publish, isConnected } = useNats(dataflow.server);

  const { isDark } = useContext(AppContext);

  const asideStyles = classNames(classes.aside, {
    [classes.dark]: isDark,
  });

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
