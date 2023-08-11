const accountButton = document.getElementById("account-button");
const homeButton = document.getElementById("home-button");
const searchButton = document.getElementById("search-button");
const libraryButton = document.getElementById("library-button");

const contentPreview = document.getElementById("content-preview");

const accountContent = document.getElementById("account-content");
const homeContent = document.getElementById("home-content");
const searchContent = document.getElementById("search-content");
const libraryContent = document.getElementById("library-content");
const albumContent = document.getElementById("album-content");

// Nav buttons
function resetButtonsStyle() {
    accountButton.classList.remove("clicked-button");
    homeButton.classList.remove("clicked-button");
    searchButton.classList.remove("clicked-button");
    libraryButton.classList.remove("clicked-button")

    accountContent.classList.add("hidden");
    homeContent.classList.add("hidden");
    searchContent.classList.add("hidden");
    libraryContent.classList.add("hidden");
    albumContent.classList.add("hidden");
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

function playAudio() {
    audio.play();
}
function pauseAudio() {
    audio.pause();
}

function playPauseButtonBehavior() {
    if (isPlaying) {
        playPauseButton.textContent = "play_circle";
        full_playPauseButton.textContent = "play_circle";
        pauseAudio();
        isPlaying = false;
    } else {
        playPauseButton.textContent = "pause_circle";
        full_playPauseButton.textContent = "pause_circle";
        playAudio();
        isPlaying = true;
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
}

function changeMusicCurrentTime() {
    audio.currentTime = timelineSlider.value;
    audio.currentTime = full_timelineSlider.value
}

timelineSlider.addEventListener("input", function () {
    audio.currentTime = timelineSlider.value;
});

let artistsObject = {
    'Metro Boomin': {
        'METRO BOOMIN PRESENTS SPIDER-MAN ACROSS THE SPIDER-VERSE (SOUNDTRACK FROM AND INSPIRED BY THE MOTION PICTURE)': {
            name: 'METRO BOOMIN PRESENTS SPIDER-MAN ACROSS THE SPIDER-VERSE (SOUNDTRACK FROM AND INSPIRED BY THE MOTION PICTURE)',
            year: 2023,
            artists: ["Metro Boomin"],
            length: 13,
            songs: {
                1: {
                    name: "Annihilate (Spider-Man_ Across the Spider-Verse)",
                    artists: "Metro Boomin, Swae Lee, Lil Wayne, Offset",
                    duration: 231
                }
            }
        },

        'HEROS & VILLAINS': {
            name: 'HEROS & VILLAINS',
            year: 2022,
            artists: ["Metro Boomin"],
            length: 15,
            songs: {
                1: {
                    name: "Creepin",
                    artists: "Metro Boomin, The Weeknd, 21 Savage",
                    duration: 220
                }
            }
        }
    },

    'Connor Price': {
        'Spinnin': {
            name: 'Spinnin',
            year: 2022,
            artists: ["Connor Price", "Bens"],
            length: 1,
            songs: {
                1: {
                    name: "Spinnin",
                    artists: "Connor Price, Bens",
                    duration: 111
                }
            }
        },
    },

    'Post Malone': {
        'AUSTIN': {
            name: 'AUSTIN',
            year: 2023,
            artists: ["Post Malone"],
            length: 17,
            songs: {
                1: {
                    name: "Chemical",
                    artists: "Post Malone",
                    duration: 183
                }
            }
        },
    },

    'Various Artists': {
        'Spider-Man Into the Spider-Verse (Soundtrack From & Inspired by the Motion Picture)': {
            name: 'Spider-Man Into the Spider-Verse (Soundtrack From & Inspired by the Motion Picture)',
            year: 2018,
            artists: ["Various Artists"],
            length: 13,
            songs: {
                1: {
                    name: "Sunflower (Spider-Man_ Into the Spider-Verse)",
                    artists: "Post Malone, Swae Lee",
                    duration: 158
                }
            }
        }
    },

    'The Weeknd': {
        'Starboy': {
            name: 'Starboy',
            year: 2016,
            artists: ["The Weeknd"],
            length: 18,
            songs: {
                1: {
                    name: "Starboy",
                    artists: "The Weeknd, Daft Punk",
                    duration: 230
                }
            }
        }
    },
};

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

function playThisSong(artist, albumName, songIndex) {
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
    console.log(isFullScreenPlayerMobileOpen);
    if (isFullScreenPlayerMobileOpen) {
        FullScreenPlayerMobile.classList.remove("show-full-screen-player-mobile");
        isFullScreenPlayerMobileOpen = false;
        showFullScreenButton.textContent = "expand_less";
    } else {
        FullScreenPlayerMobile.classList.add("show-full-screen-player-mobile");
        isFullScreenPlayerMobileOpen = true;
        showFullScreenButton.textContent = "expand_more";
    }
}