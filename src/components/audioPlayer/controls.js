// importing necessary modules and components
import React from 'react';
import "./controls.css"; // importing CSS for styling
import { IconContext } from "react-icons"; //context provider for react-icons
import {IoPlaySkipBack, IoPlaySkipForward, IoPlay} from "react-icons/io5" // importing specific play control icons
import {FaPause} from "react-icons/fa"; // importing pause icon

// controls functional component with props
export default function Controls({
    isPlaying, // prop to check if the music is playing
    setIsPlaying, // to set the playing state
    handleNext, // to handle the next action
    handlePrev, // to handle the previous action
}) {
  return (
    // using IconContext.Provider to set default properties for icons
    // container for control buttons such as previous track button
    // play/pause button
  <IconContext.Provider value={{size: "35px",color: "#C4D0E3" }}>
    <div className="controls-wrapper flex">
        <div className="action-btn" onClick={handlePrev}>
            <IoPlaySkipBack />
        </div>
        <div className={isPlaying ? "play-pause-btn flex active" : "play-pause-btn flex"} 
        onClick={() => setIsPlaying(!isPlaying)}>
          {/* ternary operator to display either play or pause icon based on the isPlaying state */}
            {isPlaying ? <FaPause /> : <IoPlay />}
        </div>
        <div className="action-btn" onClick={handleNext}>
            <IoPlaySkipForward />
    </div>
    
    </div>
    
  </IconContext.Provider>
  
  );    
}
