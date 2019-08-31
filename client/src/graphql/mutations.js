import gql from "graphql-tag";

export default {
 LOGIN_USER: gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      loggedIn
      username
    }
  }
  `,
 REGISTER_USER: gql`
  mutation RegisterUser($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password) {
      token
      loggedIn
      username
    }
  }
  `,
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!){
      verifyUser(token: $token){
        loggedIn
      }
    }`
}
