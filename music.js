
const menu = document.querySelector(".menu i");

const Ul_div = document.querySelector(".ul-div");

const doc = document.body;

let audio = new Audio("");
let playBtn = document.querySelector("#playBtn");
let progressBar = document.querySelector("#progressBar");
let iconBtns = document.querySelectorAll(".icon i");  //icons on left portion
let songPlayPic = document.querySelector(".songPlayPic img");
let songPlayName = document.querySelector(".songPlayName");
let previous = document.querySelector(".fa-backward-step");
let next = document.querySelector(".fa-forward-step");
let songItem = document.querySelectorAll(".songItem");
let index;

let songs = [
    { songName: "Für Elise Beethoven. Für Elise", filePath: "./music/song0.mp3", songPic: "images/image0.jfif" },
    { songName: "Canon in D Major", filePath: "./music/song1.mp3", songPic: "images/image1.jfif" },
    { songName: "Moonlight Sonata – Beethoven.", filePath: "./music/song2.mp3", songPic: "images/image2.jfif" },
    { songName: "Nocturne, Op", filePath: "./music/song3.mp3", songPic: "images/image3.jfif" },
    { songName: "Hungarian Rhapsody", filePath: "./music/song4.mp3", songPic: "images/image4.jfif" },
    { songName: "The Four Seasons – Vivaldi", filePath: "./music/song5.mp3", songPic: "images/image5.jfif" },
    { songName: "Clair de Lune – Debussy", filePath: "./music/song6.mp3", songPic: "images/image6.jfif" },
    { songName: "Mozart – Eine kleine Nachtmusik", filePath: "./music/song7.mp3", songPic: "images/image7.jfif" },
    { songName: "Bizet – 'Carmen'", filePath: "./music/song8.mp3", songPic: "images/image8.jfif" },
    { songName: "Johann Strauss II – The Blue Danube", filePath: "./music/song9.mp3", songPic: "images/image9.jfif" }
];

menu.addEventListener("click", function () {
    if (menu.classList.contains("fa-bars")) {
        menu.classList.replace("fa-bars", "fa-xmark");
        Ul_div.style.transform = "translateX(0%)";

    } else {
        
        menu.classList.replace("fa-xmark", "fa-bars");
        Ul_div.style.transform = "translateX(100%)";
    }
});


songs.forEach(function (element, i) {
    let d = document.querySelectorAll(".songName");
    let c = document.querySelectorAll(".songPic img");
    d[i].innerText = element.songName;
    c[i].src = element.songPic;
});



window.addEventListener("load", () => {
    audio.currentTime = 0;
});



// closeBothPlayBtns

const closeBothPlayBtns = () => {   
    iconBtns.forEach(function (element) {
        
        element.classList.replace("fa-circle-pause", "fa-circle-play");
        
    });
}


// animation gif

let animation = document.createElement("img");
animation.src = `playing.gif`;

// -----------------------

iconBtns.forEach(function (element) {     
    element.addEventListener("click", function (e) {


        if (element.classList.contains("fa-circle-play") || audio.paused || audio.currentTime <= 0) {
            index = e.target.id;


            closeBothPlayBtns();

            element.classList.replace("fa-circle-play", "fa-circle-pause");
            playBtn.classList.replace("fa-circle-play", "fa-circle-pause");


            audio.src = songs[index].filePath;
            songPlayPic.src = songs[index].songPic;
            songPlayName.innerText = songs[index].songName;

            audio.play();

            songItem[index].querySelector(".gif").appendChild(animation);


        } else {

            audio.pause();

            songItem[index].querySelector(".gif").removeChild(animation);

            element.classList.replace("fa-circle-pause", "fa-circle-play");

            playBtn.classList.replace("fa-circle-pause", "fa-circle-play");


        }


    });
});



playBtn.addEventListener("click", function () {

    if (audio.paused) {

        playBtn.classList.replace("fa-circle-play", "fa-circle-pause");

        let toChangeIcon = document.getElementById(`${index}`);

        toChangeIcon.classList.replace("fa-circle-play", "fa-circle-pause");

        audio.play();

        songItem[index].querySelector(".gif").appendChild(animation);

    } else {

        audio.pause();

        playBtn.classList.replace("fa-circle-pause", "fa-circle-play");

        let toChangeIcon = document.getElementById(`${index}`); 

        toChangeIcon.classList.replace("fa-circle-pause", "fa-circle-play");

        songItem[index].querySelector(".gif").removeChild(animation);

    }


});


// previous and next : 

previous.addEventListener("click", (e) => {
    if (index <= 0) {
        index = 0;

    } else {
        index--;
    }

    audio.src = songs[index].filePath;
    songPlayPic.src = songs[index].songPic;
    songPlayName.innerText = songs[index].songName;

    closeBothPlayBtns();

    let toChangeIcon = document.getElementById(`${index}`);

    toChangeIcon.classList.replace("fa-circle-play", "fa-circle-pause");

    playBtn.classList.replace("fa-circle-play", "fa-circle-pause");

    audio.currentTime = 0;

    audio.play();

    songItem[index].querySelector(".gif").appendChild(animation);



});


next.addEventListener("click", (e) => {
    if (index >= (songs.length - 1)) {
        index = 0;

    } else {
        index++;
    }

    audio.src = songs[index].filePath;
    songPlayPic.src = songs[index].songPic;
    songPlayName.innerText = songs[index].songName;

    closeBothPlayBtns();

    let toChangeIcon = document.getElementById(`${index}`);

    toChangeIcon.classList.replace("fa-circle-play", "fa-circle-pause");

    playBtn.classList.replace("fa-circle-play", "fa-circle-pause");

    audio.currentTime = 0;

    audio.play();

    songItem[index].querySelector(".gif").appendChild(animation);



});



//progress bar 

progressBar.max = audio.duration;


audio.addEventListener("timeupdate", function () {

    let progress = parseInt((audio.currentTime / audio.duration) * 100);
    progressBar.value = progress;

    // const { currentTime, duration } = e.srcElement;  = audio.currentTime and audio.duration


    // for current time dynamically updating : 

    let dynamic_min = Math.floor((audio.currentTime / 60));
    let dynamic_secs = Math.floor((audio.currentTime % 60));

    if (dynamic_secs < 10) {
        dynamic_secs = `0${dynamic_secs}`
    }

    let totalTime = `${dynamic_min} : ${dynamic_secs}`;

    document.querySelector(".timing").innerText = `${totalTime}`;  


    // for showing total duration :

    let min = Math.floor((audio.duration / 60));
    let secs = Math.floor((audio.duration % 60));

    if (secs < 10) {
        secs = `0${secs}`
    }

    let totalMins = `${min} : ${secs}`;

    if (audio.duration) {
        document.querySelector(".totalTime").innerText = `${totalMins}`;
    }


});


progressBar.addEventListener("change", function () {
    audio.currentTime = progressBar.value * audio.duration / 100;
});


audio.addEventListener("ended", () => {

    playBtn.classList.replace("fa-circle-pause", "fa-circle-play");

    let toChangeIcon = document.getElementById(`${index}`);

    toChangeIcon.classList.replace("fa-circle-pause", "fa-circle-play");

    songItem[index].querySelector(".gif").removeChild(animation)

    progressBar.value = 0;

    document.querySelector(".timing").innerText = `0 : 00`;

    document.querySelector(".totalTime").innerText = `0 : 00`;




})














