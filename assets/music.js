// Control Button
const audioPlayer = document.getElementById('audioPlayer');
const totalTimeElement = document.getElementById('totalTime');
const currentTimeElement = document.getElementById('currentTime');
const seekRangeElement = document.getElementById('music-range');
const playButton = document.getElementById('playButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const randomButton = document.getElementById('randButton');
const loopButton = document.getElementById('loopButton');

// Icon Image
var randomIcon = document.getElementById('random');
var prevIcon = document.getElementById('prev');
var playIcon = document.getElementById('pause');
var nextIcon = document.getElementById('next');
var loopIcon = document.getElementById('loop');

let isPlaying = false;
let isLooping = false;
let currentSongIndex = -1;

const songsInfo = [
    {
        src: './assets/pop/songs/Murderplot.mp3',
        albumImage: './assets/pop/albums/Murderplot.png',
        musicName: '- Murderplot -',
        artistName: 'KORDHELL'
    },
    {
        src: './assets/pop/songs/Sahara.mp3',
        albumImage: './assets/pop/albums/Sahara.png',
        musicName: '- Sahara -',
        artistName: 'Hensonn'
    },
    {
        src: './assets/pop/songs/Ding_Dong_Ku_Datang.mp3',
        albumImage: './assets/pop/albums/Ding_Dong_Ku_Datang.png',
        musicName: '- Ding Dong Ku Datang -',
        artistName: 'Lullaby'
    },
    {
        src: './assets/pop/songs/20th_Century_Boy.mp3',
        albumImage: './assets/pop/albums/20th_Century_Boy.png',
        musicName: '- 20th Century Boy -',
        artistName: 'T. Rex'
    },
    {
        src: './assets/pop/songs/Ong_Chau_Oi.mp3',
        albumImage: './assets/pop/albums/Ong_Chau_Oi.png',
        musicName: '- Ong Chau Oi -',
        artistName: 'Hoang'
    },
    {
        src: './assets/pop/songs/Reze_Theme.mp3',
        albumImage: './assets/pop/albums/Reze_Theme.png',
        musicName: '- Reze Theme -',
        artistName: 'Triple 7 Music'
    },

];

//load song info
function loadSong(index) {
    const albumIcon = document.querySelector('.album-icon');
    const musicNameElement = document.getElementById('music-name');
    const artistNameElement = document.getElementById('artist-name');

    const currentSong = songsInfo[index];
    audioPlayer.src = currentSong.src;

    albumIcon.src = currentSong.albumImage;
    musicNameElement.textContent = currentSong.musicName;
    artistNameElement.textContent = currentSong.artistName;
}

loadSong(0);

audioPlayer.onloadedmetadata = () => {
    const totalTimeInSeconds = audioPlayer.duration;
    seekRangeElement.max = totalTimeInSeconds;

    const totalMinutes = Math.floor(totalTimeInSeconds / 60);
    const totalSeconds = Math.floor(totalTimeInSeconds % 60);

    const formattedTotalTime = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
    totalTimeElement.textContent = formattedTotalTime;
};

audioPlayer.addEventListener('timeupdate', () => {
    const currentTimeInSeconds = audioPlayer.currentTime;
    const currentMinutes = Math.floor(currentTimeInSeconds / 60);
    const currentSeconds = Math.floor(currentTimeInSeconds % 60);

    const formattedCurrentTime = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

    currentTimeElement.textContent = formattedCurrentTime;
    seekRangeElement.value = currentTimeInSeconds;
});

seekRangeElement.addEventListener('input', () => {
    const seekPositionInSeconds = seekRangeElement;
    audioPlayer.currentTime = seekPositionInSeconds;
});

//Ended
audioPlayer.addEventListener('ended', () => {
    currentSongIndex = (currentSongIndex + 1) % songsInfo.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    isPlaying = true;
    playIcon.src = './assets/images/play.png';
});

// Play
playButton.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        playIcon.src = './assets/images/pause.png';
    } else {
        audioPlayer.play();
        playIcon.src = './assets/images/play.png';
    }
    isPlaying = !isPlaying;
});

// Next
nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songsInfo.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    isPlaying = true;
    playIcon.src = './assets/images/play.png';
});

// Prev
prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songsInfo.length) % songsInfo.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    isPlaying = true;
    playIcon.src = './assets/images/play.png';
});

// Random
randomButton.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * songsInfo.length);
    loadSong(randomIndex);
    audioPlayer.play();
    isPlaying = true;
    playIcon.src = './assets/images/play.png';
});

// Loop
loopButton.addEventListener('click', () => {
    if(isLooping){
        audioPlayer.loop = false;
        loopButton.style.boxShadow = '5px 5px 15px #bcbcbc, -5px -5px 15px #ffffff';
    }
    else{
        audioPlayer.loop = true;
        loopButton.style.boxShadow = 'inset 5px 5px 15px #bcbcbc, inset -5px -5px 15px #ffffff';
    }
    isLooping = !isLooping;
});