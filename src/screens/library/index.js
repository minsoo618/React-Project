import React, { useState, useEffect } from "react"; // importing react and its hooks: useState for state management and useEffect for side effects
import APIKit from "../../spotify"; // importing a custom API handler, probably set up for Spotify API interaction
import { IconContext } from "react-icons"; // importing IconContext for customizing React icons
import { AiFillPlayCircle } from "react-icons/ai"; // importing a specific play icon from react-icons
import './library.css'; // importing CSS for styling the component
import { useNavigate } from "react-router-dom"; // importing useNavigate hook from react router for programmatic navigation


export default function Library() {

  const [playlists, setPlaylists] = useState(null); // initializaing state 'playlists' to store playlist data, initially set to null

  useEffect(() => {
  APIKit.get('me/playlists?limit=4&offset=0').then(function(response) { // making an API call to get playlists, limited to 4 items
    setPlaylists(response.data.items); // updating 'playlists' state with the fetched data
    console.log(response.data.items); // logging the response for debugging
  });
}, []); // empty dependency array means this useEffect runs once on component mount

const navigate = useNavigate(); // initializing navigate function from useNavigate hook for navigation 

const playPlaylist = (id) => { // function to handle playlist selection
  navigate("/player", { state: { id: id } }); // navigates to '/player' route and passes the selected playlist's ID in state
};
  return (
  <div className="screen-container"> {/* main container div for the library screen */}
    <div className="library-body"> {/* container for the library content */}
    {/* mapping over 'playlists' to create UI elements ?. ensures it only runs if 'playlists' is not null */}
    {playlists?.map((playlist) => ( 
      <div className="playlist-card" key={playlist.id} onClick={() => playPlaylist(playlist.id)}> {/* playlist, card, clickable, calls 'playPlaylist' on click */}
        <img // image element for playlist cover art
        src={playlist.images[0].url} // source URL of the playlist's image 
        className="playlist-image" // CSS class for styling the image
        alt="Playlist-Art" // Alt text for the image for accessibility
        />
        <p className="playlist-title">{playlist.name}</p> {/* paragraph element for the playlist title */}
        <p className="playlist-subtitle">{playlist.tracks.total} Songs </p> {/* paragraph for the number of songs in the playlis */}
        <div className="playlist-fade"> {/* container for the play icon  */}
          <IconContext.Provider value={{ size: "50px", color: "#83e676"}}>
            <AiFillPlayCircle /> {/* the play icon itself */}
          </IconContext.Provider>
        </div>
        </div>
      ))}
      </div>
  </div>
  );

}
