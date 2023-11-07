const seekBar = document.getElementById('seek-bar');
const progressBar = document.getElementById('progress');

seekBar.addEventListener('input', () => {
  const progressWidth = seekBar.value;
  progressBar.style.width = (progressWidth - 1 )+ '%';
});

seekBar.addEventListener('change', () => {  
});


// Get DOM elements for play-pause and seek bar
const playPauseButton = document.getElementById('play-pause-button');
const progress = document.getElementById('progress');

// const updateProgressBar = function (e) {
//     if (seekBar.value > 0) {
//       const { duration, currentTime } = e.srcElement;
  
//       // Update progress bar width
//       const progressPercent = (currentTime / duration) * 100;
//       progress.style.width = `${progressPercent}%`;
  
//       // Calculate display for duration
//       const durationMinutes = Math.floor(duration / 60);
//       let durationSeconds = Math.floor(duration % 60);
//       if (durationSeconds < 10) {
//         durationSeconds = `0${durationSeconds}`;
//       }
  
//       // Delay switching duration Element to avoid NaN
//       if (durationSeconds) {
//         durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
//       }
  
//       // Calculate display for currentTime
//       const currentMinutes = Math.floor(currentTime / 60);
//       let currentSeconds = Math.floor(currentTime % 60);
//       if (currentSeconds < 10) {
//         currentSeconds = `0${currentSeconds}`;
//       }
//       currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
//     }
//   }

let isPlaying = false; // Track whether the music is playing

// Function to toggle play/pause and start/stop animation
function togglePlayPause() {
  if (isPlaying) {
    console.log('play');

    // Stop animation
    playPauseButton.classList.remove('animate-play');
    isPlaying = false;
  } else {
    console.log('pause');
    playPauseButton.classList.add('animate-play');
    isPlaying = true;
  }
}

// Add a click event listener to the play-pause button
playPauseButton.addEventListener('click', togglePlayPause);

// Add an input event listener to the seek bar
seekBar.addEventListener('input', updateProgress);

// Function to update the progress bar
function updateProgress() {
  const value = (seekBar.value - seekBar.min) / (seekBar.max - seekBar.min) * 100;
  progress.style.width = value + '%';
}

// Function to handle play/pause button animation
function handlePlayPauseAnimation() {
  if (isPlaying) {
    // Start animation
    playPauseButton.classList.add('animate-play');
  } else {
    // Stop animation
    playPauseButton.classList.remove('animate-play');
  }
}

// Update play-pause button animation when the page loads
handlePlayPauseAnimation();
