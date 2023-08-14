const accountButton = document.getElementById("account-button");
const homeButton = document.getElementById("home-button");
const searchButton = document.getElementById("search-button");
const libraryButton = document.getElementById("library-button");
const queueButton = document.getElementById("queue-button");

const contentPreview = document.getElementById("content-preview");

const accountContent = document.getElementById("account-content");
const homeContent = document.getElementById("home-content");
const searchContent = document.getElementById("search-content");
const libraryContent = document.getElementById("library-content");
const albumContent = document.getElementById("album-content");
const queueContent = document.getElementById("queue-content");

// Nav buttons
function resetButtonsStyle() {
    accountButton.classList.remove("clicked-button");
    homeButton.classList.remove("clicked-button");
    searchButton.classList.remove("clicked-button");
    libraryButton.classList.remove("clicked-button");
    queueButton.classList.remove("clicked-button");

    accountContent.classList.add("hidden");
    homeContent.classList.add("hidden");
    searchContent.classList.add("hidden");
    libraryContent.classList.add("hidden");
    albumContent.classList.add("hidden");
    queueContent.classList.add("hidden");
}

function changeToAccount() {
    resetButtonsStyle();
    accountButton.classList.add("clicked-button");

    accountContent.classList.remove("hidden");
}

function changeToHome() {
    resetButtonsStyle();
    homeButton.classList.add("clicked-button");

    homeContent.classList.remove("hidden");
}

function changeToAlbum(artist, albumName) {
    resetButtonsStyle();

    albumContent.classList.remove("hidden");
    changeAlbumContent(artist, albumName);
}

function changeToSearch() {
    resetButtonsStyle();
    searchButton.classList.add("clicked-button");

    searchContent.classList.remove("hidden");
}

function changeToLibrary() {
    resetButtonsStyle();
    libraryButton.classList.add("clicked-button");

    libraryContent.classList.remove("hidden");
}

function changeToQueue() {
    resetButtonsStyle();
    queueButton.classList.add("clicked-button");

    queueContent.classList.remove("hidden");
}

// Timeline
const timelineSlider = document.getElementById("timeline-slider");
const full_timelineSlider = document.getElementById("full_timeline-slider")

const playPauseButton = document.getElementById("play-pause-button");
const full_playPauseButton = document.getElementById("full_play-pause-button");

let isPlaying = false;

const audio = document.getElementById("audio-id");

let audioDuration = audio.duration;

const musicDuration = document.getElementById("music-duration");
const full_musicDuration = document.getElementById("full_music-duration");

const currentTime = document.getElementById("current-time");
const full_currentTime = document.getElementById("full_current-time");

const volumeSlider = document.getElementById("volume-slider");

function playAudio() {
    audio.play();
}
function pauseAudio() {
    audio.pause();
}

function playPauseButtonBehavior() {
    if (isPlaying && !isLoadingAudio) {
        playPauseButton.textContent = "play_circle";
        full_playPauseButton.textContent = "play_circle";
        pauseAudio();
        isPlaying = false;
    } else if (!isPlaying && !isLoadingAudio) {
        playPauseButton.textContent = "pause_circle";
        full_playPauseButton.textContent = "pause_circle";
        playAudio();
        isPlaying = true;
    }
}

let isLoadingAudio = false;
let isLoadFirstTime = false;

audio.addEventListener("loadstart", loadingAudio);
audio.addEventListener("loadeddata", loadedAudio);

function loadingAudio() {
    isLoadingAudio = true;
    if (!isLoadFirstTime) {
        playPauseButton.classList.add("loading")
        playPauseButton.textContent = "cached";
        full_playPauseButton.classList.add("loading")
        full_playPauseButton.textContent = "cached";
    }
    isLoadFirstTime = true
}

function loadedAudio() {
    isLoadingAudio = false;
    playPauseButton.classList.remove("loading")
    full_playPauseButton.classList.remove("loading")
    playPauseButton.textContent = "pause_circle";
    full_playPauseButton.textContent = "pause_circle";
}

let volume = volumeSlider.value / 100;
let isMuted = false;
const volumeButton = document.getElementById("volume-button");

const full_volumeButton = document.getElementById("full_volume-button");

const full_volumeSlider = document.getElementById("full_volume-slider");

function muteMusic() {
    if (isMuted) {
        changeMusicVolume();
        isMuted = false;
    }
    else {
        audio.volume = 0;
        volumeButton.textContent = "no_sound";
        full_volumeButton.textContent = "no_sound";
        isMuted = true;
    }
}

