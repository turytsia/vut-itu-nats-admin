import { useCallback, useContext, useEffect, useState } from "react";
import Page from "../components/Page/Page";
import Button from "../components/Button/Button";
import { Icon } from "@iconify/react";
import icons from "../utils/icons";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext, notify } from "../context/AppContextProvider";
import { NameType, UserPatchType, UserType } from "../utils/axios";
import EditUserModal from "./modals/EditUserModal/EditUserModal";
import Tag from "../components/Tag/Tag";
import { SecondsToMs, dateFormat, datetimeFormat } from "../utils/common";
import Details from "../components/Details/Details";
import uuid from "react-uuid";
import { fetchUsers } from "../utils/common";

import classes from "./UserDetail.module.css";
import Users, { ExtendedUserType } from "../pages/Users/Users";
import DeleteUserModal from "./modals/DeleteUserModal/DeleteUserModal";

const UsersDetail = () => {
  const {
    operator: operatorName,
    account: accountName,
    user: userName,
  } = useParams();

  const navigate = useNavigate()
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { request } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<(UserPatchType & UserType) | null>(null);

  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);

  const fetch = useCallback(async () => {
    setIsLoading(true);

    try {
      const user = (await request.get.user(
        operatorName as string,
        accountName as string,
        userName as string
      )) as UserPatchType & UserType;
      setUser(user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onDeleteSubmit = async () => {
    try {
      setIsLoading(true);

      const response = await request.delete.user(
        operatorName as string,
        accountName as string,
        userName as string
      );

      setError(response.type === "success" ? "" : response.data.message);
      if (response.type === "success") {
        setIsDeleteModal(false);
        notify(response.data.message, "success");
        navigate(`/users`)
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onEditSubmit = async (settings: UserPatchType) => {
    try {
      setIsLoading(true);

      const response = await request.patch.user(
        operatorName as string,
        accountName as string,
        userName as string,
        settings as UserPatchType
      );

      setError(response.type === "success" ? "" : response.data.message);
      if (response.type === "success") {
        const user = (await request.get.user(
          operatorName as string,
          accountName as string,
          userName as string
        )) as UserPatchType & UserType;
        setUser(user);

        setIsEditModal(false);
        notify(response.data.message, "success");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    []
  );

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Page title={userName as string}>
      <Details
        renderActions={
          <>
            <Button isBlue onClick={() => setIsEditModal(true)}>
              Update User
              <Icon icon={icons.pen} width={20} height={20} />
            </Button>
            <Button isRed onClick={() => setIsDeleteModal(true)}>
              Delete User
              <Icon icon={icons.delete} width={20} height={20} />
            </Button>
          </>
        }
        filtersConfig={{
          searchConfig: {
            input: {
              value: search,
              onChange: onChangeInput,
            },
          },
        }}
        detailsConfig={[
          {
            title: {
              value: "General",
              icon: icons.settings,
            },
            attributes: [
              {
                name: "Name",
                value: userName,
              },
              {
                name: "Account",
                value: accountName,
              },
              {
                name: "Operator",
                value: operatorName,
              },
              {
                name: "Issuer",
                value: user?.iss,
              },
              {
                name: "Subject",
                value: user?.sub,
              },
              {
                name: "Created at",
                value: datetimeFormat(SecondsToMs(user?.iat!)),
              },
            ],
          },

          {
            title: {
              value: "Secret",
              icon: icons.lock,
            },
            attributes: [
              {
                name: "JWT Token",
                value: user?.jti,
                isSecret: true,
              },
              {
                name: "Signing Keys",
                value: user?.jti,
                isSecret: true,
              },
            ],
          },
          {
            title: {
              value: "Nats",
              icon: icons.message,
            },
            attributes: [
              {
                name: "Allow pub",
                value: user?.nats.pub.allow ? (
                  <span className={classes.tags}>
                    {user?.nats.pub.allow.map((tag) => (
                      <Tag key={uuid()} isBlue>
                        {tag}
                      </Tag>
                    ))}
                  </span>
                ) : null,
              },
              {
                name: "Allow sub",
                value: user?.nats.sub.allow ? (
                  <span className={classes.tags}>
                    {user?.nats.sub.allow.map((tag) => (
                      <Tag key={uuid()} isBlue>
                        {tag}
                      </Tag>
                    ))}
                  </span>
                ) : null,
              },
              {
                name: "Type",
                value: user?.nats.type,
              },
              {
                name: "Version",
                value: user?.nats.version,
              },
            ],
          },
        ]}
      />
      {isEditModal && user && (
        <EditUserModal
          error={error}
          user={user}
          onSubmit={onEditSubmit}
          onClose={() => setIsEditModal(false)}
        />
      )}
      {isDeleteModal && user && (
        <DeleteUserModal
          error={error}
          user={user}
          onSubmit={onDeleteSubmit}
          onClose={() => setIsDeleteModal(false)}
        />
      )}
    </Page>
  );
};

export default UsersDetail;
