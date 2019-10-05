import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import { Link as RouterLink } from "react-router-dom";

const ChannelSettingsBtn = () => {
  const ITEM_HEIGHT = 48;
  const options = [
    { name: "채널 관리", path: "/channelsettings" },
    { name: "집사 관리", path: "/membersettings" },
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <SettingsIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 100,
          },
        }}
      >
        {options.map(option => (
          <MenuItem to={option.path} component={RouterLink} key={option.name} onClick={handleClose}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ChannelSettingsBtn;
