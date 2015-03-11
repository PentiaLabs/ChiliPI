var express = require('express');
var path = require('path');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var config = {
    port: 8900,
    clientPath: 'client'
};


var ds = require("ds18b20");                                                                            
var sensorLib = require("node-dht-sensor");

var readings = {
    inside: 'Could not get data',
    outside: 'Could not get data',
    humidity: 'Could not get data'
};

var sensor = {                                                                                          
    sensors: [ {                                                                                        
        name: "Fugtighed",                                                                                 
        type: 11,                                                                                       
        pin: 17                                                                                         
    }],                                                                                                 
    read: function() {                                                                                  
        for (var a in this.sensors) {                                                                   
            var b = sensorLib.readSpec(this.sensors[a].type, this.sensors[a].pin);                      
            console.log(this.sensors[a].name + ": " +                                                                                                         
              b.humidity.toFixed(1) + "%");

            readings.humidity = b.humidity.toFixed(1) || '--';                                                   
        }                                                                                               
    }                                                                                                   
};

function printReadings() {
    sensor.read(); 

    ds.temperature("28-0314628f53ff", function(err, value){                                                 
        console.log("Ude Temeratur er: ", value, err);
        readings.outside = value || '--';                                             
    });                                                                                                     
                                                                                                            
    ds.temperature("28-0314626c5dff", function(err, value){                                                 
        console.log("inde Temeratur er: ", value, err);
        readings.inside = value || '--';                                                      
    }); 
}

setInterval(printReadings, 2000); 

printReadings();

io.on('connection', function (socket) {
    socket.emit('data', readings);

    setInterval(function() {
        console.log('emit', readings);
         socket.emit('data', readings);
    }, 2000); 

});

app.use(express.static(path.join(__dirname, config.clientPath)));

http.listen(config.port, function(){
    console.log('listening on *:' + config.port);
});

