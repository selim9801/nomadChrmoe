const username = document.querySelector('.user-name');
const weather = document.querySelector('.weather');
const weather_icon= document.querySelector('.weather-icon img');
const weather_location = document.querySelector('.weather-location p');
const weather_descrp = document.querySelector('.weather-descrption p');

const todo_input = document.querySelector('.todo-input');
const todo_form = document.querySelector('.todo-form');
const todo_list = document.querySelector('.todo-list');



const USER_NAME= 'username'
let todo_id=0;

let todos=[];
const TODO_KEYS='todos'


function getName(){
    const getName= localStorage.getItem(USER_NAME)
    username.textContent=getName;
}

function getWeather(){
    
    navigator.geolocation.getCurrentPosition(geoOk,geoError)
    
}
function getTodos(){
    const getTodo = localStorage.getItem(TODO_KEYS);
    if(getTodo){
        const todo_arr=JSON.parse(getTodo);
        todos=todo_arr;
        todo_arr.forEach(el=>{
            makeTodo(el)
        })
    }
}


function geoOk(position){
    const lat=position.coords.latitude;
    const lon=position.coords.longitude;
    const API_KEY='bdfae3170e6adc9c49c121cffe046e9f';
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric `;
    fetch(url)
    .then(res=>{ return res.json()})
    .then(data=>{
        console.log(data);
        const temp = data.main.temp;
        const country = data.name;
        const descrp = data.weather[0].description;
        const icon = data.weather[0].icon;
        const iconurl = `http://openweathermap.org/img/w/${icon}.png`;

        weather_icon.setAttribute('src',iconurl);
        weather_location.textContent=`${country}/${temp}`;
        weather_descrp.textContent=descrp;
    })
    .catch(err=>{console.log(err)})
}
function geoError(er){
    console.log(er);
}






todo_form.addEventListener('submit',(e)=>{
    e.preventDefault();
    handleTodo();
    todo_input.value="";
})

function makeTodo(obj){
    const li = document.createElement('li');
    li.setAttribute('class','todo-content');
    if(obj.check){
        li.classList.add('check');
    }
    li.setAttribute('data-id',obj.id);
    li.innerHTML=`  
                <button class="checkBtn"></button>
                <span>${obj.text}</span>
                <button class="closeBtn" >
                    <i class="fas fa-times close"data-id=${obj.id}></i>
                </button>`;
    todo_list.appendChild(li);
    li.scrollIntoView({block: "end"});
}

function handleTodo(){
    const newTodo={
        id:todo_id,
        text:todo_input.value,
        check:false
    }
    todos.push(newTodo);
    makeTodo(newTodo);
    storage();
    todo_id++;
}

function storage(){
    localStorage.setItem(TODO_KEYS,JSON.stringify(todos));
}

todo_list.addEventListener('click',(e)=>{
    const id = e.target.dataset.id
    if(e.target.classList.contains('close')){
        const deleteEl = document.querySelector(`.todo-content[data-id="${id}"]`);
        deleteEl.remove();
        todos=todos.filter(ar=>{return ar.id != parseInt(id)});
        storage();
    }
    if(e.target.classList.contains('checkBtn')){
        const parent= e.target.parentElement;
        parent.classList.toggle('check');
        if(parent.classList.contains('check')){
            todos=todos.map(ar=>{
                if(ar.id===parseInt(parent.dataset.id)){   
                   return {...ar,check:true};
                }
                return ar;
            })
        }
        else{
            todos=todos.map(ar=>{
                if(ar.id===parseInt(parent.dataset.id)){   
                   return {...ar,check:false};
                }
                return ar;
            })
        }
        storage();
    }
})

function load(){
    getName()
    getWeather();
    getTodos();
}
load();
