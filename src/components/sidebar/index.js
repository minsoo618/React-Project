// import statements for react, css file, components, and icons
import React, { useState, useEffect } from "react";
import "./sidebar.css";
import SidebarButton from "./sidebarButton";
import { FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import apiClient from "../../spotify";

export default function Sidebar() {
  // useState hook to manage the profile image URL
  const [image, setImage] = useState(
    "https://bloximages.newyork1.vip.townnews.com/dailynebraskan.com/content/tncms/assets/v3/editorial/f/98/f980399a-d299-11e9-a670-d3964076fe5f/5d759f4b36a7d.image.jpg?resize=600%2C600"
  );
  // useEffect hook to fetch user data from the Spotify API when the component mounts
  useEffect(() => {
    apiClient.get("me").then(response => {
      setImage(response.data.images[0].url); // updating the image state with the fetched URL
    });
  },[]); // the empty dependency array ensures this effect runs only once after the component mounts
  // render method for the component
  return (
    <div className="sidebar-container">
        <img src={image} 
        className="profile-img" 
        alt="profile" 
      />
      <div>
        {/* sidebar buttons for navigation */}
        <SidebarButton title="Player" to="/player" icon={<FaPlay />}/>
        <SidebarButton title="Library" to="/" icon={<IoLibrary />}/>

      </div>
      <SidebarButton title="Sign Out" to="" icon={<FaSignOutAlt/>} />
        </div>
  );
}
