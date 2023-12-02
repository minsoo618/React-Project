import React from 'react';
import "./songCard.css";
import Albumimage from './albumimage';
import Albuminfo from './albuminfo';

export default function SongCard( { album }) {
  return ( 
    <div className="songCard-body flex">
        <Albumimage url={album?.images[0]?.url} />
        <Albuminfo album={album} />
    </div>
  );
}
