

const timeDisplay = document.querySelector(".base-timer-label");
const circle = document.querySelector(".base-timer__path-remaining");
const FULL_DASH_ARRAY = 283;
let circleParts = 283;
let selectedBtn = "pomodoro";
let isPause = false;
let isMute = false;
let myInterval = null;
let timeLimit = 1500;
const btns = document.querySelectorAll(".btn");
const outerCircle = document.querySelector(".outerCircle");
const baseTimer = document.querySelector(".base-timer__path-remaining ");
const audioIcons = document.querySelector(".audioIcons");
const audioOn = document.querySelector(".fa-volume-up");
const audioOff = document.querySelector(".fa-volume-mute");
const startPauseBtn = document.querySelector(".startPause");
const root = document.documentElement;
const main = document.getElementById("main");
//sounds
let sound = new Audio("https://actions.google.com/sounds/v1/tools/18v_cordless_drill_switch.ogg");
let alarm = new Audio("https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg");


//PILLS BUTTONS
btns.forEach(function(btn){

    btn.addEventListener("click", function(){
        if(!isMute){
            sound.play();
        }
       
        btns.forEach(function(btns1){
btns1.classList.remove("selected");
        });
        
        btn.classList.add("selected");
        //console.log( btn.id);
        if(btn.id == "btn1"){
            timeDisplay.textContent = setting.timeSetting.pomodoro;
            timeLimit = getTime();
            selectedBtn = "pomodoro";
            reStart();
        } else if (btn.id == "btn2") {
            timeDisplay.textContent = setting.timeSetting.shortBreak;
            timeLimit = getTime();
            selectedBtn = "shortBreak";

            reStart();

        } else if (btn.id === "btn3") {
            timeDisplay.textContent = setting.timeSetting.longBreak;
            timeLimit = getTime();
            selectedBtn = "longBreak";

           reStart();
        }
        
    });
    
});
// CLOCK FUNCTIONS ===========================================
outerCircle.addEventListener("click", function(){
 //hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh   
    let timeInSeconds = getTime();
    //console.log(timeInSeconds);
//hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh  
if(!isMute){
     sound.play();
}

    if(isPause){
        clearInterval(myInterval);
        isPause = false;
        startPauseBtn.textContent = "RESTART";

    }else{
    startTimer(timeInSeconds);
        isPause = true;
        startPauseBtn.textContent = "PAUSE";
    }

});
outerCircle.addEventListener("mousedown" ,function(){
    outerCircle.classList.add("outerCirclePressed");
});
outerCircle.addEventListener("mouseup" ,function(){
    outerCircle.classList.remove("outerCirclePressed");
});
audioIcons.addEventListener("click", function(){
    isMute = !isMute
    alarm.pause();
 audioOn.classList.toggle("hideAudio");
 audioOff.classList.toggle("hideAudio");

});

 
function formatTimeLeft(time) {
  // The largest round integer less than or equal to the result of time divided being by 60.
  let minutes = Math.floor(time / 60);
  
  // Seconds are the remainder of the time divided by 60 (modulus operator)
  let seconds = time % 60;
  
  // If the value of seconds is less than 10, then display seconds with a leading zero
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
    if(minutes < 10) {
        minutes = `0${minutes}`;
    }

  // The output in MM:SS format
  return `${minutes}:${seconds}`;
};

