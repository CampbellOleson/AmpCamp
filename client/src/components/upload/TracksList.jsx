import React from "react";

const TracksList = props => {
  return props.tracks.length > 0 ? (
    <div className="tracks-list-wrapper">
    <ul>
    {props.tracks.reverse().map((track, idx) => (
        <li id={`track-${idx}`} className="track-index-item" key={idx}>
          <div className="track-index-div">
            <div className="track-info-name">{track.title}</div>
            {track.file ? <div className="file-name">{track.file.name}</div> : <div className="no-file">✖︎ No file attached ✖︎</div>}
            <button
              className="track-delete-button"
              onClick={e => props.deleteTrack(track)}
            >
              ✕
            </button>
          </div>
        </li>
    ))}
    </ul>
    </div>
  ) : (
    <div id="no-tracks">
      <p>Your tracks will appear here</p>
    </div>
  );
};

export default TracksList;
