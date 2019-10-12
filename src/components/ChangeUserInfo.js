import React, { useState, useContext } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ImageSelector from "components/ImageSelector";
import UploadProfilePic from "components/UploadProfilePic";
import { makeStyles } from "@material-ui/core/styles";
import { GET_USER_BY_TOKEN, UPDATE_USER_INFO } from "queries/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CurrentUserContext } from "components/Authentication";

const ChangeUserInfo = ({ history }) => {
  const { handleToast } = useContext(CurrentUserContext);
  const { data } = useQuery(GET_USER_BY_TOKEN, {
    variables: { token: localStorage.getItem("token") },
  });

  const [file, setFile] = useState("");
  const [user, setUser] = useState({
    name: data.getUserByToken.name,
    img: data.getUserByToken.img,
  });
  const { name, img } = user;

  const useStyles = makeStyles(() => ({
    changeUserInfoInput: {
      margin: 0,
    },
    profilePicGrid: {
      textAlign: "center",
    },
  }));

  const classes = useStyles();

  const [updateUserInfoMutation] = useMutation(UPDATE_USER_INFO, {
    refetchQueries: [
      {
        query: GET_USER_BY_TOKEN,
        variables: { token: localStorage.getItem("token") },
      },
    ],
    onCompleted({ updateUserInfo }) {
      if (updateUserInfo) {
        handleToast("정보 수정이 완료되었습니다, 멍멍!");
      }
    },
  });

  const handleEdit = async e => {
    e.preventDefault();
    const copiedUser = { ...user };
    if (file) {
      copiedUser.img = await UploadProfilePic(file);
    }
    updateUserInfoMutation({ variables: { token: localStorage.getItem("token"), ...copiedUser } });
  };

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <ValidatorForm ref={() => "form"} onSubmit={handleEdit} debounceTime={1000}>
      <Grid container spacing={2}>
        <Grid item className={classes.profilePicGrid} xs={12}>
          <ImageSelector onImageReady={setFile} prevImg={img} />
        </Grid>
        <Grid item xs={12}>
          <TextValidator
            label="유저네임"
            name="name"
            autoFocus
            fullWidth
            className={classes.changeUserInfoInput}
            variant="outlined"
            margin="dense"
            onChange={handleChange}
            value={name}
          />
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="contained" color="primary" onClick={handleEdit}>
            수정
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => history.push("/mypage")}
          >
            뒤로 가기
          </Button>
        </Grid>
      </Grid>
    </ValidatorForm>
  );
};

export default ChangeUserInfo;
