import React, { useState, createContext } from "react";
import { withRouter } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER_BY_TOKEN } from "queries/queries";
import Toast from "components/Toast";

export const CurrentUserContext = createContext();

const AuthenticationProvider = ({ history, children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [currentChannel, setCurrentChannel] = useState({
    id: "",
    name: "",
  });
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleToast = message => {
    setOpenToast(true);
    setToastMessage(message);
  };

  const { error, loading } = useQuery(GET_USER_BY_TOKEN, {
    variables: { token: localStorage.getItem("token") },
    onCompleted(data) {
      setCurrentUser(data.getUserByToken);
      handleToast(`${data.getUserByToken.name} 집사님, 반갑습니다🐱🐶`);
    },
  });

  if (error) {
    localStorage.removeItem("token");
    history.push("/");
  }
  if (loading) {
    const jwt = localStorage.getItem("token");
    if (!jwt) history.push("/");
    return <div />;
  }

  const value = {
    currentUser,
    currentChannel,
    setCurrentChannel,
    setCurrentUser,
    openToast,
    setOpenToast,
    handleToast,
  };

  return (
    <CurrentUserContext.Provider value={value}>
      <div>{children}</div>
      <Toast message={toastMessage} open={openToast} openToast={setOpenToast} />
    </CurrentUserContext.Provider>
  );
};

export const Authentication = withRouter(AuthenticationProvider);
