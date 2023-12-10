import React from 'react';
import { IconContext } from "react-icons"; // used for styling react-icons
import { Link, useLocation } from "react-router-dom"; // for routing and getting the current location
import "./sidebarButton.css"; // importing CSS for styling

export default function SidebarButton(props) {
  // useLocation hook from react-router-dom to get the current route's location
    const location = useLocation();

    // checks if the current route is the same as this button's target route
    const isActive = location.pathname === props.to;

    // conditional class assignment based on active status
    const btnClass = isActive ? "btn-body active" : "btn-body";
    // render method for the component
  return (
    // link component for navigation
    <Link to={props.to}>
      {/* button body with conditional class */}
        <div className={btnClass}>
          {/* IconContext.Provider to apply styles to the icon */}
            <IconContext.Provider value={{size: '24px', className: "btn-icon"}}>
            {props.icon} {/* renders the icon passed as a prop */}
            <p className="btn-title">{props.title}</p> {/* renders the title passed as a prop */}
            </IconContext.Provider>
        </div>
    </Link>
  );
}
