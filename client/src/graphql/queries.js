import gql from "graphql-tag";

export default {
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  FETCH_SONGS: gql`
    {
      songs {
        _id
        title
        audioUrl
        album {
          title
          description
          by
          coverPhotoUrl
          songs {
            title
            audioUrl
          }
          artist {
            _id
            username
          }
        }
      }
    }
  `,

  FETCH_ALBUMS: gql`
    {
      albums {
        title
        by
        coverPhotoUrl
        songs {
            title
            audioUrl
        }
        artist {
          _id
        }
      }
    }
  `,

  FETCH_ALBUM: gql`
    query fetchAlbum($id: ID!) {
      album(_id: $id) {
        title
        by
        coverPhotoUrl
        artist {
            username
            bannerPhoto
        }
        songs {
            title
            audioUrl
            artist {
                username
            }
        }
      }
    }
  `,

  FETCH_ALBUMS_AND_ARTISTS: gql`
    {
      albums {
        _id
        title
        by
        coverPhotoUrl
          songs{
            title 
            audioUrl
          }
        artist {
          _id
          
        
        }
        
      }
      users {
        _id
        username
      }
    }
  `,

  FETCH_ARTIST: gql`
    query FetchArtist($id: ID!) {
      user(_id: $id) {
        username
        _id
        email
        bannerPhoto
        albums {
          _id
          title
          description
          by
          coverPhotoUrl
          songs {
            _id
            title
            audioUrl
            artist {
              username
            }
          }
        }
      }
    }
  `
};
