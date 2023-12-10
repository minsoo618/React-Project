import React from 'react';
import "./songCard.css";
// importing components for album image and information display
import Albumimage from './albumimage';
import Albuminfo from './albuminfo';

export default function SongCard( { album }) {
  return ( 
    // main container for the song card
    <div className="songCard-body flex">
      {/* Albumimage component with the album image URL passed as a prop */}
        <Albumimage url={album?.images[0]?.url} />
        {/* Albuminfo component with the entire album object passed as a prop */}
        <Albuminfo album={album} />
    </div>
  );
}
