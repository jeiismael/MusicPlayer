const seekBar = document.getElementById("seek-bar");
const progressBar = document.getElementById("progress");
const playPauseButton = document.getElementById("play-pause-button");
const playPauseIcon = document.getElementById('play-pause-icon');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
const progress = document.getElementById("progress");
const songTime = document.getElementById("song-time");
const timeElapsed = document.querySelector(".time-elapsed");
const audio = document.getElementById('audio');
const tracklist = 'source.json';
APIkey = '3d7221e077msh302fe7517eb8de4p113d4djsn57fd76cb5c61'

// fetch songs from json
async function songs() {
  try {
    const response = await fetch(tracklist);
    const data = await response.json();

    setTrack(data[0]);

    nextButton.addEventListener('click', function() {
      switchTrack(1, data);
      playPause();
    });

    prevButton.addEventListener('click', function(){
      switchTrack(-1, data);
      playPause();
    });
  } catch(error) {
    console.error('Error loading song', error);
  }
}

// set current track and fetch lyrics
function setTrack(track) {
  audio.src = track.file;

  document.querySelector('.song h1').textContent = track.title;
  document.querySelector('.artistname h1').textContent = track.artist;
  document.querySelector('.artist').src = track.coverArt;

  const lyricsURL = `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${track.lyricsID}&text_format=plain`;
  fetchLyrics(lyricsURL);
}

// seeker
let currentTrackIndex = 0;

function switchTrack(direction, data) {
  currentTrackIndex += direction;

  
  if (currentTrackIndex < 0) {
    currentTrackIndex = data.length - 1;
  } else if (currentTrackIndex >= data.length) {
    currentTrackIndex = 0;
  }

  
  setTrack(data[currentTrackIndex]);
}

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

audio.addEventListener('loadeddata', function() {
  songTime.textContent = formatTime(audio.duration);
  seekBar.max = Math.floor(audio.duration);
});

// play and pause
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
  
  const lyricsLink = document.getElementById("lyrics-link");
  const albumsLink = document.getElementById("albums-link");
  const artistLink = document.getElementById("artist-link");

  const lyricsContent = document.getElementById("lyrics-content");
  const albumsContent = document.getElementById("albums-content");
  const artistContent = document.getElementById("artist-content");

  // scrolling through fetched content
  let isDragging = false;
  let startX;
  let startY;
  let scrollLeft;
  let scrollTop;

  const scrollContainers = [
    document.getElementById('albums-content'),
    document.getElementById('lyrics-content'),
    document.getElementById('artist-content')
  ];
  
  scrollContainers.forEach(container => {
    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - container.offsetLeft;
      startY = e.pageY - container.offsetTop;
      scrollLeft = container.scrollLeft;
      scrollTop = container.scrollTop;
    });
  
    container.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const y = e.pageY - container.offsetTop;
      const walkX = (x - startX) * 2;
      const walkY = (y - startY) * 2;
      
      container.scrollLeft = scrollLeft - walkX;
      container.scrollTop = scrollTop - walkY;
    });
  
    container.addEventListener('mouseup', () => {
      isDragging = false;
    });
  
    container.addEventListener('mouseleave', () => {
      isDragging = false;
    });
  });

  // active nav
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

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": APIkey,
    "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
  },
};

async function fetchLyrics(url) {
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



// related albums and artists
const apiHeaders = {
  'X-RapidAPI-Key': APIkey,
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
songs();
fetchAlbums();
fetchArtists();

