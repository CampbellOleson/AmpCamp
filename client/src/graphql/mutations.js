import gql from "graphql-tag";

export default {
  LOGIN_USER: gql`
    mutation LoginUser($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        _id
        token
        loggedIn
        username
        artist
      }
    }
  `,
  REGISTER_USER: gql`
    mutation RegisterUser(
      $email: String!
      $username: String!
      $password: String!
      $artist: Boolean
    ) {
      register(
        email: $email
        username: $username
        password: $password
        artist: $artist
      ) {
        _id
        token
        loggedIn
        username
        artist
      }
    }
  `,
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        loggedIn
      }
    }
  `,
  // are we going to have to make the artist fields somehow GraphQLID?
  NEW_ALBUM: gql`
    mutation newAlbum(
      $title: String!
      $description: String!
      $by: String!
      $coverPhotoUrl: String!
      $artist: ID!
    ) {
      newAlbum(
        title: $title
        description: $description
        by: $by
        coverPhotoUrl: $coverPhotoUrl
        artist: $artist
      ) {
        _id
        title
        description
        by
        coverPhotoUrl
        artist {
          _id
          username
        }
        songs {
          title
        }
      }
    }
  `,
  NEW_SONG: gql`
    mutation newSong(
      $title: String!,
      $audioUrl: String!,
      $artist: ID!,
      $album: ID!
    ) {
      newSong(
        title: $title
        audioUrl: $audioUrl
        artist: $artist
        album: $album 
      ) {
        title
        audioUrl
        artist {
          _id
          username
        }
        album {
          title
          description
          by
          coverPhotoUrl
          artist {
            _id
            username
          }
        }
      }
    }
  `,
  S3_SIGN: gql`
    mutation($filename: String!, $filetype: String!) {
      signS3(filename: $filename, filetype: $filetype) {
        url
        signedRequest
      }
    }
  `
};