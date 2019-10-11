/* eslint-disable no-console */
import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { CurrentUserContext } from "components/Authentication";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER_BY_TOKEN } from "queries/queries";

const SelectChannel = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const useStyles = makeStyles(() => ({
    root: {
      width: "100%",
      textAlign: "center",
    },
  }));
  const classes = useStyles();

  const { setCurrentChannel, currentChannel } = useContext(CurrentUserContext);
  const { data, loading } = useQuery(GET_USER_BY_TOKEN, {
    variables: { token: localStorage.getItem("token") },
  });

  useEffect(() => {
    if (data.getUserByToken.channels.length) {
      setCurrentChannel({
        id: data.getUserByToken.channels[0].id,
        name: data.getUserByToken.channels[0].name,
      });
    }
  }, [data.getUserByToken.channels]);

  const handleClickListItem = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setCurrentChannel({
      id: data.getUserByToken.channels[index].id,
      name: data.getUserByToken.channels[index].name,
    });
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button onClick={handleClickListItem}>
          {!loading && data.getUserByToken.channels.length ? (
            <ListItemText primary={currentChannel.name} />
          ) : (
            <div>로딩중</div>
          )}
        </ListItem>
      </List>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {data.getUserByToken.channels.map((channel, index) => (
          <MenuItem
            key={channel.name}
            selected={index === selectedIndex}
            onClick={event => {
              handleMenuItemClick(event, index);
            }}
            value={channel.name}
          >
            {channel.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SelectChannel;
