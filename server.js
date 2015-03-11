var ds = require("ds18b20");
var sensorLib = require("node-dht-sensor");
var sensor = {
    sensors: [ {
        name: "Indoor",
        type: 11,
        pin: 17
    }],
    read: function() {
        for (var a in this.sensors) {
            var b = sensorLib.readSpec(this.sensors[a].type, this.sensors[a].pin);
            console.log(this.sensors[a].name + ": " +
              b.temperature.toFixed(1) + "C, " +
              b.humidity.toFixed(1) + "%");
        }
        setTimeout(function() {
            sensor.read();
        }, 2000);
    }
};

ds.temperature("28-0314628f53ff", function(err, value){
        console.log("Temeratur er: ", value);
});

sensor.read();