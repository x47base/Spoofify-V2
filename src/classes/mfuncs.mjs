class MainFunctions {
    playing = -1;
    #playingInterval;
    sounds = require('../app/settings/sounds');
    song_likes = require('../app/settings/likes');
    song_saves = require('../app/settings/saves');
    volume = 1.0;
    
    constructor() {
        
    }
    
    /**
     * sound_length_to_text
     * @param duration
     * @returns string
    */
    sound_length_to_text(duration) {
        let a = duration;
        let b = 0;
        while (a > 0) {
            a -= 60;
            b += 1;
        }
        if (a < 0) {
            a += 60;
            b -= 1;
        }
        if (a >= 0 && a <= 9) {
            return `${b}:0${a.toFixed(0)}`;
        } else {
            return `${b}:${a.toFixed(0)}`;
        }
    }

    /**
     * sound_length_to_text
    */
    set_volume_of_current_song() {
        let soundElement = this.sounds[this.playing];
        let base = `${soundElement.title.replace(/\s/g, "")}-${
        soundElement.artist
        }`;
        let audioFile = document.getElementById(`sound-${base}`);
        audioFile.volume = volume;
    }

    /**
     * startPlaying
    */
    startPlaying() {
        this.#playingInterval = setInterval(updateSlider, 1000);
    }

    /**
     * stopPlaying
    */
    stopPlaying() {
        clearInterval(this.#playingInterval);
    }

    /**
     * updateSlider
    */
    updateSlider() {
        let soundElement = this.sounds[this.playing];
        let base = `${soundElement.title.replace(/\s/g, "")}-${
        soundElement.artist
        }`;
        let audioFile = document.getElementById(`sound-${base}`);
        let current_image = document.getElementById("songImagePlaying");
        let current_time = document.getElementById("songCurrentTime");
        let current_max_time = document.getElementById("songLength");
        let current_time_slider = document.getElementById("songCurrentTimeSlider");
        let duration = audioFile.duration;

        if (!isNaN(duration)) {
            const currentTime = (audioFile.currentTime / duration) * 100;
            current_time_slider.value = currentTime;
            current_time.innerText = sound_length_to_text(audioFile.currentTime);
            current_max_time.innerText = sound_length_to_text(duration);
        }

        if (audioFile.currentTime == duration) {
            if (this.playing != this.sounds.length - 1) {
                play_next_song();
            }
        }
    }

    /**
     * updateVolumeIcon
     * @param volume
    */
    updateVolumeIcon(volume) {
        let iconElement = document.getElementById("currentVolume").children[0];
        let full_volume_icon =
            '<div class="sidebar-icon"><div class="text-white hover:text-green-500"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"></path><path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"></path><path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"></path></svg></div></div>';
        let down_volume_icon =
            '<div class="sidebar-icon"><div class="text-white hover:text-green-500"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12V4zm3.025 4a4.486 4.486 0 0 1-1.318 3.182L10 10.475A3.489 3.489 0 0 0 11.025 8 3.49 3.49 0 0 0 10 5.525l.707-.707A4.486 4.486 0 0 1 12.025 8z"></path></svg></div></div>';
        let low_volume_icon =
            '<div class="sidebar-icon"><div class="text-white hover:text-green-500"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M10.717 3.55A.5.5 0 0 1 11 4v8a.5.5 0 0 1-.812.39L7.825 10.5H5.5A.5.5 0 0 1 5 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"></path></svg></div></div>';
        let mute_volume_icon =
            '<div class="sidebar-icon"><div class="text-white hover:text-green-500"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"></path></svg></div></div>';

        if (volume == 1.0 || volume == 0.9) {
            iconElement.innerHTML = full_volume_icon;
        } else if (volume < 0.9 && volume >= 0.4) {
            iconElement.innerHTML = down_volume_icon;
        } else if (volume >= 0.1 && volume <= 0.3) {
            iconElement.innerHTML = low_volume_icon;
        } else {
            iconElement.innerHTML = mute_volume_icon;
        }
    };

    /**
     * setup_sound
     * @param soundElement
    */
    setup_sound(soundElement) {
        let title = soundElement.title;
        let artist = soundElement.artist;
        let duration = soundElement.duration;
        let path = soundElement.path;

        let current_image = document.getElementById("songImagePlaying");
        let current_title = document.getElementById("songCurrentlyPlaying");
        let current_time = document.getElementById("songCurrentTime");
        let current_time_slider = document.getElementById("songCurrentTimeSlider");
        let current_max_time = document.getElementById("songLength");
        let player_btn = document.getElementById("player-play-btn");

        if (path == undefined) {
            path = `${artist} - ${title}.mp3`;
        }

        let base = `${title.replace(/\s/g, "")}-${artist}`;
        let btn = document.getElementById(`btn-${base}`);
        let audioFile = document.getElementById(`sound-${base}`);

        let playIcon =
            '<div class="sidebar-icon"><div class="text-white hover:text-green-500"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path></svg></div></div>';
        let pauseIcon =
            '<div class="sidebar-icon"><div class="text-white hover:text-green-500"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path></svg></div></div>';

        btn.onclick = function () {
            if (audioFile.paused == true) {
                if (this.playing != -1) {
                    let soundElement2 = this.sounds[this.playing];
                    let base2 = `${soundElement2.title.replace(/\s/g, "")}-${
                soundElement2.artist
              }`;
                    let btn2 = document.getElementById(`btn-${base2}`);
                    let audioFile2 = document.getElementById(`sound-${base2}`);

                    if (current_image.src == soundElement.image_url) {
                        audioFile2.volume = volume;
                        audioFile2.play();

                        btn2.children[0].innerHTML = pauseIcon;
                        player_btn.children[0].innerHTML = pauseIcon;
                    } else {
                        audioFile2.pause();
                        btn2.children[0].innerHTML = playIcon;
                    }
                }
                audioFile.volume = volume;
                audioFile.src = path;
                audioFile.play();
                startPlaying();
                btn.children[0].innerHTML = pauseIcon;
                player_btn.children[0].innerHTML = pauseIcon;

                current_image.src = soundElement.image_url;
                current_title.innerText = `${title} - ${artist}`;
                current_time.innerText = sound_length_to_text(audioFile.currentTime);

                current_max_time.innerText = sound_length_to_text(audioFile.duration);

                this.playing = this.sounds.indexOf(soundElement);
            } else {
                audioFile.pause();
                stopPlaying();
                btn.children[0].innerHTML = playIcon;
                player_btn.children[0].innerHTML = playIcon;
            }
        };

        /*
            while(audioFile.paused != true){
                current_time_slider.value = audioFile.currentTime;
            }
        */
    };

    /**
     * play_next_song
    */
    play_next_song() {
        let current_time_slider = document.getElementById("songCurrentTimeSlider");
        let player_btn = document.getElementById("player-play-btn");

        let playIcon =
            '<div class="sidebar-icon"><div class="text-white hover:text-green-500"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path></svg></div></div>';
        let pauseIcon =
            '<div class="sidebar-icon"><div class="text-white hover:text-green-500"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path></svg></div></div>';

        if (this.playing < this.sounds.length - 1 && this.playing != -1) {
            let prebase = `${this.sounds[this.playing].title.replace(/\s/g, "")}-${
            this.sounds[this.playing].artist
          }`;
            let prebtn = document.getElementById(`btn-${prebase}`);
            let preAudio = document.getElementById(`sound-${prebase}`);
            preAudio.pause();
            preAudio.currentTime = 0;
            prebtn.children[0].innerHTML = playIcon;
            this.playing += 1;
        } else if (this.playing == -1) {
            this.playing = 0;
        }

        let soundElement = this.sounds[this.playing];

        let base = `${soundElement.title.replace(/\s/g, "")}-${soundElement.artist}`;
        let btn = document.getElementById(`btn-${base}`);
        let audioFile = document.getElementById(`sound-${base}`);

        if (audioFile.paused || audioFile.ended) {
            audioFile.src = soundElement.path;
            audioFile.currentTime = 0;
            audioFile.volume = volume;
            audioFile.play();

            player_btn.children[0].innerHTML = pauseIcon;
            btn.children[0].innerHTML = pauseIcon;

            let current_image = document.getElementById("songImagePlaying");
            let current_title = document.getElementById("songCurrentlyPlaying");
            current_image.src = soundElement.image_url;
            current_title.innerText = `${soundElement.title} - ${soundElement.artist}`;
        }
    };

    removeLike(index) {
        this.song_likes = this.song_likes.filter(function (id) {
            return id !== index;
        });
    };

    removeSave(index) {
        this.song_saves = this.song_saves.filter(function (id) {
            return id !== index;
        });
    };
}

export default MainFunctions;