function startTimer(time){
    const TIME_LIMIT = timeLimit;  
    
    baseTimer.style.transition = "1s linear all";
    
    
    myInterval = setInterval(function(){
        
        if(time > 0){

        circle.style.strokeDasharray = ` ${(calculateTimeFraction(time,TIME_LIMIT) * FULL_DASH_ARRAY).toFixed(0)} 283`; 
        time--;
        timeDisplay.textContent = formatTimeLeft(time); 
            displayTimeLeftInTheTab(formatTimeLeft(time));
        }else{
            
        circle.style.strokeDasharray = `0 283`;
         clearInterval(myInterval);
         timeDisplay.textContent = "TIME EXPIRED!"
         startPauseBtn.textContent = "RESTART";
         outerCircle.style.animation = "shake 0.82s cubic-bezier(.36,.07,.19,.97) both 5";
        if(!isMute){
         alarm.play();
         setTimeout(function(){
             alarm.pause();
         },4000);
        }

         outerCircle.addEventListener("click", function(){
             reStart();
             clearInterval(tabInterval1);
             clearInterval(tabInterval2);

         },{once : true});

        

        
         
         setTimeout(function(){
            outerCircle.style.animation = "";
         },5000);

         let tabInterval1 = setInterval(function(){
            displayTimeLeftInTheTab("!!!  !!! ");
         },1000);
         let tabInterval2 = setInterval(function(){
            displayTimeLeftInTheTab("00:00");
         },2000);
            
            
        } },1000);
};

function calculateTimeFraction(time,TIME_LIMIT) {
  const rawTimeFraction = time / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
};

function getTime() {
   
    let stringTime = timeDisplay.textContent;
    
    let minutes = parseInt(stringTime[0] + stringTime[1]);
    let seconds = parseInt(stringTime[3] + stringTime[4]);

    return (minutes * 60) + seconds;

};

function reStart() {
    clearInterval(myInterval);
    circle.style.strokeDasharray = `283 283`; 
    isPause = false;
    startPauseBtn.textContent = "START";

    if(selectedBtn === "pomodoro"){
        timeDisplay.textContent = setting.timeSetting.pomodoro;
            
    } else if(selectedBtn === "shortBreak"){
        timeDisplay.textContent = setting.timeSetting.shortBreak;
    } else if(selectedBtn === "longBreak"){
        timeDisplay.textContent = setting.timeSetting.longBreak;
    }
    timeLimit = getTime();
};

// SETTINGS FUNCTIONS ========================================

let setting = {
    mainColor : "#F87070",
    timeSetting: {
      pomodoro: "25:00",
      shortBreak : "05:00",
      longBreak : "15:00"
},
     font: "--font1"
};

const settingIcon = document.getElementById("settingIcon");
const spaceForSetting = document.getElementById("spaceForSetting");


settingIcon.addEventListener("click", function(){
    

    
    let fontSelected = loadFontSelected();
    let colorSelected = loadColorSelected();
    

    spaceForSetting.style.zIndex = "100";
    spaceForSetting.innerHTML = ` <div class="settingBox">
    
            <div class="middleSetBox">
            <div class="titleSet">
            <h2>Settings</h2>
                <i class="far fa-times-circle" id="closeIcon"></i>
            </div>
           
            <h3 id="timeSetTitle">Time <span id="mSpan">(minutes)</span></h3>
            <div class="timeSet">
            
            <label for="pom">pomodoro</label>
            <label for="sb">short break</label>
             <label for="lb">long break</label>
            <input type="number" id="pom" name="pom" class="inputText" placeholder="${setting.timeSetting.pomodoro}" min="0" max="90">
            
            <input type="number" id="sb" name="sb" class="inputText" placeholder="${setting.timeSetting.shortBreak}" min="0" max="90">
           
            <input type="number" id="lb" name="lb" class="inputText" placeholder="${setting.timeSetting.longBreak}" min="0" max="90">
            </div>
            
            <div class="fontSet">
            <h3>Font</h3>
                ${fontSelected}
            </div>
            
            <div class="colorSet">
                <h3>Color</h3>
                ${colorSelected}
            </div>
            <button type="button" class="btnApply">Apply
            </button>
            
                </div>
               
            </div>`;
    
    window.onload = openedSetting();
});

function openedSetting(){
    
const closeIcon = document.getElementById("closeIcon");
const btnApply = document.querySelector(".btnApply");
const cover = document.getElementById("cover");
    
    cover.classList.add("cover");

    closeIcon.addEventListener("click", function(){
    spaceForSetting.innerHTML = ``;
        spaceForSetting.style.zIndex = "-1";
            cover.classList.remove("cover");

});
    
    
    btnApply.addEventListener("click", function(){
        getTimeData();
        spaceForSetting.style.zIndex = "-1";
        spaceForSetting.innerHTML = ``;
        cover.classList.remove("cover");

        
        root.style.setProperty("--main-color", setting.mainColor);
        main.style.fontFamily = `var(${setting.font})`;
        

        reStart();
        
        
        
    });
    
    getFontData();
    getColorData();
    
};

