import React, { useEffect, useState, createContext } from "react";
import { withRouter } from "react-router-dom";
import { useApolloClient } from "@apollo/react-hooks";
import { GET_USER_BY_TOKEN } from "queries/queries";

export const CurrentUserContext = createContext();

const AuthenticationProvider = ({ history, children }) => {
  const client = useApolloClient();

  const [currentUser, setCurrentUser] = useState({
    email: "",
    name: "",
    channels: [],
  });
  const [currentChannel, setCurrentChannel] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      history.push("/");
    }
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: GET_USER_BY_TOKEN,
          variables: { token: localStorage.getItem("token") },
        });

        setCurrentUser({
          email: data.getUserByToken.email,
          name: data.getUserByToken.name,
          channels: data.getUserByToken.channels,
        });
      } catch (error) {
        localStorage.removeItem("token");
        history.push("/");
      }
    };
    fetchData();
  }, [client, history, currentUser.channels, currentChannel]);

  if (currentUser.email === "") {
    return <div>loading...</div>;
  }

  const value = {
    currentUser,
    currentChannel,
    setCurrentChannel,
    setCurrentUser,
  };

  return (
    <CurrentUserContext.Provider value={value}>
      <div>{children}</div>
    </CurrentUserContext.Provider>
  );
};

export const Authentication = withRouter(AuthenticationProvider);
