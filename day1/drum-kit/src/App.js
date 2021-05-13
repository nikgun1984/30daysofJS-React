import "./App.css";
import Letter from "./Letter";
import { useState } from "react";

function App() {
	const [state, setState] = useState("");
	const handler = (e) => {
		setState(e.key);
	};
	return (
		<div className="App">
			<div className="keys">
				<Letter key={state} id={state} handler={handler} />
			</div>
		</div>
	);
}

export default App;
