import { useState, useRef } from "react";
import classNames from "classnames";
import "./style.css";

function App() {
	const letters = {
		a: { ref: useRef(), sound: "clap" },
		d: { ref: useRef(), sound: "hihat" },
		f: { ref: useRef(), sound: "kick" },
		s: { ref: useRef(), sound: "openhat" },
		g: { ref: useRef(), sound: "boom" },
		h: { ref: useRef(), sound: "ride" },
		j: { ref: useRef(), sound: "snare" },
		k: { ref: useRef(), sound: "tom" },
		l: { ref: useRef(), sound: "tink" },
	};
	const [state, setState] = useState("");

	const handleOnKeyDown = (event) => {
		const audioNode = letters[event.key].ref.current;
		audioNode.currentTime = 0;
		audioNode.play();
		setState(event.key);
	};

	return (
		<div className="keys" onKeyDown={handleOnKeyDown} tabIndex={0}>
			{Object.entries(letters).map(([letter, { sound, ref }]) => (
				<div
					key={letter}
					className={classNames("key", {
						playing: state === letter,
					})}
					onTransitionEnd={() => setState("")}
				>
					<kbd>{letter.toUpperCase()}</kbd>
					<span className="sound">{sound}</span>
					<audio ref={ref} src={`${sound}.wav`}></audio>
				</div>
			))}
		</div>
	);
}

export default App;
