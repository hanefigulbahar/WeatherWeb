var options = [];
let currentData = {};
var loaded = false;

document.addEventListener('readystatechange', event => { if (event.target.readyState === "complete") { getCityNames();}});

document.getElementById("selectCity").addEventListener("click",()=>{
    if(!loaded){
        for(var i = 0; i < options.length; i++) {
            var opt = options[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            document.getElementById("selectCity").appendChild(el);
        }
        loaded = true
    }
    document.getElementById("selectCity").onchange = function(){
        if(document.getElementById("selectCity").selectedIndex>0) { document.getElementById("getCities").disabled = false }
    }
})

document.getElementById("getCities").addEventListener("click",()=>{
    const city = options[document.getElementById("selectCity").selectedIndex-1]    
    getWeatherInfo(city)
})

//Functions
function getCityNames(){
    let getCities = new XMLHttpRequest();

    getCities.open("POST", "https://countriesnow.space/api/v0.1/countries/population/cities/filter");

    getCities.setRequestHeader("Accept", "application/json");
    getCities.setRequestHeader("Content-Type", "application/json");

    getCities.onload = () => JSON.parse(getCities.responseText).data.forEach(city => {options.push(city.city)});
    getCities.onreadystatechange = function() {document.getElementById("selectCity").disabled = false}

    let data = {     
        "limit": 100,     
        "order": "asc",     
        "orderBy": "name",      
        "country": "Turkey"   
    };

    getCities.send(JSON.stringify(data));
}

function getWeatherInfo(city){
    let getWeather = new XMLHttpRequest();

    var url = "https://api.weatherapi.com/v1/current.json?key=c3e03bdb216e4fe6b07125410220707&q=" + city + "&aqi=no"

    getWeather.open("GET", url);

    getWeather.setRequestHeader("Accept", "application/json");
    getWeather.setRequestHeader("Content-Type", "application/json");
    getWeather.onreadystatechange = function() {
        if(getWeather.readyState==4 && getWeather.status==200) {
            let content = getWeather.responseText;
            if(content != '' && (content)) {
                currentData = JSON.parse(getWeather.responseText).current;
                console.log(currentData)
            } 
            else {console.log("Not loaded!")}
        }
    }
    getWeather.send();
}