const  timeEl = document.querySelector('.time');
const ampmEl = document.querySelector('.ampm');
const form = document.querySelector('.form');
const input = document.querySelector('input');

const USER_NAME= 'username'

function time(){
    const date= new Date();
    let hours =  date.getHours();
    const minutes= date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12? 'pm' :'am';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    timeEl.textContent=`${hours} : ${minutes<10 ? `0${minutes}`: minutes} : ${seconds<10 ? `0${seconds}`: seconds}`;
    ampmEl.textContent=ampm;
}
function load(){
    time();
    setInterval(time,1000);
}
load();


form.addEventListener('submit',(e)=>{
    storage(USER_NAME,input.value);
});

function storage(key,value){
    localStorage.setItem(key,value);
}
navigator.geolocation.getCurrentPosition((position)=>{console.log(position)})
