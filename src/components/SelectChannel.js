/* eslint-disable no-console */
import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { CurrentUserContext } from "components/Authentication";

const SelectChannel = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const useStyles = makeStyles(() => ({
    root: {
      width: "100%",
      maxWidth: 360,
    },
  }));
  const classes = useStyles();

  const { currentUser, setCurrentChannel } = useContext(CurrentUserContext);
  const { channels } = currentUser;

  useEffect(() => {
    if (channels.length) setCurrentChannel({ id: channels[0].id, name: channels[0].name });
  }, [setCurrentChannel]);

  const handleClickListItem = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setCurrentChannel({ id: channels[index].id, name: channels[index].name });
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button onClick={handleClickListItem}>
          {channels.length ? (
            <ListItemText primary={channels[selectedIndex].name} />
          ) : (
            <div>로딩중</div>
          )}
        </ListItem>
      </List>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {channels.map((channel, index) => (
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
