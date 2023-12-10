// importing react and the CSS file for styling
import React from 'react';
import "./queue.css";

// the queue functional component with props
export default function Queue({ tracks, setCurrentIndex }) {
  return (
    // main container for the queue
    <div className="queue-container flex">
      {/* container for the queue content */}
      <div className="queue flex">
        {/* heading for the queue */}
        <p className="upNext">Up Next</p>
        {/* list of tracks */}
        <div className="queue-list">
          {/* iterating over the tracks array */}
            {tracks?.map((track, index) => (
              // individual queue item for each track
              <div 
                key={index + "key"} // unique key for react's rendering optimization
                className="queue-item flex"  // styling for each queue item
              onClick={() => setCurrentIndex(index)}> {/* setting the current track index on click */}
                {/* displaying the name of the track */}
                <p className="track-name">{track?.track?.name}</p>
                {/* display of the track duration */}
                <p>0:30</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
