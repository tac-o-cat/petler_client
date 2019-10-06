import { gql } from "apollo-boost";

const LOGIN_QUERY = gql`
  query($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        name
        id
      }
      channel {
        id
      }
    }
  }
`;

const CHECK_UNIQUE_EMAIL = gql`
  query($email: String!) {
    checkEmail(email: $email)
  }
`;

const SIGN_UP_MUTATION = gql`
  mutation($email: String!, $name: String!, $password: String!, $img: String!) {
    signUp(userInfo: { email: $email, name: $name, password: $password, img: $img }) {
      name
      id
    }
  }
`;

const GET_USER_BY_TOKEN = gql`
  query($token: String!) {
    getUserByToken(token: $token) {
      email
      name
      img
      channels {
        name
        id
      }
    }
  }
`;

const CREATE_PET_MUTATION = gql`
  mutation(
    $name: String!
    $gender: String
    $age: String
    $type: String
    $typeDetail: String
    $intro: String
    $img: String
    $todoColor: String!
    $cardCover: String
  ) {
    createPet(
      petInfo: {
        name: $name
        gender: $gender
        age: $age
        type: $type
        typeDetail: $typeDetail
        intro: $intro
        img: $img
        todoColor: $todoColor
        cardCover: $cardCover
      }
    ) {
      name
    }
  }
`;

const UPDATE_USER_INFO = gql`
  mutation($token: String!, $name: String!, $img: String!) {
    updateUserInfo(token: $token, name: $name, img: $img)
  }
`;

const CHECK_CURRENT_PASSWORD = gql`
  query($token: String!, $password: String!) {
    confirmPW(token: $token, password: $password)
  }
`;
const UPDATE_PASSWORD = gql`
  mutation($token: String!, $password: String!) {
    updatePassword(token: $token, password: $password)
  }
`;

const CREATE_CHANNEL = gql`
  mutation($token: String!, $name: String!, $channelId: ID) {
    createChannel(channelInfo: { token: $token, name: $name, channelId: $channelId }) {
      name
      id
    }
  }
`;
const UPDATE_CHANNEL = gql`
  mutation($token: String!, $name: String!, $img: String, $channelId: ID) {
    updateChannel(channelInfo: { token: $token, name: $name, img: $img, channelId: $channelId })
  }
`;

const ADD_USER_TO_CHANNEL = gql`
  mutation($token: String!, $email: String!, $channelId: ID!) {
    addUserToChannel(token: $token, email: $email, channelId: $channelId)
  }
`;

const CHANNEL_MEMBERS = gql`
  query($id: ID!, $userId: ID) {
    channel(id: $id) {
      name
      img
      id
      users(id: $userId) {
        name
        img
        id
        email
      }
    }
  }
`;

const DISMISS_MEMBER = gql`
  mutation($token: String!, $dismissId: ID!, $channelId: ID!) {
    dismissUser(token: $token, dismissId: $dismissId, channelId: $channelId)
  }
`;
const CHECK_UNIQUE_MEMBER = gql`
  query($id: ID!, $email: String!) {
    channel(id: $id) {
      id
      checkUser(email: $email)
    }
  }
`;

export {
  LOGIN_QUERY,
  CHECK_UNIQUE_EMAIL,
  SIGN_UP_MUTATION,
  CREATE_PET_MUTATION,
  GET_USER_BY_TOKEN,
  UPDATE_USER_INFO,
  CHECK_CURRENT_PASSWORD,
  UPDATE_PASSWORD,
  CREATE_CHANNEL,
  UPDATE_CHANNEL,
  ADD_USER_TO_CHANNEL,
  CHANNEL_MEMBERS,
  DISMISS_MEMBER,
  CHECK_UNIQUE_MEMBER,
};
