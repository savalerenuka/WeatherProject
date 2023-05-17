import express from "express";
import https from "https";
import path from "path";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const __dirname = path.resolve();
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", function(req, res){

    const query = req.body.cityName;
    const apiKey = "537757a50b2cfc6615f0d726a60b6bff"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" + apiKey + "&units" + unit;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const weatherdescription = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The temperatur of "+ query + " is "+ temp + " degree Celsius.</h1>");
            res.write("<p>The weather is currently " + weatherdescription + ".</p>");
            res.write("<img src = " + imageURL + " >");
            res.send();
        })
    })

});



app.listen(3000, function(){
    console.log("Server is running.");
});