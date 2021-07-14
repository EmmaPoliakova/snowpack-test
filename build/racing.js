import Peer from './_snowpack/pkg/peerjs.js';




//pup up window with QR
var popupBox = document.getElementById("qrbox");
var fingers = 0;

          
// peer variables
var lastPeerId = null;
var peer = null; // Own peer object
var peerId = null;
var conn = null;


var mouseX = 0,
mouseDown = 0,
mousePressed = 0;


 //Create the Peer object for our end of the connection.
 
    function initialize() {
    // Create own peer object with connection to shared PeerJS server
    peer = new Peer(null, {
        debug: 2
    });

    peer.on('open', function (id) {
        // Work-around for peer.reconnect deleting previous id
        if (peer.id === null) {
            console.log('Received null id from peer open');
            peer.id = lastPeerId;
        } else {
            lastPeerId = peer.id;
        }

        console.log('ID: ' + peer.id);
        
        new QRCode(document.getElementById("qrcode2"), "https://emmapoliakova.github.io/SmartphoneLeapMotion/demo/3dRacingJoystickController.html?id=" + peer.id);
        popupBox.style.display = "block";
    });

    peer.on('connection', function (c) {
        // Allow only a single connection
        if (conn && conn.open) {
            c.on('open', function() {
                c.send("Already connected to another client");
                setTimeout(function() { c.close(); }, 500);
            });
            return;
        }

        conn = c;
        console.log("Connected to: " + conn.peer);
   
        popupBox.style.display = "none";
      
        ready();
    });

    peer.on('disconnected', function () {
        
        console.log('Connection lost. Please reconnect');

        // Work-around for peer.reconnect deleting previous id
        peer.id = lastPeerId;
        peer._lastServerId = lastPeerId;
        peer.reconnect();
    });

    peer.on('close', function() {
        conn = null;
        status.innerHTML = "Connection destroyed. Please refresh";
        console.log('Connection destroyed');
    });

    peer.on('error', function (err) {
        console.log(err);
        alert('' + err);
    });
};

/**
 * Triggered once a connection has been achieved.
 * Defines callbacks to handle incoming data and connection events.
 */
function ready() {
    conn.on('data', function (data) {               
        
        mouseX = (c.width*data[0])/window.innerWidth*2 - 1;
        console.log(mouseX);
        mousePressed = data[1];
        
        if (mousePressed==2 || mousePressed=="down"){
            mouseDown=1;
        }
        else if ((mousePressed==3 || mousePressed=="up")){
            mouseDown=2;
        }
        else{
            mouseDown = 0;
        }
        mousePressed = 1;
        
        
    conn.send(" ");
    });
    conn.on('close', function () {
        
        conn = null;
    });
}

    initialize();



    