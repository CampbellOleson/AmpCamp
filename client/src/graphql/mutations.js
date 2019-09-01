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
  CREATE_SONG: gql`
    mutation CreateSong(
      $title: String!
      $audioUrl: String!
      $artist: Int!
      $album: Int!
    ) {
      createSong(
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
  // CREATE_ALBUM: gql`
  //   mutation CreateAlbum(
  //     $title: String!
  //     $description: String!
  //     $by: String!
  //     $coverPhotoUrl: String!
  //     $artist: Int!
  //   ) {
  //     createAlbum(
  //       title: $title
  //       description: $description
  //       by: $by
  //       coverPhotoUrl: $coverPhotoUrl
  //       artist: $artist
  //     ) {
  //       title
  //       description
  //       by
  //       coverPhotoUrl
  //       artist {
  //         _id
  //         username
  //       }
  //       songs
  //     }
  //   }
  // `,
  // s3SignMutation: gql`
  //   mutations($filename: String!, $filetype: String!) {
  //     signS3(filename: $filename, filetype: $filetype) {
  //       url
  //       signedRequest
  //     }
  //   }
  // `,
};
