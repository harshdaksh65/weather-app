let input = document.querySelector('.inp');
let button = document.querySelector('.btn');
let form = document.querySelector('form');

let apikey = `a80e4c93bde1c58d083ea565bf062c38`;

function getdata(cityname){
    let geocoding = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&appid=a80e4c93bde1c58d083ea565bf062c38&units=metric`
    return new Promise((resolve, reject)=>{
        axios.get(geocoding)
        .then(({data})=>{
            data = data[0];
            const {lat ,lon} = data;
            console.log(lat ,lon);
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`)
                .then(({data})=>{
                    let temp = data.main.temp;
                    let Ctemp = Math.floor(temp - 273.15);
                    let clouds = data.weather[0].description;
                    let humidity = data.main.humidity;
                    let speed = data.wind.speed;

                    // resolve({Ctemp , clouds , humidity , speed});
                    resolve(data);
                })
                .catch((err)=>{
                    reject(err);
                })
        })
    })
}

// getdata('delhi')
//     .then((data)=>{
//         // let {Ctemp , clouds , humidity , speed} = data;
//         // console.log(Ctemp);
//         // console.log(clouds);
//         // console.log(humidity);
//         // console.log(speed);
//         consolr.log(data);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })


function add(data){
    let div = document.createElement('div');
    let main = document.querySelector('.main');
    let name = input.value;
    main.innerHTML= ' ';
    div.innerHTML = `
    <div class="data">
            <div class="cityname">${name}</div>
            <div class="weatherlogo"><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="photo"></div>
            <div class="temp-weather">
                <div class="temp">${Math.floor(data.main.temp - 273.15)}°C</div>
                <div class="weather">${data.weather[0].description}</div>
            </div>
        <div class="humidity-speed">
            <div class="humidity">Humidity - ${data.main.humidity}%</div>
            <div class="speed">Wind Speed - ${data.wind.speed}Km/hr</div>
        </div>
        <div class="humidity-speed-logo">
            <div class="humidity-logo"></div>
            <div class="speed-logo"></div>
        </div>
    </div>
    `

    main.appendChild(div);
    input.value = " ";
}

form.addEventListener('submit' , (ev)=>{
    ev.preventDefault();

    let data = input.value;
    getdata(data)
        .then((data)=>{
            add(data);
        })
        .catch((err)=>{
            console.log(err);
        })
})


