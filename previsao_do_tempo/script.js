/* apis */
const apiKey = 'b3377d67c6918379faeda82741641112';
const countryFlagURL = 'https://flagsapi.com/';

/* elements */


const city =  document.querySelector('#city-input');
const btn_search = document.querySelector('#search');
const showCity = document.querySelector('#city');
const showTemp = document.querySelector('#temperature span');
const showDesc = document.querySelector('#description');
const showWeatherIcon = document.querySelector('#weather-icon');
const showCountry = document.querySelector('#country');
const showHumidity = document.querySelector('#humidity span');
const showWind = document.querySelector('#wind span');

const weatherInfos = document.querySelector('#weather-data');

/* funções */
const getWeatherData = async(city) => {
	const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
	const res = await fetch(apiWeatherUrl);
	const data = await res.json();

	return data;


}

const showWeatherData = async(actualCity) => {

	const data = await getWeatherData(actualCity);

	showCity.innerHTML = data.name;
	showTemp.innerHTML = parseInt(data.main.temp);
	showDesc.innerHTML = data.weather[0].description;
	showWeatherIcon.setAttribute('src',`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
	showCountry.setAttribute('src',`https://flagsapi.com/${data.sys.country}/flat/64.png`);
	showHumidity.innerHTML = `${data.main.humidity}km/h`;
	showWind.innerHTML = `${data.wind.speed}km/h`;

	weatherInfos.classList.remove('hide');
	
};





/* eventos */
btn_search.addEventListener('click', (e) =>{
	e.preventDefault();
	const actualCity = city.value;

	showWeatherData(actualCity);
});

city.addEventListener('keyup',(e) =>{
	if(e.code === "Enter"){
		const citysearch = e.target.value;
		showWeatherData(citysearch);
	}
});

