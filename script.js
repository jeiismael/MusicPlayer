const seekBar = document.getElementById("seek-bar");
const progressBar = document.getElementById("progress");
const playPauseButton = document.getElementById("play-pause-button");
const progress = document.getElementById("progress");
const playPause = document.getElementById("play-pause");
const songTime = document.querySelector(".song-time");
const timeElapsed = document.querySelector(".time-elapsed");
let songDuration = 613;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function updateTimeElapsed() {
  const currentTime = parseFloat(seekBar.value);
  const elapsedSeconds = (currentTime / 100) * songDuration;
  timeElapsed.textContent = formatTime(elapsedSeconds);
  progressBar.style.width = currentTime + "%";
}

seekBar.addEventListener("input", updateTimeElapsed);

let isPlaying = false;
let intervalID;

function togglePlayPause() {
  if (isPlaying) {
    isPlaying = false;
    console.log("paused");
    playPause.src = "Polygon 1.png";
    clearInterval(intervalID);
  } else {
    isPlaying = true;
    playPause.src = "pause_button.png";
    console.log("playing");
    intervalID = setInterval(increaseSeekBar, 1000);
  }
}
playPauseButton.addEventListener("click", togglePlayPause);

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


// explorer

document.addEventListener('DOMContentLoaded', function () {
  // Get references to the navigation links and the content divs
  const lyricsLink = document.getElementById('lyrics-link');
  const albumsLink = document.getElementById('albums-link');
  const artistLink = document.getElementById('artist-link');

  const lyricsContent = document.getElementById('lyrics-content');
  const albumsContent = document.getElementById('albums-content');
  const artistContent = document.getElementById('artist-content');

  // Function to set the active link and show the corresponding content
  function setActiveLink(link, content) {
    lyricsLink.classList.remove('active');
    albumsLink.classList.remove('active');
    artistLink.classList.remove('active');
    link.classList.add('active');

    lyricsContent.style.display = 'none';
    albumsContent.style.display = 'none';
    artistContent.style.display = 'none';
    content.style.display = 'block';
  }

  // Add click event listeners to the navigation links
  lyricsLink.addEventListener('click', function () {
    setActiveLink(lyricsLink, lyricsContent);
  });

  albumsLink.addEventListener('click', function () {
    setActiveLink(albumsLink, albumsContent);
  });

  artistLink.addEventListener('click', function () {
    setActiveLink(artistLink, artistContent);
  });
});




// const url = 'https://genius-song-lyrics1.p.rapidapi.com/search/?q=Taylor%20Swift&per_page=10&page=1';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '8937ebfc7cmsh6623c5203929a5dp15970bjsn50b41bec8bc9',
// 		'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
// 	}
// };

const apiKey = '8937ebfc7cmsh6623c5203929a5dp15970bjsn50b41bec8bc9'; // Replace with your actual API key
const searchQuery = '<All too well taylors version>'; // Replace with your search query

const baseUrl = 'https://genius-song-lyrics1.p.rapidapi.com/search/';
const url = new URL(baseUrl);
url.searchParams.append('q', searchQuery);
url.searchParams.append('per_page', 10);
url.searchParams.append('page', 1);

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
  },
};

async function fetchAndDisplayLyrics() {
  try {
    const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
    // const response = await fetch(url, options);
    // if (response.status === 200) {
    //   const data = await response.json();
    //     console.log(response);
    //     console.log(data)
    //   } 
  } catch (error) {
    console.error(error);
  }
}

fetchAndDisplayLyrics();