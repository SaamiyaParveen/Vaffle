console.log("Welcome to Spotify");

//Initialise the varialbles
let songIndex=0;
let audioElement = new Audio("song/1.mp3");
let masterPlay=document.getElementById("masterPlay");
let myProgressBar=document.getElementById("myProgressBar");
let gif=document.getElementById("gif");
let masterSongName=document.getElementById("masterSongName");
let songItems=Array.from(document.getElementsByClassName("songItem"));

let songs =[
    {songName: "A Thousand Years", filePath : "song/1.mp3" ,coverPath : "covers/1.jpg"},
    {songName: "Off My Face", filePath : "song/2.mp3" ,coverPath : "covers/2.jpg"},
    {songName: "All Too Well", filePath : "song/3.mp3" ,coverPath : "covers/3.jpg"},
    {songName: "Nothing", filePath : "song/4.mp3" ,coverPath : "covers/4.jpg"},
    {songName: "Love Story", filePath : "song/5.mp3" ,coverPath : "covers/5.jpg"},
    {songName: "Water-Fountain", filePath : "song/6.mp3" ,coverPath : "covers/6.jpg"},
    {songName: "Death-Bed", filePath : "song/7.mp3" ,coverPath : "covers/7.jpg"},
    {songName: "If The World Was Ending", filePath : "song/8.mp3" ,coverPath : "covers/8.jpg"},
]


songItems.forEach((element,i)=>{

   element.getElementsByTagName("img")[0].src= songs[i].coverPath;
   element.getElementsByClassName("songName")[0].innerText= songs[i].songName;

})

//handle play/pause click;
masterPlay.addEventListener('click',()=>{
  if( audioElement.paused || audioElement.currentTime<=0 )
  {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle-o");
    masterPlay.classList.add("fa-pause");
    gif.style.opacity= 1;
  }
  else{
    audioElement.pause();
    masterPlay.classList.remove("fa-pause");
    masterPlay.classList.add("fa-play-circle-o");
    gif.style.opacity= 0;
}
})
//Listen to events
audioElement.addEventListener('timeupdate',()=>{
  //update seekbar
   progress= parseInt((audioElement.currentTime/audioElement.duration)* 100);
   myProgressBar.value=progress;
})

myProgressBar.addEventListener("change",()=>{
   audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
})
 
const makeAllPlays = ()=>{
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.remove("fa-pause");
    element.classList.add("fa-play-circle-o");
  })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
           makeAllPlays();
           songIndex=parseInt(e.target.id);
           e.target.classList.remove("fa-play-circle-o");
           e.target.classList.add("fa-pause");
           audioElement.src=`song/${songIndex + 1}.mp3`;
           masterSongName.innerText = songs[songIndex].songName;
           audioElement.currentTime = 0;
           audioElement.play(); 
           gif.style.opacity = 1;
           masterPlay.classList.remove("fa-play-circle-o");
           masterPlay.classList.add("fa-pause");
    })
})

document.getElementById('next').addEventListener('click', ()=>{
  if(songIndex>=7)
  {
    songIndex=0;
  }
  else
  {
    songIndex=songIndex+1;
  }
  audioElement.src=`song/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play(); 
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle-o");
  masterPlay.classList.add("fa-pause");
})

document.getElementById('previous').addEventListener('click', ()=>{
  if(songIndex<=0)
  {songIndex=0;
  }
  else
  {
    songIndex=songIndex-1;
  }
  audioElement.src=`song/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play(); 
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle-o");
  masterPlay.classList.add("fa-pause");
})