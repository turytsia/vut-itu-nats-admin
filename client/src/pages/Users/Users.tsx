/**
 *
 * @author xzhuka01
 */
import React, { useCallback, useContext, useEffect, useState } from "react";
import Page from "../../components/Page/Page";
import Table from "../../components/Table/Table";
import { Icon } from "@iconify/react";
import icons from "../../utils/icons";
import Button from "../../components/Button/Button";
import { UserType, UserPayload, UserPatchType } from "../../utils/axios";
import { AppContext, notify } from "../../context/AppContextProvider";
import {
  defaultFiltersConfig,
  defaultTableConfig,
} from "../../utils/views/tables";
import {
  NSCDateFormat,
  SecondsToMs,
  dateFormat,
  datetimeFormat,
  fetchAccounts,
  fetchUsers,
} from "../../utils/common";
import UserRowActions from "./components/UserRowActions";
import CreateUserModal from "./modals/CreateUserModal.module";
import DeleteUserModal from "../../UsersDetail/modals/DeleteUserModal/DeleteUserModal";
import { ExtendedAccountType } from "../Accounts/Accounts";

export type UsersExtention = { operator: string; account: string };
export type ExtendedUserType = UserType & UsersExtention;

const Users = () => {
  const { request, isLoading, setIsLoading } = useContext(AppContext);
  const [users, setUsers] = useState<ExtendedUserType[]>([]);
  const [accounts, setAccounts] = useState<ExtendedAccountType[]>([]);
  const [isCreateActive, setIsCreateActive] = useState<boolean>(false);
  const [isDeleteActive, setIsDeleteActive] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetch = useCallback(async () => {
    setIsLoading(true);

    try {
      const users = await fetchUsers();
      const accounts = await fetchAccounts()

      setAccounts(accounts);
      setUsers(users);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [request]);

  /**
   * Submits form to create new user
   */
  const onUserSubmit = useCallback(
    async (form: UserPayload) => {
      setIsLoading(true);
      try {
        const response = await request.post.user(
          form.operator as string,
          form.account as string,
          form
        );
        setError(response.type === "error" ? response.data.message : "");
        if (response.type === "error") {
          return;
        }

        const users = await fetchUsers();

        setUsers(users);
        setIsCreateActive(false);
        notify(response.data.message, "success");
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    },
    [request]
  );

  const renderContent = useCallback((key: string, user: any) => {
    switch (key) {
      case "name":
      case "iss":
      case "sub":
        return user[key];
      case "iat":
        return datetimeFormat(SecondsToMs(user[key]));
      case "":
        return <UserRowActions user={user} />;
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <Page title={`Users (${users.length})`}>
      <Table
        data={users}
        isLoading={isLoading}
        tableConfig={defaultTableConfig}
        filtersConfig={defaultFiltersConfig}
        renderContent={renderContent}
        renderActions={
          <Button isBlue onClick={() => setIsCreateActive(true)}>
            Create user
            <Icon icon={icons.plus} width={20} height={20} />
          </Button>
        }
      />
      {isCreateActive && (
        <CreateUserModal
          error={error}
          onSubmit={onUserSubmit}
          onClose={() => setIsCreateActive(false)}
          accountList={accounts}
        />
      )}
      {isDeleteActive && (
        <DeleteUserModal
          error={error}
          user={{} as UserPatchType & UserType}
          onSubmit={onUserSubmit as any}
          onClose={() => setIsCreateActive(false)}
        />
      )}
    </Page>
  );
};

export default Users;