function getTimeData(){
    const inputText = document.querySelectorAll(".inputText");
    let array = [];
    
    inputText.forEach(function(text){
        
        if(text.value === ""){
            array.push(text.placeholder);
        }else{
              array.push(format(text.value));
        }
         });
       setting.timeSetting.pomodoro = array[0];
        setting.timeSetting.shortBreak = array[1];
        setting.timeSetting.longBreak = array[2];
    
function format(number){
        if(number <= 9){
            return `0${number}:00`;
        }else {
            return `${number}:00`;
        }
    };
};

function getFontData(){
   
    const fontIcon = document.querySelectorAll(".fontIcon")
    
    fontIcon.forEach(function(icon){
        
        icon.addEventListener("click", function(){
           //console.log(icon.id);
            setting.font = icon.id;
        
            fontIcon.forEach(function(icon1){
                icon1.classList.remove("selectedFont");
            });
            icon.classList.add("selectedFont");
            
        });
    });

    
};

function getColorData(){
    const colorIcon = document.querySelectorAll(".colorIcon ");
    colorIcon.forEach(function(icon){
        
        icon.addEventListener("click", function(){
            setting.mainColor = icon.dataset.color;
            
            colorIcon.forEach(function(icon2){
                icon2.innerHTML = "";
            });
            
            icon.innerHTML = `<i class="fas fa-check"></i>`;
        });
        
    });
    
};

function loadFontSelected(){
if(setting.font === "--font1"){
    return `<div class="iconSection">
                <div class="icon fontIcon selectedFont" id="--font1">Aa</div>
                <div class="icon fontIcon" id="--font2">Aa</div>
                <div class="icon fontIcon" id="--font3">Aa</div>
                    </div>`;
}else if (setting.font === "--font2"){
  return `<div class="iconSection">
                <div class="icon fontIcon " id="--font1">Aa</div>
                <div class="icon fontIcon selectedFont" id="--font2">Aa</div>
                <div class="icon fontIcon" id="--font3">Aa</div>
                    </div>`;   
}else if (setting.font === "--font3" ){
    return `<div class="iconSection">
                <div class="icon fontIcon " id="--font1">Aa</div>
                <div class="icon fontIcon" id="--font2">Aa</div>
                <div class="icon fontIcon selectedFont" id="--font3">Aa</div>
                    </div>`; 
};
          
          };

function loadColorSelected(){
    
    if (setting.mainColor === "aqua"){
        return `<div class="iconSection">
            <div class="icon  colorIcon salmon" data-color="#F87070">
                    </div>
            <div class="icon  colorIcon  blue" data-color="aqua">
<i class="fas fa-check"></i>
                    </div>
            <div class="icon colorIcon  violet" data-color="violet">
                    
                    </div>
                    </div>`;
        
    }else if(setting.mainColor === "violet"){
         return `<div class="iconSection">
            <div class="icon  colorIcon salmon" data-color="#F87070">
                    </div>
            <div class="icon  colorIcon  blue" data-color="aqua">

                    </div>
            <div class="icon colorIcon  violet" data-color="violet">
<i class="fas fa-check"></i>
                    
                    </div>
                    </div>`;
        
    }else if(setting.mainColor === "#F87070"){
         return `<div class="iconSection">
            <div class="icon  colorIcon salmon" data-color="#F87070">
                    <i class="fas fa-check"></i>
                    </div>
            <div class="icon  colorIcon  blue" data-color="aqua">
                    </div>
            <div class="icon colorIcon  violet" data-color="violet">
                    
                    </div>
                    </div>`;
        
    };
};

function displayTimeLeftInTheTab(timeLeft){
    document.title = `${timeLeft} | PomodoroApp`;
    
};
