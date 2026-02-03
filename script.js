const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');
const toggle = player.querySelector('.player__button');
const volume = player.querySelector('[name="volume"]');
const playbackRate = player.querySelector('[name="playbackRate"]');
const skipButtons = player.querySelectorAll('[data-skip]');

function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleVolume() {
  video.volume = this.value;
}

function handleSpeed() {
  video.playbackRate = this.value;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(btn => btn.addEventListener('click', skip));
volume.addEventListener('input', handleVolume);
playbackRate.addEventListener('input', handleSpeed);

let isMouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => isMouseDown && scrub(e));
progress.addEventListener('mousedown', () => isMouseDown = true);
progress.addEventListener('mouseup', () => isMouseDown = false);
