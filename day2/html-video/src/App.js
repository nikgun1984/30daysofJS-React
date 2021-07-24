import { useState, useRef } from "react";
import video from "./video_file.mp4";

const App = () => {
	const [icon, setIcon] = useState(false);
	const [volume, setVolume] = useState("1");
	const [playback, setPlayback] = useState("1");
	const [progress, setProgress] = useState(0);
	const [flag, setFlag] = useState(false);
	const videoPlayer = useRef();
	const bar = useRef();
	const handlePlay = () => {
		setIcon(videoPlayer.current.paused);
		const videoplay = videoPlayer.current.paused ? "play" : "pause";
		videoPlayer.current[videoplay]();
	};
	const handleSkip = (val) => {
		videoPlayer.current.currentTime += parseFloat(val);
	};
	const handleVolume = (e) => {
		const { name, value } = e.target;
		videoPlayer.current[name] = value;
		setVolume(value);
	};
	const handlePlayback = (e) => {
		const { name, value } = e.target;
		videoPlayer.current[name] = value;
		setPlayback(value);
	};
	const handleDuration = (e) => {
		const videoNode = videoPlayer.current;
		const percentage = (videoNode.currentTime / videoNode.duration) * 100;
		setProgress(percentage);
		const updated =
			(e.nativeEvent.offsetX / bar.current.offsetWidth) * videoNode.duration;
		videoNode.currentTime = updated;
	};
	return (
		<div className="player">
			<video
				className="player__video viewer"
				ref={videoPlayer}
				onClick={handlePlay}
				src={video}
			></video>

			<div className="player__controls">
				<div
					className="progress"
					onClick={handleDuration}
					onMouseDown={() => setFlag(true)}
					onMouseUp={() => setFlag(false)}
					onMouseMove={(e) => flag && handleDuration(e)}
					ref={bar}
				>
					<div
						className="progress__filled"
						style={{ flexBasis: `${progress}%` }}
					></div>
				</div>
				<button
					className="player__button toggle"
					title="Toggle Play"
					onClick={handlePlay}
				>
					{icon ? "❚❚" : "►"}
				</button>
				<input
					type="range"
					name="volume"
					className="player__slider"
					min="0"
					max="1"
					step="0.05"
					value={volume}
					onChange={handleVolume}
				/>
				<input
					type="range"
					name="playbackRate"
					className="player__slider"
					min="0.5"
					max="2"
					step="0.1"
					value={playback}
					onChange={handlePlayback}
				/>
				<button onClick={() => handleSkip(-10)} className="player__button">
					« 10s
				</button>
				<button onClick={() => handleSkip(25)} className="player__button">
					25s »
				</button>
			</div>
		</div>
	);
};

export default App;
