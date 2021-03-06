import React from "react";
import ReactAudioPlayer from "react-audio-player";

const playerStyle = {
  backgroundColor: "#282828",
  borderRadius: "0"
};

const PlaybarNav = props => (
  <div className="audio-player-element">
    <div className="currently-playing-info-container">
      <img
      alt='wutang'
        src={
          props.album
            ? props.album.coverPhotoUrl
            : props.song.album.coverPhotoUrl
        }
        className="mini-cover-photo"
      />
      <div className="currently-playing-artist-title">
        <span className="currently-playing-title">
          <p>{props.song.title}</p>
        </span>
        <span className="currently-playing-artist">
          {props.album ? props.album.by : props.song.album.by}
        </span>
      </div>
    </div>
    <div className="player-wrapper">
      <ReactAudioPlayer
        className="audio-player"
        src={props.song.audioUrl}
        style={playerStyle}
        controls
        autoPlay
        volume={0.03}
      />
    </div>
  </div>
);

export default PlaybarNav;
