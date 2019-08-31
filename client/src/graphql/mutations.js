import gql from "graphql-tag";

export default {
 LOGIN_USER: gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      loggedIn

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
