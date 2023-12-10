import React from 'react'
import "./albuminfo.css";

export default function Albuminfo({ album }) {
    // an array to store the names of artists
    const artists = [];
    // iterating over each artist in the album object and adding their names to the artists array
    album?.artists?.forEach((element) => {
        artists.push(element.name);
    });

  return ( 
    // main container for the album information
  <div className="albuminfo-card">
    {/* container for the album name, using a marquee for text overflow */}
    <div className="albumName-container">
    <div className="marquee">
        <p>{album?.name + " - " + artists?.join(", ")}</p>
    </div>
    </div>
    {/* container for additional album information */}
    <div className="album-info">
        <p>{`${album?.name} is an ${album?.album_type} by ${artists?.join(", ")} 
        with ${album?.total_tracks} track(s)`}</p>
    </div>
    {/* container for the album release date */}
    <div className="album-release">
        <p>Release Date: {album?.release_date}</p>
    </div>

    </div>
    );
}
