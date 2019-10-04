/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { CurrentUserContext } from "components/Authentication";
import { GET_CHANNEL } from "queries/queries";
import { useApolloClient } from "@apollo/react-hooks";

const SelectChannel = () => {
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [channels, setChannel] = useState([]);
  const client = useApolloClient();
  const { currentUser, currentChannel } = useContext(CurrentUserContext);

  useEffect(() => {
    console.log("fetchChannel 실행전", currentChannel);
    const fetchChannel = async () => {
      try {
        const { data } = await client.query({
          query: GET_CHANNEL,
          variables: { email: currentUser.email },
        });
        console.log("fetchChannel 중간", data);
        setChannel(data.user.channel);
        console.log("마지막");
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error.message);
      }
    };

    // 채널이 만들어지고,
    // 글로벌 스테이트에 만들어진 채널의 id가 업데이트가 되자마자 get요청을 날린다.
    // 그런데 방금 만들어진 채널이 반영되지 않은 채널 목록이 들어온다.
    // 추후 수정 요망

    setTimeout(fetchChannel, 5000);
    // fetchChannel();
  }, [currentChannel]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return channels.length ? (
    <>
      <Button onClick={handleClick}>{channels[0].name}</Button>
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
        {channels.map(option => (
          <MenuItem key={option.id + option.name} onClick={handleClose}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  ) : (
    // 이거 왜 안나와 추후 수정해야함
    <div>로딩...</div>
  );
};

export default SelectChannel;
