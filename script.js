const seekBar = document.getElementById("seek-bar");
const progressBar = document.getElementById("progress");
const playPauseButton = document.getElementById("play-pause-button");
const playPauseIcon = document.getElementById('play-pause-icon');
const progress = document.getElementById("progress");
const songTime = document.querySelector(".song-time");
const timeElapsed = document.querySelector(".time-elapsed");
const audio = document.getElementById('audio');

let songDuration = 613;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

audio.addEventListener('timeupdate', function() {
  seekBar.value = audio.currentTime;
  timeElapsed.textContent = formatTime(audio.currentTime);

  const progressPercent = (audio.currentTime / audio.duration) * 100;
  const seekerWidth = seekBar.offsetWidth;
  const progressBarWidth = (progressPercent / 100) * seekerWidth;
  progressBar.style.width = `${progressBarWidth}px`;
});

seekBar.addEventListener('input', function() {
  audio.currentTime = seekBar.value;
});

audio.addEventListener('loadmetadata', function() {
  totalTimeDisplay.textContent = formatTime(audio.duration);
});

audio.pause();
function playPause() {
  if (audio.paused) {
    playPauseIcon.src = "pause_button.png";
    audio.play();
  }else {
    playPauseIcon.src = "Polygon 1.png";
    audio.pause();
  }
};

playPauseButton.addEventListener('click', playPause);



// explorer

document.addEventListener("DOMContentLoaded", function () {
  // Get references to the navigation links and the content divs
  const lyricsLink = document.getElementById("lyrics-link");
  const albumsLink = document.getElementById("albums-link");
  const artistLink = document.getElementById("artist-link");

  const lyricsContent = document.getElementById("lyrics-content");
  const albumsContent = document.getElementById("albums-content");
  const artistContent = document.getElementById("artist-content");

  // Function to set the active link and show the corresponding content
  function setActiveLink(link, content) {
    lyricsLink.classList.remove("active");
    albumsLink.classList.remove("active");
    artistLink.classList.remove("active");
    link.classList.add("active");

    lyricsContent.style.display = "none";
    albumsContent.style.display = "none";
    artistContent.style.display = "none";
    content.style.display = "flex";
  }

  setActiveLink(lyricsLink, lyricsContent);

  // Add click event listeners to the navigation links
  lyricsLink.addEventListener("click", function () {
    setActiveLink(lyricsLink, lyricsContent);
  });

  albumsLink.addEventListener("click", function () {
    setActiveLink(albumsLink, albumsContent);
  });

  artistLink.addEventListener("click", function () {
    setActiveLink(artistLink, artistContent);
  });
});

// create elements

function createAnchorElement(href) {
  const anchorElement = document.createElement('a');
  anchorElement.href = href;
  return anchorElement;
}

function createImageElement(src) {
  const imgElement = document.createElement('img');
  imgElement.src = src;
  return imgElement;
}

function createTextElement(text) {
  const textElement = document.createElement('p');
  textElement.textContent = text;
  return textElement;
}



// lyrics

const url =
  "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=7076626&text_format=plain";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "302785cd01mshcd3b11b53413908p1c77f6jsnc41252bf7fd9",
    "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
  },
};

async function fetchLyrics() {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const lyrics = data.lyrics.lyrics.body.plain;
    console.log(data);
    document.getElementById("lyrics-content").innerText = lyrics;
    console.log(lyrics);
  } catch (error) {
    console.error(error);
  }
}

fetchLyrics();
// related albums and artists
const apiHeaders = {
  'X-RapidAPI-Key': '302785cd01mshcd3b11b53413908p1c77f6jsnc41252bf7fd9',
  'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
};


async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

function fetchContent(items, elementId, urlPrefix) {
  if (items) {
    const container = document.getElementById(elementId);
    
    for (let i = 0; i < Math.min(5, items.length); i++) {
      const item = items[i];
      const imageUrl = item.images ? item.images[0].url : null;
      if (imageUrl) {
        const href = `https://open.spotify.com/${urlPrefix}/${item.id}`;
        const anchorElement = createAnchorElement(href);
        const imgElement = createImageElement(imageUrl);
        const textElement = createTextElement(item.name); 
        anchorElement.appendChild(imgElement);
        anchorElement.appendChild(textElement);
        container.appendChild(anchorElement);
      }
    }
  }
}

async function fetchAlbums() {
  const albumsUrl = "https://spotify23.p.rapidapi.com/artist_albums/?id=06HL4z0CvFAxyc27GXpf02&offset=0&limit=4";
  const albumsOptions = { method: "GET", headers: apiHeaders };
  const result = await fetchData(albumsUrl, albumsOptions);
  
  if (!result) return;

  const container = document.getElementById('albums-content');
  
  result.data.artist.discography.albums.items.forEach((album) => {
    album.releases.items.forEach((releaseItem) => {
      if (releaseItem.coverArt) {
        const imageUrl = releaseItem.coverArt.sources[0].url;
        const href = `https://open.spotify.com/album/${releaseItem.id}`;
        const anchorElement = createAnchorElement(href);
        const imgElement = createImageElement(imageUrl);
        const textElement = createTextElement(releaseItem.name); // Add the album name below the image
        anchorElement.appendChild(imgElement);
        anchorElement.appendChild(textElement);
        container.appendChild(anchorElement);
      }
    });
  });
}

async function fetchArtists() {
  const artistUrl = "https://spotify23.p.rapidapi.com/artist_related/?id=06HL4z0CvFAxyc27GXpf02&offset=0&limit=5";
  const result = await fetchData(artistUrl, { method: "GET", headers: apiHeaders });
  fetchContent(result.artists, 'artist-content', 'artist');
}

fetchAlbums();
fetchArtists();

