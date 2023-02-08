var form = document.getElementById("cityform");

var timeDisplayEl = document.getElementById("timeDay");
var CityName;
var selectedCity;
var Weather;
var Temp;
var Wind;
var Humidity;
var Icon;
var Icon1;
var Icon2;
var Icon3;
var Icon4;
var Icon5;
var Tempday1;
var Windday1;
var Humidday1;
var Tempday2;
var Windday2;
var Humidday2;
var Tempday3;
var Windday3;
var Humidday3;
var Tempday4;
var Windday4;
var Humidday4;
var Tempday5;
var Windday5;
var Humidday5;

var historyList = [];
var savedHistoryList = JSON.parse(localStorage.getItem("history"));

if (savedHistoryList === null){
    console.log("Empty!")
} else {
    printBtn();
}
function printBtn() {
    for (var i = 0; i < savedHistoryList.length; i++) {
       var btn = document.createElement("button");
       var t = document.createTextNode(savedHistoryList[i]);
       var history = document.getElementById("history");
       history.appendChild(btn);
       btn.appendChild(t);
       btn.addEventListener('click', getApi2);
    }}

function displayDate() {
    var rightNow = dayjs().format('MMM DD, YYYY');
    timeDisplayEl.textContent = rightNow;
}

form.addEventListener('submit', citySubmit);

 function citySubmit(event){
    event.preventDefault();
    displayDate();
    var city = document.getElementById("cityname").value;
    CityName = city;
    historyList.push(CityName);
    var btn = document.createElement("button");
    var t = document.createTextNode(CityName);
    var history = document.getElementById("history");
    history.appendChild(btn);
    btn.appendChild(t);
    btn.addEventListener('click', getApi2);
    localStorage.setItem("history", JSON.stringify(historyList));
    getApi();
}

 function getApi() {
    var city = CityName;
     fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=b4bddf8a88e63b2b5f41a2b614c276d6&units=imperial")
     .then(function (response) {
       return response.json();
     })
     .then(function (data) {
        Icon = data.weather[0].icon
        selectedCity = data.name;
        Weather = data.weather[0].description;
        Temp = data.main.temp;
        Wind = data.wind.speed;
        Humidity = data.main.humidity;
        renderCurrentConditions();
        getFiveDay();
})
function renderCurrentConditions() { 
    var elem = document.getElementById("icon");
    elem.setAttribute("src", "http://openweathermap.org/img/wn/"+Icon+"@2x.png");
    elem.setAttribute("alt", "Weather Icon");
    document.getElementById("currentCity").innerText = "City: " + selectedCity;
    document.getElementById("currentCond").innerText = "Conditions: " + Weather;
    document.getElementById("currentTemp").innerText = "Temperature: " + Temp +"F";
    document.getElementById("currentWind").innerText = "Wind Speed: " + Wind +"mph";
    document.getElementById("currentHumid").innerText = "Humidity: " + Humidity + "%";
}
function getFiveDay() {
    var city = CityName;
    fetch("https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=b4bddf8a88e63b2b5f41a2b614c276d6&units=imperial")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        Icon1 = data.list[2].weather[0].icon;
        Icon2 = data.list[10].weather[0].icon;
        Icon3 = data.list[18].weather[0].icon;
        Icon4 = data.list[26].weather[0].icon;
        Icon5 = data.list[34].weather[0].icon;

        fdDate1 = data.list[2].dt_txt;
        fdDate2 = data.list[10].dt_txt;
        fdDate3 = data.list[18].dt_txt;
        fdDate4 = data.list[26].dt_txt;
        fdDate5 = data.list[34].dt_txt;
        fdDate6 = fdDate1.substring(0, 10);
        fdDate7 = fdDate2.substring(0, 10);
        fdDate8 = fdDate3.substring(0, 10);
        fdDate9 = fdDate4.substring(0, 10);
        fdDate10 = fdDate5.substring(0, 10);

        Humidday1 = data.list[2].main.humidity;
        Tempday1 = data.list[2].main.temp;
        Windday1 = data.list[2].wind.speed;
        Humidday2 = data.list[10].main.humidity;
        Tempday2 = data.list[10].main.temp;
        Windday2 = data.list[10].wind.speed;
        Humidday3 = data.list[18].main.humidity;
        Tempday3 = data.list[18].main.temp;
        Windday3 = data.list[18].wind.speed;
        Humidday4 = data.list[26].main.humidity;
        day4Temp = data.list[26].main.temp;
        Windday4 = data.list[26].wind.speed;
        Humidday5 = data.list[34].main.humidity;
        Tempday5 = data.list[34].main.temp;
        Windday5 = data.list[34].wind.speed;
        renderFiveDay();
    })

    function renderFiveDay() {
        var elem1 = document.getElementById("dayOne");
        var elem2 = document.getElementById("dayTwo");
        var elem3 = document.getElementById("dayThree");
        var elem4 = document.getElementById("dayFour");
        var elem5 = document.getElementById("dayFive");
        var elem6 = document.getElementById("dateOne");
        var elem7 = document.getElementById("dateTwo");
        var elem8 = document.getElementById("dateThree");
        var elem9 = document.getElementById("dateFour");
        var elem10 = document.getElementById("dateFive");

        elem1.setAttribute("src", "http://openweathermap.org/img/wn/"+Icon1+"@2x.png");
        elem1.setAttribute("alt", "Weather Icon");
        elem2.setAttribute("src", "http://openweathermap.org/img/wn/"+Icon2+"@2x.png");
        elem2.setAttribute("alt", "Weather Icon");
        elem3.setAttribute("src", "http://openweathermap.org/img/wn/"+Icon3+"@2x.png");
        elem3.setAttribute("alt", "Weather Icon");
        elem4.setAttribute("src", "http://openweathermap.org/img/wn/"+Icon4+"@2x.png");
        elem4.setAttribute("alt", "Weather Icon");
        elem5.setAttribute("src", "http://openweathermap.org/img/wn/"+Icon5+"@2x.png");
        elem5.setAttribute("alt", "Weather Icon");
        elem6.textContent = fdDate6;
        elem7.textContent = fdDate7;
        elem8.textContent = fdDate8;
        elem9.textContent = fdDate9;
        elem10.textContent = fdDate10;

        var li = document.getElementById('Humidday1');
        li.textContent = "Humidity: " + Humidday1 + "%";
        var li2 = document.getElementById('Tempday1');
        li2.textContent = "Temp: " + Tempday1 + "F";
        var li3 = document.getElementById('Windday1');
        li3.textContent = "Wind Speed: " + Windday1 + "mph";
        var li4 = document.getElementById('Humidday2');
        li4.textContent = "Humidity: " + Humidday2 + "%";
        var li5 = document.getElementById('Tempday2');
        li5.textContent = "Temp: " + Tempday2 + "F";
        var li6 = document.getElementById('Windday2');
        li6.textContent = "Wind Speed: " + Windday2 + "mph";
        var li7 = document.getElementById('Humidday3');
        li7.textContent = "Humidity: " + Humidday3 + "%";
        var li8 = document.getElementById('Tempday3');
        li8.textContent = "Temp: " + Tempday3 + "F";
        var li9 = document.getElementById('Windday3');
        li9.textContent = "Wind Speed: " + Windday3 + "mph";
        var li10 = document.getElementById('Humidday4');
        li10.textContent = "Humidity: " + Humidday4 + "%";
        var li11 = document.getElementById('day4Temp');
        li11.textContent = "Temp: " + day4Temp + "F";
        var li12 = document.getElementById('Windday4');
        li12.textContent = "Wind Speed: " + Windday4 + "mph";
        var li13 = document.getElementById('Humidday5');
        li13.textContent = "Humidity: " + Humidday5 + "%";
        var li14 = document.getElementById('Tempday5');
        li14.textContent = "Temp: " + Tempday5 + "F";
        var li15 = document.getElementById('Windday5');
        li15.textContent = "Wind Speed: " + Windday5 + "mph";
    }
}
}

