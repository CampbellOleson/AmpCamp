import React from "react";
import Queries from "../graphql/queries";
import { Query } from "react-apollo";
import ReactAudioPlayer from "react-audio-player";
const { FETCH_ARTIST } = Queries;

class ArtistShow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Query
        query={FETCH_ARTIST}
        variables={{ id: this.props.match.params.id }}
      >
        {({ loading, err, data }) => {
          if (loading) return "Loading...Please Wait...";
          if (err) return `Error! ${err.message}`;
          console.log(data);
          console.log(data.user);

          return (
            <div>
              <div>
                {data.user.username}
                {data.user.email}
                {data.user.albums[104].title}
                {data.user.albums[104].songs[0].audioUrl}
              </div>
              <div>
                <ReactAudioPlayer
                  src={data.user.albums[104].songs[0].audioUrl}
                  autoPlay
                  controls
                />
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ArtistShow;
