console.log("Spotify Clone Loaded");

// ================== AUDIO ==================
let currentSong = new Audio();
let currentIndex = 0;

// ================== SELECTORS ==================
const songInfo = document.querySelector(".songinfo");
const songTime = document.querySelector(".songtime");
const seekbar = document.querySelector(".seekbar");
const progress = document.querySelector(".progress");
const circle = document.querySelector(".circle");
const playBtn = document.getElementById("play");
const songList = document.getElementById("songList");

const volumeSlider = document.getElementById("volume");
const volumeIcon = document.querySelector(".volume-icon");

// ================== PLAYLISTS ==================
const playlists = [
  {
    name: "Happy Hits",
    songs: [
      { file: "songs/song1.mp3", name: "Enchanted", artist: "Navya" },
      { file: "songs/song2.mp3", name: "Golden Hour", artist: "Jvke" },
      { file: "songs/song3.mp3", name: "Flute", artist: "Abhi" }
    ]
  },

  {
    name: "Chill Vibes",
    songs: [
      { file: "songs/song2.mp3", name: "Golden Hour", artist: "Jvke" },
      { file: "songs/song3.mp3", name: "Flute", artist: "Abhi" }
    ]
  },

  {
    name: "Workout Mix",
    songs: [
      { file: "songs/song1.mp3", name: "Enchanted", artist: "Navya" }
    ]
  }
];

// ================== STATE ==================
let currentPlaylist = playlists[0];

// ================== PLAY SONG ==================
function playSong(index) {
  currentIndex = index;

  const song = currentPlaylist.songs[index];

  currentSong.src = song.file;
  currentSong.play();

  playBtn.src = "pause.svg";

  songInfo.innerHTML = `
    <div>${song.name}</div>
    <small>${song.artist}</small>
  `;
}

// ================== RENDER LIBRARY ==================
function renderLibrary() {
  songList.innerHTML = "";

  currentPlaylist.songs.forEach((song, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <img src="music.svg">
      <div>
        <div class="song-name">${song.name}</div>
        <div class="song-artist">${song.artist}</div>
      </div>
      <button class="library-play">Play</button>
    `;

    li.querySelector(".library-play").addEventListener("click", (e) => {
      e.stopPropagation();
      playSong(index);
    });

    li.addEventListener("click", () => playSong(index));

    songList.appendChild(li);
  });
}

// ================== INITIAL LOAD ==================
renderLibrary();

// ================== PLAY / PAUSE ==================
playBtn.addEventListener("click", () => {
  if (!currentSong.src) {
    playSong(0);
    return;
  }

  if (currentSong.paused) {
    currentSong.play();
    playBtn.src = "pause.svg";
  } else {
    currentSong.pause();
    playBtn.src = "play.svg";
  }
});

// ================== NEXT ==================
document.getElementById("next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentPlaylist.songs.length;
  playSong(currentIndex);
});

// ================== PREVIOUS ==================
document.getElementById("prev").addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + currentPlaylist.songs.length) %
    currentPlaylist.songs.length;

  playSong(currentIndex);
});

// ================== SEEKBAR ==================
currentSong.addEventListener("timeupdate", () => {
  if (!isNaN(currentSong.duration)) {
    let percent =
      (currentSong.currentTime / currentSong.duration) * 100;

    progress.style.width = percent + "%";
    circle.style.left = percent + "%";

    let curMin = Math.floor(currentSong.currentTime / 60);
    let curSec = Math.floor(currentSong.currentTime % 60);
    let totalMin = Math.floor(currentSong.duration / 60);
    let totalSec = Math.floor(currentSong.duration % 60);

    if (curSec < 10) curSec = "0" + curSec;
    if (totalSec < 10) totalSec = "0" + totalSec;

    songTime.innerText = `${curMin}:${curSec} / ${totalMin}:${totalSec}`;
  }
});

// ================== SEEK CLICK ==================
seekbar.addEventListener("click", (e) => {
  let percent =
    (e.offsetX / seekbar.getBoundingClientRect().width) * 100;

  currentSong.currentTime =
    (currentSong.duration * percent) / 100;
});

// ================== AUTO NEXT SONG (NEW FIX) ==================
currentSong.addEventListener("ended", () => {
  currentIndex++;

  if (currentIndex >= currentPlaylist.songs.length) {
    currentIndex = 0;
  }

  playSong(currentIndex);
});

// ================== VOLUME ==================
let isMuted = false;

volumeSlider.addEventListener("input", (e) => {
  currentSong.volume = e.target.value / 100;

  if (e.target.value == 0) {
    volumeIcon.src = "mute.svg";
    isMuted = true;
  } else {
    volumeIcon.src = "volume.svg";
    isMuted = false;
  }
});

volumeIcon.addEventListener("click", () => {
  if (!isMuted) {
    currentSong.volume = 0;
    volumeSlider.value = 0;
    volumeIcon.src = "mute.svg";
    isMuted = true;
  } else {
    currentSong.volume = 0.5;
    volumeSlider.value = 50;
    volumeIcon.src = "volume.svg";
    isMuted = false;
  }
});

// default volume
currentSong.volume = 0.5;
volumeSlider.value = 50;

// ================== CARD PLAY ==================
document.querySelectorAll(".card-play").forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    currentPlaylist = playlists[index];
    currentIndex = 0;

    renderLibrary();
    playSong(0);
  });
});

// ================== HAMBURGER ==================
const hamburger = document.querySelector(".hamburger");
const sidebar = document.querySelector(".left");

hamburger?.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});