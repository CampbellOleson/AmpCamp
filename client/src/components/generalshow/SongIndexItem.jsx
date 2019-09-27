import React from "react";

export const SongIndexItem = props => {
  // const type = props.type;
  return (
    <li key={props.song._id}>
      <div className={`song-list-item-container`}>
        <div className="song-play-button-container">
          <button
            className="song-play-button"
            onClick={e => props.pickSong(e, props.song)}
          />
        </div>
        <div className="song-info">
          <p>{props.song.title}</p>
        </div>
        <div className="song-info song-info-artist">
          <p>{props.album ? props.album.by : props.song.album.by}</p>
        </div>
        <div className="song-info song-info-album">
          <p>{props.album ? props.album.title : props.song.album.title}</p>
        </div>
      </div>
    </li>
  );
};

export const SongListHeader = () => (
  <div className="songlist-header">
    <div className="song-play-button-container"></div>
    <div className="song-info songheader-item">
      <p>TITLE</p>
    </div>
    <div className="song-info song-info-artist songheader-item">
      <p>ARTIST</p>
    </div>
    <div className="song-info song-info-album songheader-item">
      <p>ALBUM</p>
    </div>
  </div>
);
