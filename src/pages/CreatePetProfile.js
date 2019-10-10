/* eslint-disable no-alert */
import React, { useState, useContext, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import UploadProfilePic from "components/UploadProfilePic";
import ImageSelector from "components/ImageSelector";
import { CirclePicker } from "react-color";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import {
  CREATE_PET_MUTATION,
  GET_PETS,
  GET_PET_PROFILE,
  UPDATE_PET_PROFILE,
} from "queries/queries";
import { CurrentUserContext } from "components/Authentication";

// todo: 펫 프로필 생성 후 로직. 어느 페이지로 리다이렉트할지?
const CreatePetProfile = ({ location, history }) => {
  const { currentChannel } = useContext(CurrentUserContext);
  const [file, setFile] = useState("");
  /* 펫 정보가 담긴 state 설정 */
  const [petInfo, setPetInfo] = useState({
    name: "",
    gender: "",
    age: "",
    type: "",
    typeEtc: "",
    typeDetail: "",
    intro: "",
    todoColor: "#2196f3",
    img: "https://codestates.com/images/logo_sub_b_simple.png",
    cardCover: "",
  });
  const { name, gender, age, type, typeEtc, typeDetail, intro, todoColor, img } = petInfo;

  const petGender = [
    { value: "", label: "" },
    { value: "남", label: "남" },
    { value: "여", label: "여" },
    { value: "중성 남", label: "중성 남" },
    { value: "중성 여", label: "중성 여" },
  ];
  const petAge = [
    { value: "", label: "" },
    { value: "베이비", label: "베이비" },
    { value: "어덜트", label: "어덜트" },
    { value: "시니어", label: "시니어" },
  ];
  const petType = [
    { value: "", label: "" },
    { value: "강아지", label: "강아지" },
    { value: "고양이", label: "고양이" },
    { value: "햄스터", label: "햄스터" },
    { value: "그 외", label: "그 외" },
  ];
  const palette = ["#2196f3", "#9c27b0", "#009688", "#ffc107", "#ff9800"];

  const client = useApolloClient();
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { pet },
      } = await client.query({
        query: GET_PET_PROFILE,
        variables: { id: location.state.petId },
      });

      setPetInfo({
        name: pet.name,
        gender: pet.gender,
        age: pet.age,
        type: pet.type,
        typeDetail: pet.type_detail,
        typeEtc: "",
        intro: pet.intro,
        todoColor: pet.todo_color,
        img: pet.img,
        cardCover: pet.card_cover,
      });
    };
    if (location.state.petId) {
      fetchData();
    }
  }, []);

  /* input에 onChange 핸들러 적용 - input 값이 바뀔 때마다 state 값 바뀜 */
  const handleChange = e => {
    setPetInfo({ ...petInfo, [e.target.name]: e.target.value });
  };
  const handleColorChange = color => {
    setPetInfo({ ...petInfo, todoColor: color.hex });
  };
  const handlefileChange = event => {
    setPetInfo({ ...petInfo, cardCover: event.target.files[0] });
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
  };

  const [createPetMutation] = useMutation(CREATE_PET_MUTATION, {
    onCompleted() {
      if (location.state.prevPath === "/petsettings") {
        history.push("/petsettings");
      } else {
        history.push("/main");
      }
    },
  });
  const [updatePetMutation] = useMutation(UPDATE_PET_PROFILE, {
    onCompleted(data) {
      if (data) {
        history.push("/petsettings");
      }
    },
  });
  /* submit 버튼 이벤트 핸들러 - 클릭 시 mutation 보냄 */

  const handleSubmit = async e => {
    e.preventDefault();
    const copiedPet = { ...petInfo };
    if (file) {
      copiedPet.img = await UploadProfilePic(file);
    }
    if (location.state.isEdit) {
      updatePetMutation({
        variables: {
          ...copiedPet,
          petId: location.state.petId,
          token: localStorage.getItem("token"),
          channelId: currentChannel.id,
        },
        refetchQueries: [
          {
            query: GET_PETS,
            variables: { id: currentChannel.id, token: localStorage.getItem("token") },
          },
          {
            query: GET_PET_PROFILE,
            variables: { id: location.state.petId },
          },
        ],
        awaitRefetchQueries: true,
      });
    } else {
      createPetMutation({
        variables: {
          ...copiedPet,
          token: localStorage.getItem("token"),
          channelId: currentChannel.id,
        },
        refetchQueries: [
          {
            query: GET_PETS,
            variables: { id: currentChannel.id, token: localStorage.getItem("token") },
          },
        ],
        awaitRefetchQueries: true,
      });
    }
  };

  /* style 적용 */
  const useStyles = makeStyles(theme => ({
    title: {
      marginBottom: theme.spacing(4),
      fontSize: "1.5rem",
      textAlign: "center",
    },
    petProfileInput: {
      margin: 0,
    },
    petContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    },
    profilePicGrid: {
      textAlign: "center",
    },
    colorPickerGrid: {
      display: "flex",
      justifyContent: "center",
    },
    menu: {
      width: 200,
    },
  }));

  const classes = useStyles();

  return (
    <Container className={classes.petContainer} maxWidth="xs">
      <div>
        <Typography className={classes.title} component="h1" variant="h5">
          펫 프로필
        </Typography>
        <ValidatorForm ref={() => "form"} onSubmit={handleSubmit} debounceTime={1000}>
          <Grid container spacing={2}>
            <Grid item className={classes.profilePicGrid} xs={12}>
              <ImageSelector onImageReady={setFile} prevImg={img} />
            </Grid>
            <Grid item xs={8}>
              <TextValidator
                label="펫 이름"
                name="name"
                validators={["required"]}
                errorMessages={["펫 이름을 입력해 주세요"]}
                autoFocus
                fullWidth
                className={classes.petProfileInput}
                variant="outlined"
                margin="dense"
                onChange={handleChange}
                value={name}
              />
            </Grid>
            <Grid item xs={4}>
              <SelectValidator
                select
                label="펫 성별"
                name="gender"
                validators={["required"]}
                errorMessages={["펫 성별을 선택해 주세요"]}
                autoFocus
                fullWidth
                className={classes.petProfileInput}
                variant="outlined"
                margin="dense"
                onChange={handleChange}
                value={gender}
                SelectProps={{
                  native: true,
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
              >
                {petGender.map(option => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </SelectValidator>
            </Grid>
            <Grid item xs={12}>
              <SelectValidator
                select
                label="펫 연령대"
                name="age"
                validators={["required"]}
                errorMessages={["펫 연령대를 선택해 주세요"]}
                autoFocus
                fullWidth
                className={classes.petProfileInput}
                variant="outlined"
                margin="dense"
                onChange={handleChange}
                value={age}
                SelectProps={{
                  native: true,
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
              >
                {petAge.map(option => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </SelectValidator>
            </Grid>
            <Grid item xs={6}>
              {type === "그 외" ? (
                <TextValidator
                  label="펫 타입"
                  name="typeEtc"
                  validators={["required"]}
                  errorMessages={["펫 타입을 입력해 주세요"]}
                  autoFocus
                  fullWidth
                  className={classes.petProfileInput}
                  variant="outlined"
                  margin="dense"
                  onChange={handleChange}
                  value={typeEtc}
                />
              ) : (
                <SelectValidator
                  select
                  label="펫 타입"
                  name="type"
                  validators={["required"]}
                  errorMessages={["펫 타입을 선택해 주세요"]}
                  autoFocus
                  fullWidth
                  className={classes.petProfileInput}
                  variant="outlined"
                  margin="dense"
                  onChange={handleChange}
                  value={type}
                  SelectProps={{
                    native: true,
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                >
                  {petType.map(option => (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  ))}
                </SelectValidator>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextValidator
                label="종류"
                name="typeDetail"
                autoFocus
                fullWidth
                className={classes.petProfileInput}
                variant="outlined"
                margin="dense"
                onChange={handleChange}
                value={typeDetail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                label="펫 소개"
                name="intro"
                autoFocus
                fullWidth
                className={classes.petProfileInput}
                variant="outlined"
                margin="dense"
                onChange={handleChange}
                value={intro}
              />
            </Grid>
            <Grid item xs={4}>
              <div>투두 테마 컬러</div>
            </Grid>
            <Grid item xs={8} className={classes.colorPickerGrid}>
              <CirclePicker color={todoColor} onChange={handleColorChange} colors={palette} />
            </Grid>
            <Grid item xs={4}>
              <div>펫 프로필 배경</div>
            </Grid>
            <Grid item xs={8}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handlefileChange}
              />
              <label htmlFor="raised-button-file">
                <Button fullWidth variant="contained" color="primary" component="span">
                  업로드
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth type="submit" variant="contained" color="primary">
                {location.state.isEdit ? "펫 정보 수정" : "펫 프로필 생성"}
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    </Container>
  );
};

export default CreatePetProfile;