volumeSlider.addEventListener("input", function () {
    volume = volumeSlider.value / 100;

    if (isMuted) {
        muteMusic();
    }
    changeMusicVolume();
});

full_volumeSlider.addEventListener("input", function () {
    volume = full_volumeSlider.value / 100;

    if (isMuted) {
        muteMusic();
    }
    changeMusicVolume();
});

function changeMusicVolume() {
    audio.volume = volume;

    if (audio.volume == 0) {
        volumeButton.textContent = "volume_mute";
        full_volumeButton.textContent = "volume_mute";
    }
    else if (audio.volume < 0.35) {
        volumeButton.textContent = "volume_down";
        full_volumeButton.textContent = "volume_down";
    }
    else if (audio.volume > 0.35) {
        volumeButton.textContent = "volume_up";
        full_volumeButton.textContent = "volume_up";
    }
}

audio.ontimeupdate = function () {
    timelineSlider.max = audio.duration;
    timelineSlider.value = audio.currentTime;

    musicDuration.textContent =
        Math.floor(audio.duration / 60) > 0 ? `${Math.floor(audio.duration / 60)}:${String(Math.floor(audio.duration) % 60).padStart(2, '0')}` : "0:00";

    currentTime.textContent =
        `${Math.floor(audio.currentTime / 60)}:${String(Math.floor(audio.currentTime) % 60).padStart(2, '0')}`;

    full_timelineSlider.max = audio.duration;
    full_timelineSlider.value = audio.currentTime;

    full_musicDuration.textContent = Math.floor(audio.duration / 60) > 0 ? `${Math.floor(audio.duration / 60)}:${String(Math.floor(audio.duration) % 60).padStart(2, '0')}` : "0:00";;

    full_currentTime.textContent = `${Math.floor(audio.currentTime / 60)}:${String(Math.floor(audio.currentTime) % 60).padStart(2, '0')}`;

    if (audio.currentTime == audio.duration) {
        playThisSong()
    }
}

function changeMusicCurrentTime() {
    audio.currentTime = timelineSlider.value;
    audio.currentTime = full_timelineSlider.value
}

timelineSlider.addEventListener("input", function () {
    audio.currentTime = timelineSlider.value;
});

const albumCover = document.getElementById("album-cover");
const albumTitle = document.getElementById("album-title");
const albumArtist = document.getElementById("album-artist");
const albumYear = document.getElementById("album-year");
const albumLength = document.getElementById("album-length");

const albumSongs = document.getElementById("album-songs");

function changeAlbumContent(artist, albumName) {
    let songIndex = 1;

    const createAlbumSong = `
<button class="album-song" onclick="playThisSong('${artist}', '${albumName}')">
<h2 class="song-index">${songIndex}</h2>
<div class="song-name-artists">
<h2 class="song-name">${artistsObject[artist][albumName].songs[songIndex].name}</h2>
<h2 class="song-artists">${artistsObject[artist][albumName].songs[songIndex].artists}</h2>
</h2>
</div>
<h2 class="song-duration">${Math.floor(artistsObject[artist][albumName].songs[songIndex].duration / 60)}:${String(Math.floor(artistsObject[artist][albumName].songs[songIndex].duration) % 60).padStart(2, '0')}</h2>
</button>`;

    albumCover.src = `./music-data/album-covers/${String(artist)} - ${String(albumName)}.jpg`;

    albumTitle.textContent = artistsObject[artist][albumName].name

    albumArtist.textContent = artistsObject[artist][albumName].artists
    albumYear.textContent = artistsObject[artist][albumName].year
    albumLength.textContent = artistsObject[artist][albumName].length + " Songs"

    albumSongs.innerHTML = createAlbumSong;

    artistsObject[artist][albumName].songs
}

let previousRandomSong

