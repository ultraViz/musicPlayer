const image =  document.querySelector('img');
const title = document.getElementById('title');
const artist =  document.getElementById('artist');
const music =  document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


//Music
const songs = [
    {
        name:'jacinto-1',
        tbImg:'jacinto-1',
        displayName: 'SongName1',
        artist: 'ArtistName1',
    },
    {
        name:'jacinto-2',
        tbImg:'jacinto-2',
        displayName: 'SongName3',
        artist:'ArtistName2',
    },
    {
        name:'metric-1',
        tbImg: 'metric-1',
        displayName: 'SongName3',
        artist: 'ArtistName3',
    }
];

//Check if playing
let isPLaying = false

//Play
function playSong(){
    isPLaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    music.play();
}

//Pause
function pauseSong(){
    isPLaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    music.pause();
}

//Play of Pause Event
playBtn.addEventListener('click', () => (isPLaying ? pauseSong() : playSong()));

//update dom
function loadSong(songs){
    title.textContent = songs.displayName;
    artist.textContent = songs.artist;
    music.src = `music/${songs.name}.mp3`;
    image.src = `img/${songs.tbImg}.jpg`;

}
// Current Song
let songIndex = 0;

// Prev Song
function prevSong(){
    songIndex--;
    if(songIndex < 0 ){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length -1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//on Load - Select First Song
loadSong(songs[songIndex]);

// Update progress bar and time
function updateProgressBar(e){
    if(isPLaying){
        const { duration, currentTime} = e.srcElement;
        //Update progress bar  width
        const progressPercent = (currentTime /duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculation display for duration
        const durationMinutes = Math.floor(duration / 60);
        console.log('minutes', durationMinutes) ;
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`
        }

        // Calculation display for current
        const currentMinutes = Math.floor(currentTime / 60);
          let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`
        }
         // Delay Swicthing current time element to avoid NaN
        if(currentSeconds){
            currentTimeEl.textContent = `${currentMinutes} : ${currentSeconds}`;
        }        

        // Delay Swicthing duration element to avoid NaN
        if(durationSeconds){
            durationTimeEl.textContent =  `${durationMinutes} : ${durationSeconds}`;
        }
    }
}

//setProgressBar

function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
    
}

//Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);