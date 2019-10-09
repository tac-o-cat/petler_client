import React, { useState, createContext } from "react";
import { withRouter } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER_BY_TOKEN } from "queries/queries";

export const CurrentUserContext = createContext();

const AuthenticationProvider = ({ history, children }) => {
  const [currentUser, setCurrentUser] = useState({
    name: "",
  });
  const [currentChannel, setCurrentChannel] = useState({
    id: "",
    name: "",
  });

  const { error, loading } = useQuery(GET_USER_BY_TOKEN, {
    variables: { token: localStorage.getItem("token") },
    onCompleted(data) {
      setCurrentUser(data.getUserByToken.name);
    },
  });
  if (error) {
    localStorage.removeItem("token");
    history.push("/");
  }
  if (loading) {
    const jwt = localStorage.getItem("token");
    if (!jwt) history.push("/");
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
