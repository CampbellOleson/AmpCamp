import React from "react";
import { Link } from "react-router-dom";

const AlbumIndexItem = props => {
  const album = props.album;
  return (
    <div key={album._id} className="album-list-item-container">
      <Link to={`/album/${album._id}`}>
        <img alt="wutang"
          className="album-cover-art"
          width="160px"
          height="160px"
          src={album.coverPhotoUrl}
        />
      </Link>
      <br />
      <div className="artist-show-album-info">
        <p>{album.title}</p>
      </div>
    </div>
  );
};

export default AlbumIndexItem;