function playThisSong(artist, albumName, songIndex) {
    if (artist && albumName /*&& songIndex*/) {
        let oldAudio = Object(audio.attributes);

        audio.setAttribute('src', `./music-data/music/${artistsObject[artist][albumName].songs[1].artists} - ${artistsObject[artist][albumName].songs[1].name}.m4a`);

        isPlaying = false;
        playPauseButtonBehavior();

        musicPlayerSong.textContent = artistsObject[artist][albumName].songs[1].name;
        musicPlayerArtists.textContent = artistsObject[artist][albumName].songs[1].artists;
        musicPlayerImage.src = `./music-data/album-covers/${artist} - ${albumName}.jpg`;

        full_musicPlayerSong.textContent = musicPlayerSong.textContent;
        full_musicPlayerArtists.textContent = musicPlayerArtists.textContent;
        full_musicPlayerImage.src = musicPlayerImage.src;

        oldAudio = audio.attributes;
    } else {
        // Hard Coded Ik that this is bad

        let artistArray = [["Metro Boomin", "METRO BOOMIN PRESENTS SPIDER-MAN ACROSS THE SPIDER-VERSE (SOUNDTRACK FROM AND INSPIRED BY THE MOTION PICTURE)"], ["Metro Boomin", "HEROS & VILLAINS"], ["Connor Price", "Spinnin"], ["Post Malone", "AUSTIN"], ["Various Artists", "Spider-Man Into the Spider-Verse (Soundtrack From & Inspired by the Motion Picture)"], ["The Weeknd", "Starboy"]];

        let chooseRandomSong
        for (let i = 0; i < 1; i++) {
            chooseRandomSong = Math.floor(Math.random() * 6);
            if (chooseRandomSong != previousRandomSong) {
                i = 2;
            }
        }

        previousRandomSong = chooseRandomSong;

        playThisSong(artistArray[chooseRandomSong][0], artistArray[chooseRandomSong][1]);
    }
}

function skipThisSong() {
    playThisSong();
}

const musicPlayerSong = document.getElementById("music-player-song");
const full_musicPlayerSong = document.getElementById("full_music-player-song");

const musicPlayerArtists = document.getElementById("music-player-artists");
const full_musicPlayerArtists = document.getElementById("full_music-player-artists");

const musicPlayerImage = document.getElementById("music-player-image");
const full_musicPlayerImage = document.getElementById("full_music-player-image");

const FullScreenPlayerMobile = document.getElementById(".full-screen-player-mobile")
const showFullScreenButton = document.getElementById("show-full-screen");

let isFullScreenPlayerMobileOpen = false;

function showFullScreen() {
    if (isFullScreenPlayerMobileOpen) {
        // FullScreenPlayerMobile.classList.remove("show-full-screen-player-mobile");
        updateFullscreenY(0.5);
        isFullScreenPlayerMobileOpen = false;
        showFullScreenButton.textContent = "expand_less";
    } else {
        // FullScreenPlayerMobile.classList.add("show-full-screen-player-mobile");
        updateFullscreenY(90);
        isFullScreenPlayerMobileOpen = true;
        showFullScreenButton.textContent = "expand_more";
    }
}

const updateFullscreenY = (translateY) => {
    FullScreenPlayerMobile.style.transform = `translate(0,${-translateY}%)`
}

/*
let startY;
let heightPercentage;
let yTranslate = 0.5 / 100;

FullScreenPlayerMobile.addEventListener("touchstart", function (e) {
    // Not in use currently but good thing to be calculated
    startY = -(e.pageY - window.innerHeight) / window.innerHeight * 100 || -(e.touches?.[0].pageY - window.innerHeight) / window.innerHeight * 100;
})


FullScreenPlayerMobile.addEventListener("touchmove", function (e) {
    heightPercentage = Math.abs((window.innerHeight - e.touches?.[0].pageY) / window.innerHeight * 100);

    updateFullscreenY(heightPercentage);
})

FullScreenPlayerMobile.addEventListener("touchend", function (e) {
    // console.log(Math.abs(Math.abs(startY) - Math.abs(heightPercentage)));

    if (Math.abs(startY - heightPercentage) > 25 && heightPercentage != 0) {
        showFullScreen()
    } else if (isFullScreenPlayerMobileOpen) {
        updateFullscreenY(90);
    } else if (!isFullScreenPlayerMobileOpen) {
        updateFullscreenY(0.5);
    }

    heightPercentage = 0
    startY = 0
})

let currentYTranslate

const updateFullscreenY = (translateY) => {
    FullScreenPlayerMobile.style.transform = `translate(0,${-translateY}%)`

    // Not in use currently but good thing to be calculated
    currentYTranslate = Math.abs(String(window.getComputedStyle(FullScreenPlayerMobile).transform).slice(22, -1) / window.innerHeight * 100);
    console.log(currentYTranslate);
}
*/


// Searching the artist.js

const searchBox = document.getElementById("search-box");
