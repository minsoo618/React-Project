import React, { useState, useEffect } from "react";
import "./sidebar.css";
import SidebarButton from "./sidebarButton";
import { FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import apiClient from "../../spotify";

export default function Sidebar() {
  const [image, setImage] = useState(
    "https://bloximages.newyork1.vip.townnews.com/dailynebraskan.com/content/tncms/assets/v3/editorial/f/98/f980399a-d299-11e9-a670-d3964076fe5f/5d759f4b36a7d.image.jpg?resize=600%2C600"
  );
  useEffect(() => {
    apiClient.get("me").then(response => {
      setImage(response.data.images[0].url);
    });
  },[]);
  return (
    <div className="sidebar-container">
        <img src={image} 
        className="profile-img" 
        alt="profile" 
      />
      <div>
        <SidebarButton title="Player" to="/player" icon={<FaPlay />}/>
        <SidebarButton title="Library" to="/" icon={<IoLibrary />}/>

      </div>
      <SidebarButton title="Sign Out" to="" icon={<FaSignOutAlt/>} />
        </div>
  );
}
