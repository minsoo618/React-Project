import React, { useEffect, useState } from "react";
import "./player.css";
import { useLocation } from "react-router-dom";
import apiClient from "../../spotify";
import SongCard from "../../components/songCard";
import Queue from "../../components/queue";
import AudioPlayer from "../../components/audioPlayer";


export default function Player() {

const location = useLocation(); // getting the current location object 
const [tracks, setTracks] = useState([]); // state to store an array of tracks 
const [currentTrack, setCurrentTrack] = useState({}); // state to store the currently playing track
const [currentIndex, setCurrentIndex] = useState(0); // state to store the index of the current track

useEffect(() => {
  if(location.state) { // check if the location object has state
    apiClient
    .get("playlists/" + location.state?.id + "/tracks") // fetch tracks for a playlist
    .then((res) => {
      setTracks(res.data.items); // sets the tracks state with the fetched data
      setCurrentTrack(res.data?.items[0]?.track); // set the current track to the first track in the playlist
    });
  }
}, [location.state]); //dependency array includes location.state, so this effect runs when it changes

useEffect(() => {
  setCurrentTrack(tracks[currentIndex]?.track); // update the currentTrack whenever tracks or currenIndex changes
},[currentIndex, tracks]);

  return (
  <div className="screen-container flex">
    <div className="left-player-body"> {/* container for the AudioPlayer component */}
      <AudioPlayer 
      currentTrack={currentTrack} 
      total={tracks} 
      currentIndex={currentIndex} 
      setCurrentIndex={setCurrentIndex}
    />

    </div>
    <div className="right-player-body">
      <SongCard album={currentTrack?.album} /> {/* displays the current track's album */}
      <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} /> {/* displays the track queue */}
    </div>
  </div>
  );

}