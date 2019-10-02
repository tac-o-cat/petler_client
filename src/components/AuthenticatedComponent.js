import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useApolloClient } from "@apollo/react-hooks";
import { GET_USER_BY_TOKEN } from "queries/queries";

const AuthenticatedComponent = ({ history, children }) => {
  const client = useApolloClient();
  const [currentUser, setCurrentUser] = useState(undefined);

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
        console.log(data);
        setCurrentUser(data.getUserByToken.email);
      } catch (error) {
        localStorage.removeItem("token");
        history.push("/");
      }
    };
    fetchData();
  }, []);

  if (currentUser === undefined) return <div>loading...</div>;
  return <div>{children}</div>;
};

export default withRouter(AuthenticatedComponent);
