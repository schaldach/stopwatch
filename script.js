let time = 0
let timertime = 0
let restart = false
let timerrestart = false
let resume = false
let timerresume = false
let timeintervalwatch
let timeintervaltimer

let activatedDiv = "watch"

function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function setvis(id) {
    activatedDiv = id;
    updatevis();
} 

function updatevis() {
    let elements = document.getElementsByClassName('content');
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.width = elements[i].id === activatedDiv ? '100%' : '0';
      elements[i].style.filter = elements[i].id === activatedDiv ? 'none' : 'grayscale(100%)';
    }
}

function start(){
    let button = document.getElementById("start")
    let displaymili = document.getElementById("milisecond")
    let displaysec = document.getElementById("second")
    let displaymin = document.getElementById("minute")
    let interruptor = document.getElementById("pause")
    if(!restart){
        timeintervalwatch = setInterval(timecount, 100)
        restart = true
        button.innerHTML = "Restart"
    }
    else{
        clearInterval(timeintervalwatch)
        displaymili.innerHTML = "0"
        displaysec.innerHTML = "00"
        displaymin.innerHTML = "00"
        restart = false
        resume = false
        time = 0
        interruptor.innerHTML = "Pause"
        button.innerHTML = "Start"
    }
}

function timecount(){
    let displaymili = document.getElementById("milisecond")
    let displaysec = document.getElementById("second")
    let displaymin = document.getElementById("minute")
    time += 1
    displaymili.innerHTML = time%10
    displaysec.innerHTML = (JSON.stringify(Math.floor(time/10%60)).length<2)?"0"+Math.floor(time/10%60):Math.floor(time/10%60)
    displaymin.innerHTML = (JSON.stringify(Math.floor(time/600)).length<2)?"0"+Math.floor(time/600):Math.floor(time/600)
}

function pause(){
    let interruptor = document.getElementById("pause")
    if(!resume){
        clearInterval(timeintervalwatch)
        resume = true
        interruptor.innerHTML = "Resume"
    }
    else{
        timeintervalwatch = setInterval(timecount, 100)
        resume = false
        interruptor.innerHTML = "Pause"
    }
}

function starttimer(){
    let button = document.getElementById("starttimer")
    let displaymili = document.getElementById("milisecondt")
    let displaysec = document.getElementById("secondt")
    let displaymin = document.getElementById("minutet")
    let interruptor = document.getElementById("pausetimer")
    let timevalue = JSON.stringify(document.getElementById("timertime").value)
    if(!timerrestart && timevalue.length === 7){
        timertime = (parseInt(timevalue.substring(1,3))*600)+(parseInt(timevalue.substring(3,5))*10)+(parseInt(timevalue.substring(5,6)))
        timeintervaltimer = setInterval(timertimecount, 100)
        timerrestart = true
        button.innerHTML = "Restart"
    }
    else{
        clearInterval(timeintervaltimer)
        displaymili.innerHTML = "0"
        displaysec.innerHTML = "00"
        displaymin.innerHTML = "00"
        timerrestart = false
        timerresume = false
        timertime = 0
        interruptor.innerHTML = "Pause"
        button.innerHTML = "Start"
    }
}

function timertimecount(){
    let displaymili = document.getElementById("milisecondt")
    let displaysec = document.getElementById("secondt")
    let displaymin = document.getElementById("minutet")
    displaymili.innerHTML = timertime%10
    displaysec.innerHTML = (JSON.stringify(Math.floor(timertime/10%60)).length<2)?"0"+Math.floor(timertime/10%60):Math.floor(timertime/10%60)
    displaymin.innerHTML = (JSON.stringify(Math.floor(timertime/600)).length<2)?"0"+Math.floor(timertime/600):Math.floor(timertime/600)
    timertime = timertime-1
    if(timertime === 0){
        starttimer()
    }
}

function pausetimer(){
    let interruptor = document.getElementById("pausetimer")
    if(!timerresume){
        clearInterval(timeintervaltimer)
        timerresume = true
        interruptor.innerHTML = "Resume"
    }
    else{
        timeintervaltimer = setInterval(timertimecount, 100)
        timerresume = false
        interruptor.innerHTML = "Pause"
    }
}

docReady(updatevis)