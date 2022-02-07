const mainEl = document.getElementById("main");
const formEl = document.getElementById("form");
const searchEl = document.getElementById("search");

const apikey = "3265874a2c77ae4a04bb96236a642d2f";
const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;


const getWeatherByLocation = async(city) => {

    const res = await fetch(url(city), { origin: "cors" }).then(res => res.json());

    addWeatherToPage(res);

}

const addWeatherToPage = (data) => {
    const temp = KtoC(data.main.temp);

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = String.raw `
    <h2>
        <img src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png">
        ${temp}°C 
        <img src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png">
    </h2>  
    <small>${data.weather[0].main}</small> 
            `;
    // cleaning up the main
    main.innerHTML = "";

    mainEl.appendChild(weather);
}

formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = searchEl.value;

    if (city) {
        getWeatherByLocation(city);
    }
})


const KtoC = (k) => Math.floor(k - 273.15);