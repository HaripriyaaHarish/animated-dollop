console.log("Spotify Clone Loaded");


let currentSong = new Audio();
let currentIndex = 0;


const songInfo = document.querySelector(".songinfo");
const songTime = document.querySelector(".songtime");
const seekbar = document.querySelector(".seekbar");
const progress = document.querySelector(".progress");
const circle = document.querySelector(".circle");
const playBtn = document.getElementById("play");
const songList = document.getElementById("songList");

const volumeSlider = document.getElementById("volume");
const volumeIcon = document.querySelector(".volume-icon");
const cardContainer = document.querySelector(".cardcontainer");

const playlists = [

{
name:"Happy Hits",

songs:[
{
file:"songs/song1.mp3",
name:"Enchanted",
artist:"Navya",
image:"p1.jpg"
},

{
file:"songs/song2.mp3",
name:"Golden Hour",
artist:"Jvke",
image:"p2.jpg"
},

{
file:"songs/song3.mp3",
name:"Flute",
artist:"Abhi",
image:"p3.jpg"
}
]

},

{
name:"Chill Vibes",

songs:[


{
file:"songs/song2.mp3",
name:"Golden Hour",
artist:"Jvke",
image:"p2.jpg"
},

{
file:"songs/song3.mp3",
name:"Flute",
artist:"Abhi",
image:"p3.jpg"
},
{
file:"songs/song1.mp3",
name:"Enchanted",
artist:"Navya",
image:"p1.jpg"
}
]

},

{
name:"Workout Mix",

songs:[

{
file:"songs/song3.mp3",
name:"Flute",
artist:"Abhi",
image:"p3.jpg"
},
{
file:"songs/song1.mp3",
name:"Enchanted",
artist:"Navya",
image:"p1.jpg"
},
{
file:"songs/song2.mp3",
name:"Golden Hour",
artist:"Jvke",
image:"p2.jpg"
}
]

},

{
name:"Top Hits",

songs:[
{
file:"songs/song1.mp3",
name:"Enchanted",
artist:"Navya",
image:"p1.jpg"
},

{
file:"songs/song2.mp3",
name:"Golden Hour",
artist:"Jvke",
image:"p2.jpg"
},

{
file:"songs/song3.mp3",
name:"Flute",
artist:"Abhi",
image:"p3.jpg"
}
]

}

];
const cards = [

  {
    image: "p1.jpg",

    title: "Faded",

    description: "A deep electronic track about searching for something lost."
  },

  {
    image: "p2.jpg",

    title: "Night Changes",

    description: "A soft song about life and relationships."
  },

  {
    image: "p3.jpg",

    title: "Heat Waves",

    description: "A chill indie track."
  },

  {
    image: "p4.jpg",

    title: "Radioactive",

    description: "A dark energetic song."
  },

  {
    image: "happy.jpg",

    title: "Happy Hits",

    description: "Songs to boost your mood."
  }

];


let currentPlaylist = playlists[0];

function playSong(index) {

  currentIndex = index;

  const song = currentPlaylist.songs[index];

  currentSong.src = song.file;

  currentSong.play();

  playBtn.src = "pause.svg";

songInfo.innerHTML = `

<div class="playbar-song">

<img src="${song.image}" alt="">

<div>

<div>${song.name}</div>

<small>${song.artist}</small>

</div>

</div>

`;
  document.querySelectorAll("#songList li")

  .forEach(li=>{

      li.classList.remove("active-song");

  });

  songList.children[index]

  .classList.add("active-song");
  localStorage.setItem(

"lastSong",

JSON.stringify({

playlist: currentPlaylist.name,

index: index

})

);

}

function renderLibrary(){

songList.innerHTML="";

currentPlaylist.songs.forEach((song,index)=>{

let li=document.createElement("li");

li.innerHTML=`

<img src="music.svg">

<div>

<div class="song-name">${song.name}</div>

<div class="song-artist">${song.artist}</div>

</div>

<div class="song-actions">

<button class="favorite-btn">♡</button>

<button class="library-play">Play</button>

</div>

`;

li.querySelector(".favorite-btn")

.addEventListener("click",(e)=>{

e.stopPropagation();

e.target.classList.toggle("active");

e.target.innerText=

e.target.classList.contains("active")

? "♥"

: "♡";

});

li.querySelector(".library-play")

.addEventListener("click",(e)=>{

e.stopPropagation();

playSong(index);

});

li.addEventListener("click",()=>{

playSong(index);

});

songList.appendChild(li);

});

}

renderCards();
attachCardEvents();

renderLibrary();
function attachCardEvents(){

document.querySelectorAll(".card-play")

.forEach((btn,index)=>{

btn.addEventListener("click",()=>{

currentPlaylist=playlists[index];

currentIndex=0;

renderLibrary();

playSong(0);

});

});

}




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


document.getElementById("next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentPlaylist.songs.length;
  playSong(currentIndex);
});

document.getElementById("prev").addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + currentPlaylist.songs.length) %
    currentPlaylist.songs.length;

  playSong(currentIndex);
});


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


seekbar.addEventListener("click", (e) => {
  let percent =
    (e.offsetX / seekbar.getBoundingClientRect().width) * 100;

  currentSong.currentTime =
    (currentSong.duration * percent) / 100;
});


currentSong.addEventListener("ended", () => {
  currentIndex++;

  if (currentIndex >= currentPlaylist.songs.length) {
    currentIndex = 0;
  }

  playSong(currentIndex);
});


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


currentSong.volume = 0.5;
volumeSlider.value = 50;





const hamburger = document.querySelector(".hamburger");
const sidebar = document.querySelector(".left");

const right = document.querySelector(".right");

hamburger.addEventListener("click", () => {

    sidebar.classList.toggle("active");

    right.classList.toggle("hide");

});
document.querySelector(".loginbtn")
  .addEventListener("click", () => {

    window.location.href = "login.html";

  });

document.querySelector(".signupbtn")
  .addEventListener("click", () => {

    window.location.href = "signup.html";

  });
function renderCards(){

cardContainer.innerHTML="";

cards.forEach((card,index)=>{

cardContainer.innerHTML += `

<div class="card">

<img src="${card.image}" alt="">

<h2>${card.title}</h2>

<p>${card.description}</p>

<div class="card-play" data-index="${index}">

<img src="cardplay.svg" alt="">

</div>

</div>

`;

});



}
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

  let value = searchInput.value.toLowerCase();

  document.querySelectorAll("#songList li")

    .forEach(song => {

      let name = song.querySelector(".song-name")

        .innerText.toLowerCase();

      if (name.includes(value)) {

        song.style.display = "flex";

      }

      else {

        song.style.display = "none";

      }

    });

});

const savedSong = JSON.parse(
  localStorage.getItem("lastSong")
);

if (savedSong) {

  const foundPlaylist = playlists.find(
    playlist => playlist.name === savedSong.playlist
  );

  if (foundPlaylist) {

    currentPlaylist = foundPlaylist;

    renderLibrary();

    currentIndex = savedSong.index;

    songInfo.innerHTML = `
      <div>
        ${currentPlaylist.songs[currentIndex].name}
      </div>

      <small>
        ${currentPlaylist.songs[currentIndex].artist}
      </small>
    `;
  }
  
}
