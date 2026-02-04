const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const progress = document.querySelector('.progress__filled');
const volumeInput = document.querySelector('input[name="volume"]');
const playbackSpeedInput = document.querySelector('input[name="playbackSpeed"]');
const rewindButton = document.querySelector('.rewind');
const forwardButton = document.querySelector('.forward');

function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    toggle.textContent = '❚ ❚';
  } else {
    video.pause();
    toggle.textContent = '►';
  }
}

function updateProgress() {
  const progressFilled = (video.currentTime / video.duration) * 100;
  progress.style.width = `${progressFilled}%`;

  if (video.ended) {
    toggle.textContent = '►';
  }
}

function setVolume() {
  video.volume = volumeInput.value;
}

function setPlaybackSpeed() {
  video.playbackRate = playbackSpeedInput.value;
}

function skipVideo(event) {
  const skipDuration = Number(event.target.dataset.skip);
  video.currentTime += skipDuration;
}

video.addEventListener('loadedmetadata', () => {
  video.addEventListener('timeupdate', updateProgress);
  volumeInput.addEventListener('input', setVolume);
  playbackSpeedInput.addEventListener('input', setPlaybackSpeed);
  toggle.addEventListener('click', togglePlayPause);
  rewindButton.addEventListener('click', skipVideo);
  forwardButton.addEventListener('click', skipVideo);
});