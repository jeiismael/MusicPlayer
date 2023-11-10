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
    content.style.display = "block";
  }

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

// get related albums

const albumsUrl =
  "https://spotify23.p.rapidapi.com/artist_albums/?id=06HL4z0CvFAxyc27GXpf02&offset=0&limit=5";
const artistUrl = 
  "https://spotify23.p.rapidapi.com/artist_related/?id=06HL4z0CvFAxyc27GXpf02&offset=0&limit=5";
const artistOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "302785cd01mshcd3b11b53413908p1c77f6jsnc41252bf7fd9",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};
async function getAlbums() {
  try {
    const response = await fetch(albumsUrl, artistOptions);
    const result = await response.json();

    const albums = result.data.artist.discography.albums;
    console.log(result);

    if (albums.items) {
      for (let i = 0; i < 4 && i < albums.items.length; i++) {
        const album = albums.items[i];

        if (album.releases.items) {
          for (let j = 0; j < album.releases.items.length; j++) {
            const releaseItem = album.releases.items[j];
            console.log(releaseItem.name);
            console.log(releaseItem.id);

            if (releaseItem.coverArt) {
              const coverArtUrl = releaseItem.coverArt.sources[0];
              const imageUrl = coverArtUrl.url;
              console.log(imageUrl);

              const anchorElement = document.createElement('a');

              switch (i) {
                case 0:
                  anchorElement.href = `https://open.spotify.com/album/${releaseItem.id}`;
                  break;
                case 1:
                  anchorElement.href = `https://open.spotify.com/album/${releaseItem.id}`;
                  break;
                case 2:
                  anchorElement.href = `https://open.spotify.com/album/${releaseItem.id}`;
                  break;
              }
              const imgElement = document.createElement('img');
              imgElement.src = imageUrl;

              anchorElement.appendChild(imgElement);
              
              const divElement = document.getElementById('albums-content');
              divElement.appendChild(anchorElement);
          }
        }
      }
    }
  } 
  } catch (error) {
    console.error(error);
  }}
getAlbums()

// fetch related artist

async function getArtists() {
  try {
    const response = await fetch(artistUrl, artistOptions);
    const result = await response.json();
    
    if(result.artists) {
      for (let i = 0; i < 4 && i < result.artists.length; i++) {
        const relatedArtists = result.artists[i];
        console.log(relatedArtists.id);
        console.log(relatedArtists.name)
        console.log(relatedArtists);
        if (relatedArtists.images) {
          const artistImage= relatedArtists.images[0];
          const artistImageUrl = artistImage.url;
          console.log(artistImageUrl);
          console.log(relatedArtists)
          const anchorElement = document.createElement('a');
          switch (i) {
            case 0:
              anchorElement.href = `https://open.spotify.com/artist/${relatedArtists.id}`;
              break;
            case 1:
              anchorElement.href = `https://open.spotify.com/artist/${relatedArtists.id}`;
              break;
            case 2:
              anchorElement.href = `https://open.spotify.com/artist/${relatedArtists.id}`;
              break;
          }
          const imgElement = document.createElement('img');
          imgElement.src = artistImageUrl;

          anchorElement.appendChild(imgElement);

          const divElement = document.getElementById('artist-content');
          divElement.appendChild(anchorElement);
        }
      }
    } 
  } catch(error) {
    console.error(error);
  }
}

getArtists();
