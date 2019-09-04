import React from "react";

const TracksList = props => {
  // if (props.tracks.length > 0) {
  //   console.log(props.tracks[0].file);
  // }
  return props.tracks.length > 0 ? (
    props.tracks.map((track, idx) => (
      <ul className="tracks-list-wrapper">
        <li id={`track-${idx}`} className="track-index-item" key={idx}>
          <div className="track-index-div">
            <div>{track.title}</div>
            <div id="track-file-info">{track.file ? track.file.name : ""}</div>
            <button
              className="track-delete-button"
              onClick={e => props.deleteTrack(track)}
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
    ))
  ) : (
    <div>
      <p>When you add tracks to your album they will appear here</p>
    </div>
  );
};

export default TracksList;