function getApi2() {
    var btnText = this.textContent;
     fetch("https://api.openweathermap.org/data/2.5/weather?q="+btnText+"&appid=b4bddf8a88e63b2b5f41a2b614c276d6&units=imperial")
     .then(function (response) {
       return response.json();
     })
     .then(function (data) {
        Icon = data.weather[0].icon
        selectedCity = data.name;
        Weather = data.weather[0].description;
        Temp = data.main.temp;
        Wind = data.wind.speed;
        Humidity = data.main.humidity;

        renderCurrentConditions();
        getFiveDay();
})
function renderCurrentConditions() { 
    var elem = document.getElementById("icon");
    elem.setAttribute("src", "http://openweathermap.org/img/wn/"+Icon+"@2x.png");
    elem.setAttribute("alt", "Weather Icon");
    document.getElementById("selectedCity").innerText = "City: " + selectedCity;
    document.getElementById("currentCond").innerText = "Conditions: " + Weather;
    document.getElementById("Temp").innerText = "Temperature: " + Temp +"F";
    document.getElementById("Wind").innerText = "Wind Speed: " + Wind +"mph";
    document.getElementById("currentHumid").innerText = "Humidity: " + Humidity + "%";
}
function getFiveDay() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q="+btnText+"&appid=b4bddf8a88e63b2b5f41a2b614c276d6&units=imperial")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        Icon1 = data.list[2].weather[0].icon;
        Icon2 = data.list[10].weather[0].icon;
        Icon3 = data.list[18].weather[0].icon;
        Icon4 = data.list[26].weather[0].icon;
        Icon5 = data.list[34].weather[0].icon;

        fdDate1 = data.list[2].dt_txt;
        fdDate2 = data.list[10].dt_txt;
        fdDate3 = data.list[18].dt_txt;
        fdDate4 = data.list[26].dt_txt;
        fdDate5 = data.list[34].dt_txt;
        fdDate6 = fdDate1.substring(0, 10);
        fdDate7 = fdDate2.substring(0, 10);
        fdDate8 = fdDate3.substring(0, 10);
        fdDate9 = fdDate4.substring(0, 10);
        fdDate10 = fdDate5.substring(0, 10);

        Humidday1 = data.list[2].main.humidity;
        Tempday1 = data.list[2].main.temp;
        Windday1 = data.list[2].wind.speed;
        Humidday2 = data.list[10].main.humidity;
        Tempday2 = data.list[10].main.temp;
        Windday2 = data.list[10].wind.speed;
        Humidday3 = data.list[18].main.humidity;
        Tempday3 = data.list[18].main.temp;
        Windday3 = data.list[18].wind.speed;
        Humidday4 = data.list[26].main.humidity;
        day4Temp = data.list[26].main.temp;
        Windday4 = data.list[26].wind.speed;
        Humidday5 = data.list[34].main.humidity;
        Tempday5 = data.list[34].main.temp;
        Windday5 = data.list[34].wind.speed;
        renderFiveDay();
    })
    function renderFiveDay() {
        var elem1 = document.getElementById("dayOne");
        var elem2 = document.getElementById("dayTwo");
        var elem3 = document.getElementById("dayThree");
        var elem4 = document.getElementById("dayFour");
        var elem5 = document.getElementById("dayFive");
        var elem6 = document.getElementById("dateOne");
        var elem7 = document.getElementById("dateTwo");
        var elem8 = document.getElementById("dateThree");
        var elem9 = document.getElementById("dateFour");
        var elem10 = document.getElementById("dateFive");

        elem1.setAttribute("src", "http://openweathermap.org/img/wn/"+Icon1+"@2x.png");
        elem1.setAttribute("alt", "Weather Icon");
        elem2.setAttribute("src", "http://openweathermap.org/img/wn/"+Icon2+"@2x.png");
        elem2.setAttribute("alt", "Weather Icon");
        elem3.setAttribute("src", "http://openweathermap.org/img/wn/"+Icon3+"@2x.png");
        elem3.setAttribute("alt", "Weather Icon");
        elem4.setAttribute("src", "http://openweathermap.org/img/wn/"+Icon4+"@2x.png");
        elem4.setAttribute("alt", "Weather Icon");
        elem5.setAttribute("src", "http://openweathermap.org/img/wn/"+Icon5+"@2x.png");
        elem5.setAttribute("alt", "Weather Icon");

        elem6.textContent = fdDate6;
        elem7.textContent = fdDate7;
        elem8.textContent = fdDate8;
        elem9.textContent = fdDate9;
        elem10.textContent = fdDate10;

        var li = document.getElementById('Humidday1');
        li.textContent = "Humidity: " + Humidday1 + "%";
        var li2 = document.getElementById('Tempday1');
        li2.textContent = "Temp: " + Tempday1 + "F";
        var li3 = document.getElementById('Windday1');
        li3.textContent = "Wind Speed: " + Windday1 + "mph";
        var li4 = document.getElementById('Humidday2');
        li4.textContent = "Humidity: " + Humidday2 + "%";
        var li5 = document.getElementById('Tempday2');
        li5.textContent = "Temp: " + Tempday2 + "F";
        var li6 = document.getElementById('Windday2');
        li6.textContent = "Wind Speed: " + Windday2 + "mph";
        var li7 = document.getElementById('Humidday3');
        li7.textContent = "Humidity: " + Humidday3 + "%";
        var li8 = document.getElementById('Tempday3');
        li8.textContent = "Temp: " + Tempday3 + "F";
        var li9 = document.getElementById('Windday3');
        li9.textContent = "Wind Speed: " + Windday3 + "mph";
        var li10 = document.getElementById('Humidday4');
        li10.textContent = "Humidity: " + Humidday4 + "%";
        var li11 = document.getElementById('day4Temp');
        li11.textContent = "Temp: " + day4Temp + "F";
        var li12 = document.getElementById('Windday4');
        li12.textContent = "Wind Speed: " + Windday4 + "mph";
        var li13 = document.getElementById('Humidday5');
        li13.textContent = "Humidity: " + Humidday5 + "%";
        var li14 = document.getElementById('Tempday5');
        li14.textContent = "Temp: " + Tempday5 + "F";
        var li15 = document.getElementById('Windday5');
        li15.textContent = "Wind Speed: " + Windday5 + "mph";
    }}}