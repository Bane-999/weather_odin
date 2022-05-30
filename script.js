async function getWeatherData(city, unit) {    
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a20e2f157955c3362e7a02fea3c1d1c2&units=${unit}`);
    const data = await response.json();
    let info = {"name": data.name, "temp": data.main.temp, "icon": data.weather[0].icon, "tempStatus": data.weather[0].main};
    return info;
}

const weatherTab = document.getElementById('weather');
const searchCity = document.getElementById('city');
const button = document.getElementById('button');

button.addEventListener('click', function(event) {  
    event.preventDefault();
    let unit = document.querySelector('input[name="unit"]:checked').value; 
    getWeatherData(searchCity.value, unit).then(info => {
        let tab = document.createElement('div'); 
        tab.className = 'tab';
        let cityName = document.createElement('h1');
        let tempStatus = document.createElement('h4');
        let tempValue = document.createElement('p');
        let img = document.createElement('img'); 
        
        cityName.textContent = info.name;
        tempStatus.textContent = info.tempStatus;
        if(unit === "metric") {
            tempValue.textContent = info.temp + " °C";
        }
        else if(unit === "imperial") {
            tempValue.textContent = info.temp + " °F";
        }        

        img.setAttribute('src', `http://openweathermap.org/img/wn/${info.icon}@2x.png`);

        weatherTab.appendChild(tab);
        tab.appendChild(cityName);
        tab.appendChild(tempStatus);
        tab.appendChild(tempValue);
        tab.appendChild(img);        
    });    
});


