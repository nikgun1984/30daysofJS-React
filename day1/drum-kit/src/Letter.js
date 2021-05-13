const Letter = ({ keyNum }) => {
	return (
		<div>
			<div id={keyNum} className="key">
				<kbd>A</kbd>
				<span className="sound">clap</span>
			</div>
		</div>
	);
};

export default Letter;
