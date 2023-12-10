import React from 'react';
import "./albumimage.css";

export default function Albumimage({url}) {
  return (
    // main container for the album image 
    <div className="albumimage flex">
      {/* actual album image */}
        <img src={url} alt="album art" className="albumimage-art" />
        {/* container for the shadow effect */}
    <div className="albumimage-shadow">
      {/* shadow image, using the same source URL */}
        <img src={url} alt="shadow" className="albumimage-shadow" />
    </div>

  
  </div>
  );
}
