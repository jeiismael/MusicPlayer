const seekBar = document.getElementById('seek-bar');
const progressBar = document.getElementById('progress');
const playPauseButton = document.getElementById('play-pause-button');
const progress = document.getElementById('progress');
const playPause = document.getElementById('play-pause');
const songTime = document.querySelector('.song-time');
const timeElapsed = document.querySelector('.time-elapsed');
let songDuration = 613;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateTimeElapsed() {
    const currentTime = parseFloat(seekBar.value);
    const elapsedSeconds = (currentTime / 100) * songDuration;
    timeElapsed.textContent = formatTime(elapsedSeconds);
    progressBar.style.width = currentTime + '%';
    
  }

seekBar.addEventListener('input', updateTimeElapsed);



let isPlaying = false; 
let intervalID;

function togglePlayPause() {
  if (isPlaying) {
    isPlaying = false;
    console.log('paused')    
    playPause.src = "Polygon 1.png";
    clearInterval(intervalID);
  } else {
    isPlaying = true;
    playPause.src = "pause_button.png";
    console.log('playing');
    intervalID = setInterval(increaseSeekBar, 1000);
    
  }
}
playPauseButton.addEventListener('click', togglePlayPause);

function increaseSeekBar() {
  const currentTime = parseFloat(seekBar.value);
  const maxTime = songDuration;
  const newTime = currentTime + 1;

  if (newTime <= maxTime) {
    seekBar.value = newTime;
    updateTimeElapsed(newTime);

  } else {
    clearInterval(intervalID);
    togglePlayPause();
  }
}