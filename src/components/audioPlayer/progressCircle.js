import React from 'react';
import "./progressCircle.css";

// circular progress indicator to show the current playback progress
const Circle = ({color, percentage, size, strokeWidth}) => {
    // radius of the circle
    const radius = size/2 - 10;
    // circumference
    const circ = 2 * Math.PI * radius - 20;
    // length of the stroke to show percentage completion
    const strokePct = ((100 - Math.round(percentage)) * circ) / 100;

    return (
        <circle
            r={radius}
            cx="50%" // center x of the circle
            cy="50%" // center y
            fill="transparent" // circle is only an outline with no fill
            stroke={strokePct !== circ ? color : ""} // color of the circle's stroke
            strokeWidth={strokeWidth}
            strokeDasharray={circ} // creates a dashed line with length equal to the circle's circumference
            strokeDashoffset={percentage ? strokePct : 0} // offset for the dash to create the progress effect
            strokeLinecap="round" // rounded stroke ends
            ></circle>
        );
};

export default function ProgressCircle({
    percentage, // percentage of completion
    isPlaying, // if the media is playing
    size, // size of the SVG element
    color, // color of the progress stroke
    image, // URL of the image to be displayed inside the circle
}) {

  return (
    <div className="progress-circle flex">
        <svg width={size} height={size}>
            <g>
                <Circle strokeWidth={"0.4rem"} color="#3B4F73" size={size} />
                <Circle 
                strokeWidth={"0.6rem"} 
                color={color} 
                percentage={percentage} 
                size={size} 
                />
            </g>
            <defs>
                {/* Defining clipping paths for circular images */}
                <clipPath id="myCircle">
                    <circle cx="50%" cy="50%" r={size/2 - 30} fill="#FFFFFF" />
                </clipPath>
                <clipPath id="myInnerCircle">
                <circle cx="50%" cy="50%" r={size/2 - 100} fill="#FFFFFF" />
                </clipPath>
            </defs>
            {/* images inside the circles */}
            <image
            className={isPlaying ? "active" : ""} 
            x={30} 
            y={30} 
            width={2*(size/2 - 30)} 
            height={2*(size/2 - 30)} 
            href="https://pngimg.com/uploads/vinyl/vinyl_PNG107.png"
            clipPath={"url(#myCircle)"}
            />
            <image className={isPlaying ? "active" : ""}
            x={100}
            y={100} 
            width={2*((size/2) - 100)} 
            height={2*((size/2) - 100)} 
            href={image}
            clipPath={"url(#myInnerCircle)"}
            />
        </svg>
    </div>
  );
}
