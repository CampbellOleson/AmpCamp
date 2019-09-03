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
            album{
                title 
                description
                by 
                coverPhotoUrl
                songs{
                    title
                    audioUrl 
                }
                artist{
                    _id
                    username
                }
            }
            artist{
                _id
                username
            }
        }
    }`,
}

