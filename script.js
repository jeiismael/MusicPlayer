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

// lyrics

const url = 'https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=2396871&text_format=plain';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '302785cd01mshcd3b11b53413908p1c77f6jsnc41252bf7fd9',
		'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
	}
};

async function fetchLyrics() {
try {
	const response = await fetch(url, options);
	const data = await response.json();
  const lyrics = data.lyrics.lyrics.body.plain;
	console.log(data);
  document.getElementById('lyrics-content').innerText = lyrics;
  console.log(lyrics);
} catch (error) {
	console.error(error);
}}
fetchLyrics();

// remove hyperlink from fetched data

const myDiv = document.getElementById("lyrics-content");

// Find all anchor (a) elements within the div
const anchorElements = myDiv.querySelectorAll('a');

// Iterate through the anchor elements and prevent their default behavior
anchorElements.forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    console.log('prevent');
    e.preventDefault(); // Prevent the default behavior of the link
  });
});
