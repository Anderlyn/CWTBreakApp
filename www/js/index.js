/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
       document.getElementById("actionButtons").style.display = "block";
       document.getElementById("loading").style.display = "none";
    }
};
let breakButton = document.getElementById("a1");
let lunchButton = document.getElementById("a2");
let cancelButton = document.getElementById("a3");
breakButton.addEventListener("click", function(){
    goToBreak();
})
lunchButton.addEventListener("click", function(){
    goToLunch();
})
cancelButton.addEventListener("click", function(){
    cancel();
})

let currentSeconds = 0;
let currentMinutes = 0;
let globalType = -1; // 0 is break, 1 is lunch.
let timeIntervalGlobal = 0;
function goToBreak(){
    document.getElementById("actionButtons").style.display = "none";
    document.getElementById("counterItems").style.display = "block";
    currentSeconds = 45;
    currentMinutes = 14;
    globalType = 0;
    timeIntervalGlobal = setInterval(startClock, 1000);
}
function goToLunch(){
    document.getElementById("actionButtons").style.display = "none";
    document.getElementById("counterItems").style.display = "block";
    currentSeconds = 45;
    currentMinutes = 59;
    globalType = 0;
    timeIntervalGlobal = setInterval(startClock, 1000);
}
function cancel(){
    document.getElementById("actionButtons").style.display = "block";
    document.getElementById("counterItems").style.display = "none";
    document.getElementById("counter").innerHTML = "--:--";
    clearInterval(timeIntervalGlobal);
}

function startClock(){
    currentSeconds -= 1;
    if(currentSeconds === -1){
        currentMinutes -= 1;
        currentSeconds = 59;
    }
    if(currentSeconds === 0 && currentMinutes === 0){
        document.getElementById("actionButtons").style.display = "block";
        document.getElementById("counterItems").style.display = "none";
        document.getElementById("counter").innerHTML = "--:--";
        clearInterval(timeIntervalGlobal);
        timeIntervalGlobal = 0;
        if(globalType === 0){
            setTimeout(sendBreak, 100);
        }else if(globalType === 1){
            setTimeout(sendLunch, 100);
        }
    }
    let displaySeconds = currentSeconds;
    let displayMinutes = currentMinutes;

    if(currentMinutes < 10){
        displayMinutes = "0"+displayMinutes;
    }
    if(currentSeconds < 10){
        displaySeconds = "0"+displaySeconds;
    }
    let stringToShow = displayMinutes+":"+displaySeconds;
    document.getElementById("counter").innerHTML = stringToShow;
}

function sendBreak(){
    cordova.plugins.notification.local.schedule({
        id: 1,
        title: "Your break is over!",
        text: "Let's get back to work.",
        sound: "file://sound/guitarsound.mp3"
    })
    setTimeout(sendFull, 5000);
}
function sendLunch(){
    cordova.plugins.notification.local.schedule({
        id: 1,
        title: "Your lunch is over!",
        text: "Let's get back to work.",
        sound: "file://sound/guitarsound.mp3"
    })
    setTimeout(sendFull, 5000);
}
function sendFull(){
    cordova.plugins.notification.local.schedule({
        id: 2,
        title: "Remember to constantly wash your hands.",
        text: "Take care!",
        sound: "file://sound/guitarsound.mp3"
    })
}
app.initialize();