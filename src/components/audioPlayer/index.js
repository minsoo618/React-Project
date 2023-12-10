// importing necessary modules and components
import React, { useState, useRef, useEffect } from 'react';
import "./audioPlayer.css";
import ProgressCircle from "./progressCircle";
import Controls from "./controls";
import WaveAnimation from "./waveAnimation";

// the AudioPlayer functional component with props
export default function AudioPlayer({
    currentTrack,
    currentIndex,
    setCurrentIndex,
    total,
 }) {

    // state variables
    const [isPlaying, setIsPlaying] = useState(false); // whether the audio is playing
    const [trackProgress, setTrackProgress] = useState(0); // current progress of the track
    const [showVolume] = useState(false); // state for showing volume control
    const [volume, setVolume] = useState(100); // current volume level
    var audioSrc = total[currentIndex]?.track.preview_url; // source URL of the current track
    
    const audioRef = useRef(new Audio(total[0]?.track.preview_url)); // reference to the audio element

    const intervalRef = useRef(); // reference for the interval to update track progress

    const isReady = useRef(false); // flag to indicate if the player is ready

    const { duration } = audioRef.current; // duration of the current track

    // calculate the current percentage of the track played
    const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

    // function to start the timer to update the track progress
    const startTimer = () => {
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if(audioRef.current.ended) {
                handleNext();
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, [1000]);
    };

    // effect for handling play/pause actions
    useEffect(() => {
        if(audioRef.current.src) {
            if(isPlaying) {
            audioRef.current.play().then(() => {
                startTimer();
            }).catch((e) => console.error("Error playing audio:",e));
        } else {
            clearInterval(intervalRef.current);
            audioRef.current.pause();
        }
    } else {
        if (isPlaying) {
            audioRef.current = new Audio(audioSrc);
            audioRef.current.play();
            startTimer();
        } else {
            clearInterval(intervalRef.current);
            audioRef.current.pause();
        }
    }
    }, [isPlaying]);

    // effect for handling track change
    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio(audioSrc);
        audioRef.current.onloadeddata = () => {
        setTrackProgress(audioRef.current.currentTime);

        if(isReady.current) {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
                startTimer();
            }).catch((e) => console.error("Error playing audio:, e"));
        } else {
            isReady.current = true;
        }
        };
    }, [currentIndex]);

    // cleanup effect
    useEffect(() => {
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        };
    }, []);

    // effect for volume control
    useEffect(() => {
        audioRef.current.volume = volume / 100;
    }, [volume])

    // function to handle the next track
    const handleNext = () => {
        if(currentIndex < total.length - 1){
            setCurrentIndex(currentIndex + 1);
        } else setCurrentIndex(0);
    };

    // function to handle the previous track
    const handlePrev = () => {
        if(currentIndex - 1 < 0) setCurrentIndex(total.length - 1);
        else setCurrentIndex(currentIndex - 1);
    };

    // function to format time
    const addZero = (n) => {
        return n > 9 ? "" + n : "0" + n;
    };
 
    // creating a list of artists from the current track
    const artists = [];
    currentTrack?.album?.artists.forEach((artist) => {
        artists.push(artist.name);
    });

  // rendering the audio player UI
  return (
    <div className="player-body flex">
        <div className="player-left-body">
            <ProgressCircle
                percentage={currentPercentage}
                isPlaying={true}
                image={currentTrack?.album?.images[0]?.url}
                size={300}
                color="#33dd1d"

            />
        </div>
        <div className="player-right-body flex">
            <p className="song-title">{currentTrack?.name}</p>
            <p className="song-artist">{artists.join(" | ")}</p>
            <div className="player-right-bottom flex">
                <div className="song-duration flex">
                    <p className="duration">0:{addZero(Math.round(trackProgress))}</p>
                    <WaveAnimation isPlaying={isPlaying} />
                    <p className="duration">0:30</p>
                </div>
                <Controls 
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    total={total}
                />

            </div>
            <div className={`volume ${showVolume ? 'show' : ''}`}>
            <input type="range" min={0} max={100} value={volume} onChange={e => setVolume(Number(e.target.value))} />
        </div>
        </div>
    </div>
  );
}
