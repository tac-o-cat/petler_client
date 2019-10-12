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
      id
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
    $token: String!
    $name: String!
    $gender: String
    $age: String
    $type: String
    $typeDetail: String
    $intro: String
    $img: String!
    $todoColor: String!
    $cardCover: String
    $channelId: ID!
  ) {
    createPet(
      petInfo: {
        token: $token
        name: $name
        gender: $gender
        age: $age
        type: $type
        typeDetail: $typeDetail
        intro: $intro
        img: $img
        todoColor: $todoColor
        cardCover: $cardCover
        channelId: $channelId
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
  query($token: String!, $id: ID!) {
    user(token: $token) {
      channels(id: $id) {
        users {
          name
          img
          id
          email
        }
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
  query($token: String!, $id: ID!, $email: String!) {
    user(token: $token) {
      channels(id: $id) {
        id
        checkUser(email: $email)
      }
    }
  }
`;

const GET_CHANNEL_TODOS = gql`
  query($token: String!, $id: ID!) {
    user(token: $token) {
      channels(id: $id) {
        todos {
          id
          todo
          is_done
          pets {
            name
            id
          }
        }
      }
    }
  }
`;

const GET_CHANNEL_INFO = gql`
  query($token: String!, $id: ID!) {
    user(token: $token) {
      channels(id: $id) {
        users {
          id
          name
          user_channel_id
        }
        pets {
          id
          name
          img
        }
      }
    }
  }
`;

const CREATE_TODO = gql`
  mutation(
    $token: String!
    $todo_id: ID
    $todo: String!
    $memo: String
    $push_date: Date
    $end_date: Date
    $repeat_day: String
    $pet_id: ID!
    $channel_id: ID
    $assigned_id: ID!
  ) {
    createTodo(
      todoInfo: {
        token: $token
        todo_id: $todo_id
        todo: $todo
        memo: $memo
        push_date: $push_date
        end_date: $end_date
        repeat_day: $repeat_day
        pet_id: $pet_id
        channel_id: $channel_id
        assigned_id: $assigned_id
      }
    ) {
      id
      todo
    }
  }
`;

const UPDATE_TODO = gql`
  mutation(
    $token: String!
    $todo_id: ID
    $todo: String!
    $memo: String
    $push_date: Date
    $end_date: Date
    $repeat_day: String
    $pet_id: ID!
    $channel_id: ID
    $assigned_id: ID!
  ) {
    updateTodo(
      updateTodoInfo: {
        token: $token
        todo_id: $todo_id
        todo: $todo
        memo: $memo
        push_date: $push_date
        end_date: $end_date
        repeat_day: $repeat_day
        pet_id: $pet_id
        channel_id: $channel_id
        assigned_id: $assigned_id
      }
    )
  }
`;

const GET_TODO = gql`
  query($token: String!, $id: ID!, $todo_id: ID!) {
    user(token: $token) {
      channels(id: $id) {
        todos(id: $todo_id) {
          id
          todo
          memo
          push_date
          end_date
          repeat_day
          is_done
          pets {
            id
          }
          assigned_id
        }
      }
    }
  }
`;

const DELETE_TODO = gql`
  mutation($token: String!, $id: ID!) {
    deleteTodo(token: $token, id: $id)
  }
`;

const IS_DONE_TODO = gql`
  mutation($token: String!, $id: ID!) {
    isDoneTodo(token: $token, id: $id)
  }
`;
const GET_PETS = gql`
  query($token: String!, $id: ID!) {
    user(token: $token) {
      channels(id: $id) {
        pets {
          id
          name
          gender
          age
          type
          type_detail
          intro
          img
          todo_color
          card_cover
        }
      }
    }
  }
`;
const GET_PET_PROFILE = gql`
  query($id: ID!) {
    pet(id: $id) {
      name
      gender
      age
      type
      type_detail
      intro
      img
      todo_color
      card_cover
    }
  }
`;
const UPDATE_PET_PROFILE = gql`
  mutation(
    $petId: ID
    $token: String!
    $name: String!
    $gender: String
    $age: String
    $type: String
    $typeDetail: String
    $intro: String
    $img: String!
    $todoColor: String!
    $cardCover: String
    $channelId: ID!
  ) {
    updatePet(
      updatePet: {
        petId: $petId
        token: $token
        name: $name
        gender: $gender
        age: $age
        type: $type
        typeDetail: $typeDetail
        intro: $intro
        img: $img
        todoColor: $todoColor
        cardCover: $cardCover
        channelId: $channelId
      }
    )
  }
`;

const DELETE_PET = gql`
  mutation($token: String!, $id: ID!) {
    deletePet(token: $token, id: $id)
  }
`;

const TODO_SUBSCRIPTION = gql`
  subscription($id: ID!) {
    todo(channel_id: $id) {
      mutation
      data {
        id
        todo
        is_done
        pets {
          name
          id
        }
      }
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
  GET_CHANNEL_TODOS,
  GET_CHANNEL_INFO,
  CREATE_TODO,
  UPDATE_TODO,
  GET_TODO,
  DELETE_TODO,
  IS_DONE_TODO,
  GET_PETS,
  GET_PET_PROFILE,
  UPDATE_PET_PROFILE,
  DELETE_PET,
  TODO_SUBSCRIPTION,
};
