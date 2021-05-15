/* select our elements */
const videoPlayer = document.querySelector("video.player__video");
const progressbar = document.querySelector(".progress__filled");
const playBtn = document.querySelector("button.player__button");
const skipBtns = document.querySelectorAll("button[data-skip]");
const ranges = document.querySelectorAll(".player__slider");
const progress = document.querySelector(".progress");
console.log(playBtn);
/* functions '►' : '❚ ❚';
	1. when press on play button
		 a) determine how long video is
		 b) 
*/

function togglePlay(e) {
	videoPlayer[videoPlayer.paused ? "play" : "pause"]();
}

function updateIcon() {
	playBtn.textContent = videoPlayer.paused ? "►" : "❚ ❚";
}

function toggleSkip() {
	videoPlayer.currentTime += parseFloat(this.dataset.skip);
}

function moveRanges() {
	videoPlayer[this.name] = this.value;
}

function handleduration() {
	const percentage = (videoPlayer.currentTime / videoPlayer.duration) * 100;
	progressbar.style.flexBasis = `${percentage}%`;
}

function updateVideo(e) {
	const updated = (e.offsetX / progress.offsetWidth) * videoPlayer.duration;
	videoPlayer.currentTime = updated;
}

videoPlayer.addEventListener("click", togglePlay);
videoPlayer.addEventListener("play", updateIcon);
videoPlayer.addEventListener("pause", updateIcon);
videoPlayer.addEventListener("timeupdate", handleduration);

playBtn.addEventListener("click", togglePlay);

skipBtns.forEach((el) => {
	el.addEventListener("click", toggleSkip);
});

ranges.forEach((el) => {
	el.addEventListener("change", moveRanges);
});

ranges.forEach((el) => {
	el.addEventListener("mousemove", moveRanges);
});

let flag = false;
progress.addEventListener("click", updateVideo);
progress.addEventListener("mousemove", (e) => flag && updateVideo(e));
progress.addEventListener("mousedown", () => {
	flag = true;
});
progress.addEventListener("mouseup", () => {
	flag = false;
});
