 
 import nipplejs from 'nipplejs';
 var manager = nipplejs.create({
    zone: document.getElementById('zone_joystick'),
    mode: 'static',
    position: {left: '50%', top: '50%'},
    color: 'red'
});

var hi = 0;
var hello; 
var joystick = manager.get(manager.id);

joystick.on("move", function (evt, data) {
    if (data.direction.angle != null){
        console.log(data.direction.angle);
    }
   
})