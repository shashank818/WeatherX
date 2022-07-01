// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//747066cb80df0887a4ed02a78491e8f0
const express = require("express");
const bodyParser= require("body-parser");
const ejs = require("ejs");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.get("/" , function(req,res){
  res.sendFile(__dirname+"/index.html");
});



var weatherData = [];

app.post("/",function(req, res){
  weatherData=[];
  const currCity = req.body.cityName;
  const apiKey ="747066cb80df0887a4ed02a78491e8f0";
  const url ="https://api.openweathermap.org/data/2.5/weather?q=" + currCity + "&appid="+apiKey + "&units=metric";
  https.get(url,function(response){
    response.on("data",function(data){
      const currdata = JSON.parse(data);
      const temp =currdata.main.temp;
      const desc = currdata.weather[0].description;
      const imgURL = "http://openweathermap.org/img/wn/"+ currdata.weather[0].icon +"@2x.png";
      console.log(imgURL);
      weatherData.push({
        cityName: currCity,
        temperature: temp,
        description: desc,
        imgPath: imgURL,
        pressure: currdata.main.pressure,
        humidity: currdata.main.humidity,
        windSpeed: currdata.wind.speed,
        windDeg: currdata.wind.deg
      });

      


      res.render("./updated", {weatherDetails: weatherData});

      res.send();
    });
  });


});


app.listen(3000, function(){
  console.log("working");
});
