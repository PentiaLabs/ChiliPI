var ds = require("ds18b20");                                                                            
var sensorLib = require("node-dht-sensor");

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
        }                                                                                               
    }                                                                                                   
};

function printReadings() {
    sensor.read(); 

    ds.temperature("28-0314628f53ff", function(err, value){                                                 
        console.log("Ude Temeratur er: ", value);                                                       
    });                                                                                                     
                                                                                                            
    ds.temperature("28-0314626c5dff", function(err, value){                                                 
            console.log("inde Temeratur er: ", value);                                                      
    }); 
}

setInterval(printReadings, 2000); 

printReadings();
