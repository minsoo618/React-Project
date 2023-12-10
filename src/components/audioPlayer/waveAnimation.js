import React from 'react';
import "./waveAnimation.css";

// create a visual animation effect, likely resembling a wave commonly used in audio or music player interfaces
export default function WaveAnimation({isPlaying}) {
  // determines the class to apply based on the isPlaying prop
    const waveClass = isPlaying ? "box active" : "box";
    
  return (
    // container for the wave animation
    <div className="box-container flex">
        <div className={`${waveClass} box1`}></div>
        <div className={`${waveClass} box2`}></div>
        <div className={`${waveClass} box3`}></div>
        <div className={`${waveClass} box4`}></div>
        <div className={`${waveClass} box5`}></div>
        <div className={`${waveClass} box6`}></div>
        <div className={`${waveClass} box7`}></div>
        <div className={`${waveClass} box2`}></div>
        <div className={`${waveClass} box3`}></div>
        <div className={`${waveClass} box4`}></div>
        <div className={`${waveClass} box5`}></div>
        <div className={`${waveClass} box6`}></div>
        <div className={`${waveClass} box7`}></div>
    </div>
  );
}
