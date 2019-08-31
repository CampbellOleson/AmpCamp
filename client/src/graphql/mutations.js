import gql from "graphql-tag";

export default {
 LOGIN_USER: gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      loggedIn
      username
      artist
    }
  }
  `,
 REGISTER_USER: gql`
  mutation RegisterUser($email: String!, $username: String!, $password: String!, $artist: Boolean) {
    register(email: $email, username: $username, password: $password, artist: $artist) {
      token
      loggedIn
      username
      artist
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
