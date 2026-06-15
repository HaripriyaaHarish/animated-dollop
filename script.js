console.log("Spotify");

const songs = [
  "songs/song1.mp3",
  "songs/song2.mp3",
  "songs/song3.mp3"
];

let currentSong = new Audio();
let currentIndex = 0;

const songList = document.getElementById("songList");

function playSong(index) {

  currentIndex = index;

  currentSong.src = songs[index];

  currentSong.play();
}

// Create song list

songs.forEach((song, index) => {

  let li = document.createElement("li");

  li.innerText = song.split("/").pop();

  li.addEventListener("click", () => {

    playSong(index);

  });

  songList.appendChild(li);

});

// Play button

document.getElementById("play").addEventListener("click", () => {

  if (!currentSong.src) {

    playSong(0);

    return;
  }

  if (currentSong.paused) {

    currentSong.play();

  } else {

    currentSong.pause();

  }

});

// Next

document.getElementById("next").addEventListener("click", () => {

  currentIndex++;

  if (currentIndex >= songs.length) {

    currentIndex = 0;
  }

  playSong(currentIndex);

});

// Previous

document.getElementById("prev").addEventListener("click", () => {

  currentIndex--;

  if (currentIndex < 0) {

    currentIndex = songs.length - 1;
  }

  playSong(currentIndex);

});